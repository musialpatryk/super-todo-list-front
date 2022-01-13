import {Inject, Injectable} from '@angular/core';
import {TRANSLATIONS} from './translations';
import {Observable, Subject} from 'rxjs';
import {DOCUMENT} from '@angular/common';

export interface ITranslation {
  readonly key: string;
  readonly value: string;
}

export interface ITranslationLanguage {
  readonly lang: string;
  readonly translations: ITranslation[];
}

@Injectable({
  providedIn: 'root'
})
export class TranslationsService {
  availableLanguages!: string[];
  translationChange$: Observable<void>;

  private languageStorageKey = 'currentLanguage';
  private sessionStorage!: Storage;
  private availableTranslations: ITranslationLanguage[] = TRANSLATIONS;
  private currentLanguage!: ITranslationLanguage;
  private translationChange = new Subject<void>();

  constructor(
    @Inject(DOCUMENT) document: Document
  ) {
    this.sessionStorage = document.defaultView!.sessionStorage;
    this.translationChange$ = this.translationChange.asObservable();
    this.initializeTranslations();
  }

  private initializeTranslations(): void {
    if (!this.availableTranslations.length) {
      throw new Error('No translations found.')
    }

    this.availableLanguages = this.availableTranslations.map((item) => {
      return item.lang;
    });
    this.currentLanguage = this.getCurrentLangFromStorage();
  }

  private getCurrentLangFromStorage(): ITranslationLanguage {
    const data = sessionStorage.getItem(this.languageStorageKey);
    if (!data) {
      return this.availableTranslations[0];
    }

    const savedTranslation = this.availableTranslations.find((translation) => {
      return translation.lang === data;
    });
    return savedTranslation || this.availableTranslations[0];
  }

  translate(key: string | undefined): string {
    if (typeof key !== 'string') {
      return '';
    }

    const searchedTranslation = this.currentLanguage.translations.find((translation) => {
      return translation.key === key;
    });

    if (!searchedTranslation) {
      return key;
    }

    return searchedTranslation.value;
  }

  changeLanguage(lang: string): boolean {
    const searchedLang = this.availableTranslations.find((translation) => {
      return translation.lang === lang;
    });

    if (!searchedLang) {
      return false;
    }

    this.sessionStorage.setItem(this.languageStorageKey, searchedLang.lang);
    this.currentLanguage = searchedLang;
    this.translationChange.next();
    return true;
  }

  getCurrentLanguage(): string {
    return this.currentLanguage.lang;
  }
}
