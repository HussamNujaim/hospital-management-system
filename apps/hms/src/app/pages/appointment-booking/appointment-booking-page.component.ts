import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '@shared/shared-ui';
import type { DoctorSchedule, BreakTime, DailySchedule, DayOfWeek, TimeRange } from '@shared/shared-ui';

// Appointment interfaces
interface Doctor {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  color: string;
}


interface Appointment {
  id: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: Date;
  time: string;
  duration: number;
  type: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  notes?: string;
}

type ViewMode = 'day' | 'week' | 'month';

// Configuration interface for time slots
interface TimeSlotConfig {
  slotDuration: number; // Duration of each time slot in minutes
  startTime: string; // Start time (e.g., '09:00')
  endTime: string; // End time (e.g., '17:00')
}

@Component({
  selector: 'app-appointment-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointment-booking-page.component.html',
  styleUrls: ['./appointment-booking-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppointmentBookingPageComponent {
  // Inject translation service (public for template access)
  translationService = inject(TranslationService);

  // Time slot configuration (easily customizable)
  private timeSlotConfig: TimeSlotConfig = {
    slotDuration: 30, // Change this to 15, 30, 45, or 60 minutes
    startTime: '09:00',
    endTime: '17:00'
  };

  // View state
  currentView = signal<ViewMode>('week');
  selectedDate = signal(new Date());
  selectedDoctor = signal<Doctor | null>(null);
  showBookingModal = signal(false);
  editingAppointment = signal<Appointment | null>(null); // For editing existing appointments

  // Booking form data
  bookingForm = signal({
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    appointmentType: 'consultation',
    duration: 30,
    notes: ''
  });

  selectedTimeSlot = signal<{ date: Date; time: string } | null>(null);

  // Sample doctors data - with computed translated specialties
  private doctorsData = signal<Doctor[]>([
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      color: '#3b82f6'
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Orthopedic',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      color: '#10b981'
    },
    {
      id: '3',
      name: 'Dr. Emily Williams',
      specialty: 'Pediatrician',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      color: '#f59e0b'
    },
    {
      id: '4',
      name: 'Dr. James Brown',
      specialty: 'Neurologist',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
      color: '#8b5cf6'
    }
  ]);

  // Computed doctors with translated specialties
  doctors = computed(() => {
    const t = this.translationService;
    return this.doctorsData().map(doc => ({
      ...doc,
      specialty: t.t(doc.specialty.toLowerCase() as any) || doc.specialty
    }));
  });

  // Sample appointments data - using current date for testing
  appointments = signal<Appointment[]>([
    {
      id: '1',
      patientName: 'John Doe',
      doctorId: '1',
      doctorName: 'Dr. Sarah Johnson',
      date: new Date(2025, 11, 21, 9, 0),
      time: '09:00',
      duration: 30,
      type: 'Consultation',
      status: 'confirmed'
    },
    {
      id: '2',
      patientName: 'Jane Smith',
      doctorId: '1',
      doctorName: 'Dr. Sarah Johnson',
      date: new Date(2025, 11, 21, 10, 0),
      time: '10:00',
      duration: 60,
      type: 'Follow-up',
      status: 'confirmed'
    },
    {
      id: '3',
      patientName: 'Bob Wilson',
      doctorId: '2',
      doctorName: 'Dr. Michael Chen',
      date: new Date(2025, 11, 21, 11, 0),
      time: '11:00',
      duration: 120,
      type: 'Procedure',
      status: 'pending'
    },
    {
      id: '4',
      patientName: 'Alice Brown',
      doctorId: '1',
      doctorName: 'Dr. Sarah Johnson',
      date: new Date(2025, 11, 22, 14, 0),
      time: '14:00',
      duration: 45,
      type: 'Checkup',
      status: 'confirmed'
    }
  ]);

  // Doctor schedules with working hours, days off, and breaks
  doctorSchedules = signal<DoctorSchedule[]>([
    {
      doctorId: '1', // Dr. Sarah Johnson (Cardiologist)
      weeklySchedule: [
        { day: 'monday', isWorkingDay: true, timeRanges: [{ start: '09:00', end: '17:00' }] },
        { day: 'tuesday', isWorkingDay: true, timeRanges: [{ start: '09:00', end: '17:00' }] },
        { day: 'wednesday', isWorkingDay: true, timeRanges: [{ start: '09:00', end: '17:00' }] },
        { day: 'thursday', isWorkingDay: true, timeRanges: [{ start: '09:00', end: '17:00' }] },
        { day: 'friday', isWorkingDay: true, timeRanges: [{ start: '09:00', end: '13:00' }] }, // Half day Friday
        { day: 'saturday', isWorkingDay: false, timeRanges: [] },
        { day: 'sunday', isWorkingDay: false, timeRanges: [] }
      ],
      breaks: [
        {
          id: 'b1',
          doctorId: '1',
          date: new Date(2025, 11, 21), // December 21, 2025
          start: '12:00',
          end: '13:00',
          reason: 'Lunch Break',
          recurring: 'daily'
        },
        {
          id: 'b2',
          doctorId: '1',
          date: new Date(2025, 11, 22), // December 22, 2025
          start: '15:00',
          end: '16:00',
          reason: 'Staff Meeting'
        }
      ],
      daysOff: [
        new Date(2025, 11, 25), // December 25 - Christmas
        new Date(2025, 11, 26)  // December 26 - Day off
      ]
    },
    {
      doctorId: '2', // Dr. Michael Chen (Orthopedic)
      weeklySchedule: [
        { day: 'monday', isWorkingDay: true, timeRanges: [{ start: '08:00', end: '12:00' }, { start: '14:00', end: '18:00' }] }, // Split shift
        { day: 'tuesday', isWorkingDay: true, timeRanges: [{ start: '08:00', end: '12:00' }, { start: '14:00', end: '18:00' }] },
        { day: 'wednesday', isWorkingDay: true, timeRanges: [{ start: '08:00', end: '12:00' }, { start: '14:00', end: '18:00' }] },
        { day: 'thursday', isWorkingDay: true, timeRanges: [{ start: '08:00', end: '12:00' }, { start: '14:00', end: '18:00' }] },
        { day: 'friday', isWorkingDay: true, timeRanges: [{ start: '08:00', end: '12:00' }, { start: '14:00', end: '18:00' }] },
        { day: 'saturday', isWorkingDay: true, timeRanges: [{ start: '09:00', end: '13:00' }] }, // Saturday morning only
        { day: 'sunday', isWorkingDay: false, timeRanges: [] }
      ],
      breaks: [
        {
          id: 'b3',
          doctorId: '2',
          date: new Date(2025, 11, 21),
          start: '10:30',
          end: '11:00',
          reason: 'Coffee Break',
          recurring: 'daily'
        }
      ],
      daysOff: []
    },
    {
      doctorId: '3', // Dr. Emily Williams (Pediatrician)
      weeklySchedule: [
        { day: 'monday', isWorkingDay: true, timeRanges: [{ start: '10:00', end: '18:00' }] },
        { day: 'tuesday', isWorkingDay: true, timeRanges: [{ start: '10:00', end: '18:00' }] },
        { day: 'wednesday', isWorkingDay: false, timeRanges: [] }, // Day off Wednesday
        { day: 'thursday', isWorkingDay: true, timeRanges: [{ start: '10:00', end: '18:00' }] },
        { day: 'friday', isWorkingDay: true, timeRanges: [{ start: '10:00', end: '18:00' }] },
        { day: 'saturday', isWorkingDay: true, timeRanges: [{ start: '10:00', end: '14:00' }] },
        { day: 'sunday', isWorkingDay: false, timeRanges: [] }
      ],
      breaks: [
        {
          id: 'b4',
          doctorId: '3',
          date: new Date(2025, 11, 21),
          start: '13:00',
          end: '14:00',
          reason: 'Lunch',
          recurring: 'daily'
        }
      ],
      daysOff: [
        new Date(2025, 11, 24) // December 24 - Christmas Eve
      ]
    },
    {
      doctorId: '4', // Dr. James Brown (Neurologist)
      weeklySchedule: [
        { day: 'monday', isWorkingDay: true, timeRanges: [{ start: '09:00', end: '17:00' }] },
        { day: 'tuesday', isWorkingDay: true, timeRanges: [{ start: '09:00', end: '17:00' }] },
        { day: 'wednesday', isWorkingDay: true, timeRanges: [{ start: '09:00', end: '17:00' }] },
        { day: 'thursday', isWorkingDay: false, timeRanges: [] }, // Research day - no patients
        { day: 'friday', isWorkingDay: true, timeRanges: [{ start: '09:00', end: '17:00' }] },
        { day: 'saturday', isWorkingDay: false, timeRanges: [] },
        { day: 'sunday', isWorkingDay: false, timeRanges: [] }
      ],
      breaks: [
        {
          id: 'b5',
          doctorId: '4',
          date: new Date(2025, 11, 22),
          start: '11:00',
          end: '12:30',
          reason: 'Surgery'
        }
      ],
      daysOff: []
    }
  ]);

  // Generate time slots dynamically based on configuration
  timeSlots = computed(() => this.generateTimeSlots());

  // Computed properties
  currentWeek = computed(() => this.getWeekDays(this.selectedDate()));
  currentMonth = computed(() => this.getMonthDays(this.selectedDate()));
  currentMonthName = computed(() =>
    this.selectedDate().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  );

  // Navigation methods
  goToToday(): void {
    this.selectedDate.set(new Date());
  }

  previousPeriod(): void {
    const date = new Date(this.selectedDate());
    const view = this.currentView();

    if (view === 'day') {
      date.setDate(date.getDate() - 1);
    } else if (view === 'week') {
      date.setDate(date.getDate() - 7);
    } else {
      date.setMonth(date.getMonth() - 1);
    }

    this.selectedDate.set(date);
  }

  nextPeriod(): void {
    const date = new Date(this.selectedDate());
    const view = this.currentView();

    if (view === 'day') {
      date.setDate(date.getDate() + 1);
    } else if (view === 'week') {
      date.setDate(date.getDate() + 7);
    } else {
      date.setMonth(date.getMonth() + 1);
    }

    this.selectedDate.set(date);
  }

  setView(view: ViewMode): void {
    this.currentView.set(view);
  }

  selectDoctor(doctor: Doctor | null): void {
    this.selectedDoctor.set(doctor);
  }

  // Doctor Availability Methods

  // Get doctor schedule
  private getDoctorSchedule(doctorId: string): DoctorSchedule | undefined {
    return this.doctorSchedules().find(s => s.doctorId === doctorId);
  }

  // Get day of week from date
  private getDayOfWeek(date: Date): DayOfWeek {
    const days: DayOfWeek[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[date.getDay()];
  }

  // Check if doctor is working on this date
  isDoctorWorkingOnDate(doctorId: string, date: Date): boolean {
    const schedule = this.getDoctorSchedule(doctorId);
    if (!schedule) return true; // No schedule = assume available

    // Check if it's a day off
    const isDayOff = schedule.daysOff.some(dayOff =>
      dayOff.toDateString() === date.toDateString()
    );
    if (isDayOff) return false;

    // Check weekly schedule
    const dayOfWeek = this.getDayOfWeek(date);
    const daySchedule = schedule.weeklySchedule.find(s => s.day === dayOfWeek);

    return daySchedule ? daySchedule.isWorkingDay : false;
  }

  // Check if time is within doctor's working hours
  isTimeInWorkingHours(doctorId: string, date: Date, time: string): boolean {
    const schedule = this.getDoctorSchedule(doctorId);
    if (!schedule) return true; // No schedule = assume available

    const dayOfWeek = this.getDayOfWeek(date);
    const daySchedule = schedule.weeklySchedule.find(s => s.day === dayOfWeek);

    if (!daySchedule || !daySchedule.isWorkingDay) return false;

    // Convert time to minutes for comparison
    const [hour, min] = time.split(':').map(Number);
    const timeInMinutes = hour * 60 + min;

    // Check if time falls within any of the working time ranges
    return daySchedule.timeRanges.some(range => {
      const [startHour, startMin] = range.start.split(':').map(Number);
      const [endHour, endMin] = range.end.split(':').map(Number);
      const startMinutes = startHour * 60 + startMin;
      const endMinutes = endHour * 60 + endMin;

      return timeInMinutes >= startMinutes && timeInMinutes < endMinutes;
    });
  }

  // Check if time slot is during a break
  isTimeInBreak(doctorId: string, date: Date, time: string, duration: number = 30): boolean {
    const schedule = this.getDoctorSchedule(doctorId);
    if (!schedule) return false;

    const [slotHour, slotMin] = time.split(':').map(Number);
    const slotStartMinutes = slotHour * 60 + slotMin;
    const slotEndMinutes = slotStartMinutes + duration;

    // Check all breaks for this doctor
    return schedule.breaks.some(breakTime => {
      // Check if break applies to this date
      const breakDate = breakTime.date.toDateString();
      const targetDate = date.toDateString();

      if (breakTime.recurring === 'daily') {
        // Daily recurring break applies to all days
      } else if (breakTime.recurring === 'weekly') {
        // Weekly recurring - check if same day of week
        if (breakTime.date.getDay() !== date.getDay()) return false;
      } else {
        // Specific date break
        if (breakDate !== targetDate) return false;
      }

      // Check if slot overlaps with break time
      const [breakStartHour, breakStartMin] = breakTime.start.split(':').map(Number);
      const [breakEndHour, breakEndMin] = breakTime.end.split(':').map(Number);
      const breakStartMinutes = breakStartHour * 60 + breakStartMin;
      const breakEndMinutes = breakEndHour * 60 + breakEndMin;

      // Check for overlap
      return slotStartMinutes < breakEndMinutes && slotEndMinutes > breakStartMinutes;
    });
  }

  // Main method to check if doctor is available at a time slot
  isDoctorAvailable(doctorId: string, date: Date, time: string, duration: number = 30): boolean {
    // Check if doctor is working on this date
    if (!this.isDoctorWorkingOnDate(doctorId, date)) {
      return false;
    }

    // Check if time is within working hours
    if (!this.isTimeInWorkingHours(doctorId, date, time)) {
      return false;
    }

    // Check if time is during a break
    if (this.isTimeInBreak(doctorId, date, time, duration)) {
      return false;
    }

    return true;
  }

  // Get unavailability reason for UI display
  getUnavailabilityReason(doctorId: string, date: Date, time: string): string {
    if (!this.isDoctorWorkingOnDate(doctorId, date)) {
      return 'Day Off';
    }
    if (!this.isTimeInWorkingHours(doctorId, date, time)) {
      return 'Outside Working Hours';
    }
    if (this.isTimeInBreak(doctorId, date, time)) {
      const schedule = this.getDoctorSchedule(doctorId);
      const breakInfo = schedule?.breaks.find(b => {
        const [slotHour, slotMin] = time.split(':').map(Number);
        const slotMinutes = slotHour * 60 + slotMin;
        const [breakStartHour, breakStartMin] = b.start.split(':').map(Number);
        const breakStartMinutes = breakStartHour * 60 + breakStartMin;
        return slotMinutes >= breakStartMinutes;
      });
      return breakInfo?.reason || 'Break Time';
    }
    return 'Unavailable';
  }

  // Helper methods
  private generateTimeSlots(): string[] {
    const slots: string[] = [];
    const { startTime, endTime, slotDuration } = this.timeSlotConfig;

    // Parse start and end times
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);

    let currentHour = startHour;
    let currentMin = startMin;

    while (currentHour < endHour || (currentHour === endHour && currentMin < endMin)) {
      const timeStr = `${String(currentHour).padStart(2, '0')}:${String(currentMin).padStart(2, '0')}`;
      slots.push(timeStr);

      // Add slot duration
      currentMin += slotDuration;
      if (currentMin >= 60) {
        currentHour += Math.floor(currentMin / 60);
        currentMin = currentMin % 60;
      }
    }

    return slots;
  }

  getWeekDays(date: Date): Date[] {
    const week: Date[] = [];
    const current = new Date(date);
    const day = current.getDay();
    const diff = current.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Monday start

    for (let i = 0; i < 7; i++) {
      const weekDay = new Date(current.setDate(diff + i));
      week.push(new Date(weekDay));
    }

    return week;
  }

  getMonthDays(date: Date): Date[] {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];

    // Add days from previous month
    const firstDayOfWeek = firstDay.getDay();
    const daysFromPrevMonth = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    for (let i = daysFromPrevMonth; i > 0; i--) {
      days.push(new Date(year, month, 1 - i));
    }

    // Add current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    // Add days from next month to complete the grid
    const remainingDays = 42 - days.length; // 6 rows x 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }

    return days;
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  isSameMonth(date: Date): boolean {
    return date.getMonth() === this.selectedDate().getMonth();
  }

  getAppointmentsForDay(date: Date, doctorId?: string): Appointment[] {
    return this.appointments().filter(apt => {
      const sameDay = apt.date.toDateString() === date.toDateString();
      const sameDoctor = !doctorId || apt.doctorId === doctorId;
      return sameDay && sameDoctor;
    });
  }

  // Check if appointment occupies this time slot
  isAppointmentInSlot(appointment: Appointment, slotTime: string): boolean {
    const [aptHour, aptMin] = appointment.time.split(':').map(Number);
    const [slotHour, slotMin] = slotTime.split(':').map(Number);

    const aptStartMinutes = aptHour * 60 + aptMin;
    const aptEndMinutes = aptStartMinutes + appointment.duration;
    const slotStartMinutes = slotHour * 60 + slotMin;
    const slotEndMinutes = slotStartMinutes + this.timeSlotConfig.slotDuration;

    // Check if slot overlaps with appointment
    return slotStartMinutes < aptEndMinutes && slotEndMinutes > aptStartMinutes;
  }

  // Get appointment that starts at this time slot
  getAppointmentAtSlot(date: Date, time: string, doctorId?: string): Appointment | null {
    const appointments = this.getAppointmentsForDay(date, doctorId);
    return appointments.find(apt => apt.time === time) || null;
  }

  // Calculate how many slots this appointment spans
  getAppointmentSlotSpan(appointment: Appointment): number {
    return Math.ceil(appointment.duration / this.timeSlotConfig.slotDuration);
  }

  isTimeSlotAvailable(date: Date, time: string, doctorId: string, duration: number = 30, excludeAppointmentId?: string): boolean {
    // First check if doctor is available (working hours, breaks, days off)
    if (!this.isDoctorAvailable(doctorId, date, time, duration)) {
      return false;
    }

    const appointments = this.getAppointmentsForDay(date, doctorId);

    // Calculate the time range of the new appointment
    const [newStartHour, newStartMin] = time.split(':').map(Number);
    const newStartMinutes = newStartHour * 60 + newStartMin;
    const newEndMinutes = newStartMinutes + duration;

    // Check if any existing appointment overlaps with the new time range
    return !appointments.some(apt => {
      // Skip if this is the appointment being edited
      if (excludeAppointmentId && apt.id === excludeAppointmentId) {
        return false;
      }

      const [aptHour, aptMin] = apt.time.split(':').map(Number);
      const aptStartMinutes = aptHour * 60 + aptMin;
      const aptEndMinutes = aptStartMinutes + apt.duration;

      // Check for overlap: appointments overlap if one starts before the other ends
      return newStartMinutes < aptEndMinutes && newEndMinutes > aptStartMinutes;
    });
  }

  // Booking methods
  openBookingModal(date: Date, time: string): void {
    if (!this.selectedDoctor()) {
      alert(this.translationService.t('pleaseSelectDoctor'));
      return;
    }

    const doctor = this.selectedDoctor()!;
    const defaultDuration = 30; // Default duration for new appointments

    if (!this.isTimeSlotAvailable(date, time, doctor.id, defaultDuration)) {
      alert(this.translationService.t('timeSlotNotAvailable'));
      return;
    }

    this.selectedTimeSlot.set({ date, time });
    this.editingAppointment.set(null); // Clear editing state
    this.showBookingModal.set(true);
  }

  // Open modal to edit existing appointment
  editAppointment(appointment: Appointment): void {
    // Set the doctor for this appointment
    const doctor = this.doctors().find(d => d.id === appointment.doctorId);
    if (doctor) {
      this.selectedDoctor.set(doctor);
    }

    // Set editing state
    this.editingAppointment.set(appointment);
    this.selectedTimeSlot.set({ date: appointment.date, time: appointment.time });

    // Pre-fill form with existing data
    this.bookingForm.set({
      patientName: appointment.patientName,
      patientPhone: '', // You might want to store this in appointment
      patientEmail: '',
      appointmentType: appointment.type.toLowerCase(),
      duration: appointment.duration,
      notes: appointment.notes || ''
    });

    this.showBookingModal.set(true);
  }

  closeBookingModal(): void {
    this.showBookingModal.set(false);
    this.editingAppointment.set(null);
    this.bookingForm.set({
      patientName: '',
      patientPhone: '',
      patientEmail: '',
      appointmentType: 'consultation',
      duration: 30,
      notes: ''
    });
  }

  confirmBooking(): void {
    const form = this.bookingForm();
    const timeSlot = this.selectedTimeSlot();
    const doctor = this.selectedDoctor();
    const editing = this.editingAppointment();

    if (!form.patientName || !form.patientPhone || !timeSlot || !doctor) {
      alert(this.translationService.t('fillRequiredFields'));
      return;
    }

    // Check for overlaps with the selected duration
    const excludeId = editing ? editing.id : undefined;
    if (!this.isTimeSlotAvailable(timeSlot.date, timeSlot.time, doctor.id, form.duration, excludeId)) {
      const t = this.translationService;
      alert(`${t.t('timeSlotNotAvailable')}. ${t.t('pleaseSelectDoctor')} ${form.duration} ${t.t('minutes')}`);
      return;
    }

    if (editing) {
      // Update existing appointment
      this.appointments.update(apts =>
        apts.map(apt =>
          apt.id === editing.id
            ? {
                ...apt,
                patientName: form.patientName,
                doctorId: doctor.id,
                doctorName: doctor.name,
                date: timeSlot.date,
                time: timeSlot.time,
                duration: form.duration,
                type: form.appointmentType,
                notes: form.notes
              }
            : apt
        )
      );

      const t = this.translationService;
      alert(`${t.t('appointmentBooked')}! ${t.t('appointmentFor')} ${form.patientName} ${t.t('with')} ${doctor.name}`);
    } else {
      // Create new appointment
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        patientName: form.patientName,
        doctorId: doctor.id,
        doctorName: doctor.name,
        date: timeSlot.date,
        time: timeSlot.time,
        duration: form.duration,
        type: form.appointmentType,
        status: 'confirmed',
        notes: form.notes
      };

      this.appointments.update(apts => [...apts, newAppointment]);

      // Show success message with translations
      const t = this.translationService;
      const message = `${t.t('appointmentBooked')}! ${t.t('appointmentFor')} ${form.patientName} ${t.t('with')} ${doctor.name} ${t.t('on')} ${timeSlot.date.toLocaleDateString()} ${t.t('at')} ${timeSlot.time}`;
      alert(message);
    }

    this.closeBookingModal();
  }

  // Delete appointment
  deleteAppointment(appointmentId: string): void {
    const t = this.translationService;
    if (confirm(`${t.t('delete')} ${t.t('appointments')}?`)) {
      this.appointments.update(apts => apts.filter(apt => apt.id !== appointmentId));
    }
  }

  getDoctorColor(doctorId: string): string {
    const doctor = this.doctors().find(d => d.id === doctorId);
    return doctor?.color || '#6b7280';
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }
}
