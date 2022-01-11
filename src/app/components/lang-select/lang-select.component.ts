import { Component } from '@angular/core';
import {TranslationsService} from '../../services/translations/translations.service';

@Component({
  selector: 'app-lang-select',
  templateUrl: './lang-select.component.html',
})
export class LangSelectComponent {
  private _currentLanguage!: string;

  get currentLanguage() {
    return this._currentLanguage;
  }

  set currentLanguage(value: string) {
    if (this.translations.changeLanguage(value)) {
      this._currentLanguage = value;
    }
  }

  constructor(
    public translations: TranslationsService
  ) {
    this.currentLanguage = this.translations.getCurrentLanguage();
  }
}
