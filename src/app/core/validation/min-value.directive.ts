import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appMinValue]',
  providers: [{provide: NG_VALIDATORS, useExisting: MinValueDirective, multi: true}]
})

export class MinValueDirective implements Validator {
  @Input('appMinValue') minValue!: number;

  constructor() { }

  validate(control: AbstractControl): {[key: string]: any}| null {
    return this.minValue ? minValueValidator(this.minValue)(control) : null;
  }

}

export function minValueValidator(minValue: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const isValid = minValue <= control.value;
    return isValid ? null : { 'appMinValue': true};
  }
}
