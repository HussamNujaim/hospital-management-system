import { Injectable, signal, computed } from '@angular/core';
import { Language, SUPPORTED_LANGUAGES, LanguageOption } from '../interfaces/language.interface';
import { translations, TranslationKey } from '../translations/translations';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly STORAGE_KEY = 'app-language';

  // Current language signal
  private currentLanguageSignal = signal<Language>(this.getInitialLanguage());

  // Computed properties
  currentLanguage = computed(() => this.currentLanguageSignal());
  currentDirection = computed(() => this.getLanguageOption(this.currentLanguage())?.direction || 'ltr');
  isRTL = computed(() => this.currentDirection() === 'rtl');

  constructor() {
    // Apply initial direction
    this.applyDirection();
  }

  /**
   * Get translation for a key
   */
  translate(key: TranslationKey): string {
    const lang = this.currentLanguage();
    return translations[lang][key] || translations.en[key] || key;
  }

  /**
   * Shorthand for translate
   */
  t(key: TranslationKey): string {
    return this.translate(key);
  }

  /**
   * Set the current language
   */
  setLanguage(language: Language): void {
    this.currentLanguageSignal.set(language);
    localStorage.setItem(this.STORAGE_KEY, language);
    this.applyDirection();
  }

  /**
   * Get all supported languages
   */
  getSupportedLanguages(): LanguageOption[] {
    return SUPPORTED_LANGUAGES;
  }

  /**
   * Get language option by code
   */
  getLanguageOption(code: Language): LanguageOption | undefined {
    return SUPPORTED_LANGUAGES.find(lang => lang.code === code);
  }

  /**
   * Get current language option
   */
  getCurrentLanguageOption(): LanguageOption {
    return this.getLanguageOption(this.currentLanguage()) || SUPPORTED_LANGUAGES[0];
  }

  /**
   * Apply direction to document
   */
  private applyDirection(): void {
    const direction = this.currentDirection();
    document.documentElement.dir = direction;
    document.documentElement.lang = this.currentLanguage();

    // Add RTL class to body for additional styling
    if (direction === 'rtl') {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  }

  /**
   * Get initial language from storage or browser
   */
  private getInitialLanguage(): Language {
    // Try localStorage first
    const stored = localStorage.getItem(this.STORAGE_KEY) as Language;
    if (stored && SUPPORTED_LANGUAGES.some(lang => lang.code === stored)) {
      return stored;
    }

    // Try browser language
    const browserLang = navigator.language.split('-')[0] as Language;
    if (SUPPORTED_LANGUAGES.some(lang => lang.code === browserLang)) {
      return browserLang;
    }

    // Default to English
    return 'en';
  }
}

