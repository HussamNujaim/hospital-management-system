import { Component, ChangeDetectionStrategy, signal, computed, inject, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';
import { Language } from '../../interfaces/language.interface';

/**
 * Language Selector Component
 * Dropdown for selecting application language
 */
@Component({
  selector: 'hms-language-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageSelectorComponent {
  private translationService = inject(TranslationService);

  @ViewChild('dropdown', { read: ElementRef }) dropdown?: ElementRef;

  isOpen = signal(false);

  // Computed properties from translation service
  currentLanguage = computed(() => this.translationService.currentLanguage());
  currentLanguageOption = computed(() => this.translationService.getCurrentLanguageOption());
  supportedLanguages = computed(() => this.translationService.getSupportedLanguages());

  toggleDropdown(): void {
    this.isOpen.set(!this.isOpen());
  }

  selectLanguage(language: Language): void {
    this.translationService.setLanguage(language);
    this.isOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.dropdown && !this.dropdown.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }
}

