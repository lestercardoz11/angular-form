import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EntryBase } from '../entry-base';
import { EntryControlService } from '../entry-control.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [EntryControlService],
})
export class DynamicFormComponent implements OnInit {
  @Input() entries: EntryBase<string>[] | null = [];
  form!: FormGroup;

  constructor(private ecs: EntryControlService) {}

  ngOnInit() {
    this.form = this.ecs.toFormGroup(this.entries as EntryBase<string>[]);
  }

  onSubmit() {
    console.log(this.form.getRawValue());
  }
}
