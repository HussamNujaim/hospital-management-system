export type Language = 'en' | 'ar' | 'fr' | 'es';
export type Direction = 'ltr' | 'rtl';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  direction: Direction;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
    flag: '🇺🇸'
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    direction: 'rtl',
    flag: '🇸🇦'
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    direction: 'ltr',
    flag: '🇫🇷'
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    direction: 'ltr',
    flag: '🇪🇸'
  }
];

