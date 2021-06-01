import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EntryBase } from '../entry-base';

@Component({
  selector: 'app-dynamic-input',
  templateUrl: './dynamic-input.component.html',
  styleUrls: ['./dynamic-input.component.scss'],
})
export class DynamicInputComponent {
  constructor() {}

  @Input() entry!: EntryBase<string>;
  @Input() form!: FormGroup;
  get isValid() {
    return this.form.controls[this.entry.key].valid;
  }
}
