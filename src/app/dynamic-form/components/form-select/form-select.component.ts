import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'form-select',
  styleUrls: ['form-select.component.scss'],
  template: `
    <div 
      class="dynamic-field form-select"
      [formGroup]="group">
      <label>{{ config.label }}</label>
      <select *ngIf="config.optionType == 'object'" [formControlName]="config.name">
        <option *ngIf="config.placeholder" value="">{{ config.placeholder }}</option>
        <option *ngFor="let option of config.options" [value]="option.id" [selected]="config.value == option.id">
          {{ option.name }}
        </option>
      </select>
      <select *ngIf="config.optionType == 'array'" [formControlName]="config.name">
        <option *ngIf="config.placeholder" value="">{{ config.placeholder }}</option>
        <option *ngFor="let option of config.options" [value]="option" [selected]="config.value == option">
          {{ option }}
        </option>
      </select>
    </div>
  `
})
export class FormSelectComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
