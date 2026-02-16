import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, Renderer2, signal, WritableSignal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

interface Language {
  code: string;
  name: string;
}

@Component({
  selector: 'app-dropdown-language',
  imports: [],
  templateUrl: './dropdown-language.component.html',
  styleUrl: './dropdown-language.component.css',
})
export class DropdownLanguageComponent implements OnInit {
  private readonly translateService = inject(TranslateService);
  private readonly renderer = inject(Renderer2);
  private readonly platform_id = inject(PLATFORM_ID);
  isOpen: WritableSignal<boolean> = signal<boolean>(false);

  // Available languages
  languages: Language[] = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'Arabic' },
    { code: 'de', name: 'Deutsch' },
  ];

  // Currently selected language
  selectedLanguage: Language = { code: this.translateService.getCurrentLang(), name: 'English' };

  ngOnInit(): void {
   if(isPlatformBrowser(this.platform_id)) {
    this.getSavedLanguage();
   }
  }

  toggleDropdown(): void {
    this.isOpen.update((open) => !open);
  }

  closeDropdown(): void {
    this.isOpen.set(false);
  }

  selectLanguage(language: Language): void {
    localStorage.setItem('selectedLanguage', language.code);
    this.selectedLanguage = language;
    this.closeDropdown();
    this.translateService.use(language.code);
    this.renderer.setAttribute(document.documentElement, 'lang', language.code);
    this.renderer.setAttribute(
      document.documentElement,
      'dir',
      language.code === 'en' || language.code === 'de' ? 'ltr' : 'rtl',
    );
  }

  getSavedLanguage(): void {
    const savedLanguageCode = localStorage.getItem('selectedLanguage');
    if (savedLanguageCode) {
      const savedLanguageObj = this.languages.find((lang) => lang.code === savedLanguageCode);
      if (savedLanguageObj) {
        this.selectedLanguage = savedLanguageObj;
        this.translateService.use(savedLanguageObj.code);
        this.renderer.setAttribute(document.documentElement, 'lang', savedLanguageObj.code);
        this.renderer.setAttribute(
          document.documentElement,
          'dir',
          savedLanguageObj.code === 'en' || savedLanguageObj.code === 'de' ? 'ltr' : 'rtl',
        );
      }
    }
  }
}
