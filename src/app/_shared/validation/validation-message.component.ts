import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from './validation.service';

@Component({
  selector: 'validation-message',
  template: '<span *ngIf="errorMessage !== null" class="text-danger">{{errorMessage}}</span>'
})
export class ValidationMessageComponent{

  @Input() control: FormControl;
  constructor() { }

  get errorMessage() {
    return ValidationService.getControlErrorMessage(this.control);
  }
}
