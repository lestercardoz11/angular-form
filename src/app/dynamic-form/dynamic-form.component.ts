import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { EntryBase } from '../entry/entry-base';
import { EntryControlService } from '../entry/entry-control.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [EntryControlService],
})
export class DynamicFormComponent implements OnInit {
  @Input() entries: EntryBase<string>[] | null = [];
  form!: FormGroup;
  public name: string = '';

  constructor(private ecs: EntryControlService, private store: Store) {}

  ngOnInit() {
    this.form = this.ecs.toFormGroup(this.entries as EntryBase<string>[]);
    this.store.subscribe((value: any) => {
      this.name = value?.managerName?.manager;
    });
  }

  onSubmit() {
    console.log(this.form.getRawValue());
  }
}
