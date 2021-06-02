import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { EntryBase } from '../entry-base';
import { ManagerActions } from '../store/manager.action';

@Component({
  selector: 'app-dynamic-input',
  templateUrl: './dynamic-input.component.html',
  styleUrls: ['./dynamic-input.component.scss'],
})
export class DynamicInputComponent implements OnInit {
  public name = '';
  constructor(private store: Store) {}

  @Input() entry!: EntryBase<string>;
  @Input() form!: FormGroup;

  ngOnInit() {
    this.store.subscribe((value: any) => {
      this.name = value?.managerName?.manager;
    });
  }

  get isValid() {
    return this.form.controls[this.entry.key].valid;
  }

  selectDepartment(manager: string) {
    this.store.dispatch(ManagerActions({ manager }));
  }
}
