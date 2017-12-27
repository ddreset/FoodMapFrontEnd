import { ValidatorFn } from '@angular/forms';

export interface FieldConfig {
  disabled?: boolean,
  fixed?: boolean,
  label?: string,
  name: string,
  optionType?: string,
  options?: any[],
  placeholder?: string,
  type: string,
  validation?: ValidatorFn[],
  value?: any,
  typeahead?: any[],
  typeaheadOptionField?: string,
  typeaheadScrollable?: boolean
}
