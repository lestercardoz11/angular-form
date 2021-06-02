import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { EntryBase } from '../entry/entry-base';
import { ManagerActions } from '../store/manager.action';

@Component({
  selector: 'app-dynamic-input',
  templateUrl: './dynamic-input.component.html',
  styleUrls: ['./dynamic-input.component.scss'],
})
export class DynamicInputComponent {
  constructor(private store: Store) {}

  @Input() entry!: EntryBase<string>;
  @Input() form!: FormGroup;

  get isValid() {
    return this.form.controls[this.entry.key].valid;
  }

  selectDepartment(event: any) {
    const manager = event.target.selectedOptions[0].attributes[3].value;
    this.store.dispatch(ManagerActions({ manager }));
  }
}
