/**
 * Doctor Availability and Schedule Interfaces
 * Defines working hours, days off, and break times for doctors
 */

// Days of the week
export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

// Time range for working hours or breaks
export interface TimeRange {
  start: string; // Format: 'HH:mm' (e.g., '09:00')
  end: string;   // Format: 'HH:mm' (e.g., '17:00')
}

// Working hours for a specific day
export interface DailySchedule {
  day: DayOfWeek;
  isWorkingDay: boolean;
  timeRanges: TimeRange[]; // Multiple ranges for split shifts (e.g., morning + afternoon)
}

// Break time (lunch, coffee break, etc.)
export interface BreakTime {
  id: string;
  doctorId: string;
  date: Date;      // Specific date for the break
  start: string;   // Format: 'HH:mm'
  end: string;     // Format: 'HH:mm'
  reason: string;  // 'Lunch', 'Meeting', 'Surgery', etc.
  recurring?: 'daily' | 'weekly'; // Optional: recurring break
}

// Complete doctor schedule
export interface DoctorSchedule {
  doctorId: string;
  weeklySchedule: DailySchedule[];  // Regular working hours by day
  breaks: BreakTime[];               // Specific break times
  daysOff: Date[];                   // Specific days off (vacations, holidays)
}

// Time slot availability status
export interface SlotAvailability {
  date: Date;
  time: string;
  isAvailable: boolean;
  reason?: 'outside-working-hours' | 'day-off' | 'break-time' | 'booked';
}

