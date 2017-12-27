import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'form-file',
  styleUrls: ['form-file.component.scss'],
  template: `
    <div 
      class="dynamic-field form-input" 
      [formGroup]="group">
      <label>{{ config.label }}</label>
      <input 
        type="file"
        [attr.disabled]="config.fixed?'':null"
        [formControlName]="config.name"
        >
    </div>
  `
})
export class FormFileComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
