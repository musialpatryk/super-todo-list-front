import { Component } from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {TranslationsService} from '../../services/translations/translations.service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
})
export class BaseLayoutComponent  {
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
    public userService: UserService,
    public translations: TranslationsService
  ) {
    this.currentLanguage = this.translations.getCurrentLanguage();
  }
}
