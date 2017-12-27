import { Component, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'form-input',
  styleUrls: ['form-input.component.scss'],
  template: `
    <div 
      class="dynamic-field form-input" 
      [formGroup]="group">
      <label>{{ config.label }}</label>
      <input 
        type="text"
        [attr.disabled]="config.fixed?'':null"
        [attr.placeholder]="config.placeholder"
        [typeahead]="config.typeahead"
        typeaheadOptionField = "config.typeaheadOptionField"
        [typeaheadScrollable]="config.typeaheadScrollable"
        [formControlName]="config.name">
    </div>
  `
})
export class FormInputComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
