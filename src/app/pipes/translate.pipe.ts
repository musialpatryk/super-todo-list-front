import {OnDestroy, Pipe, PipeTransform} from '@angular/core';
import {TranslationsService} from '../services/translations/translations.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';


@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private markForTransform = true;
  private value!: string;
  private _destroy$ = new Subject<void>();

  constructor(
    private translationsService: TranslationsService
  ) {
    translationsService.translationChange$
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        this.markForTransform = true;
        console.log('markForTransform');
      })
  }

  transform(value: string): string {
    if (this.markForTransform) {
      this.value = this.translationsService.translate(value);
      this.markForTransform = false;
    }
    return this.value;
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
