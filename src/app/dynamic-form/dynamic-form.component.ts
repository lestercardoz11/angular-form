import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AlertService } from '../alert/alert.service';
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

  constructor(
    private ecs: EntryControlService,
    private store: Store,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.form = this.ecs.toFormGroup(this.entries as EntryBase<string>[]);
    this.store.subscribe((value: any) => {
      this.name = value?.managerName?.manager;
    });
  }

  private displaySuccess() {
    this.alertService.success('Thanks for filling out our form!');
  }

  private displayError(message: string) {
    this.alertService.error(message);
  }

  onSubmit() {
    try {
      console.log(this.form.getRawValue());
      this.displaySuccess();
    } catch (e) {
      this.displayError(e);
    }
  }
}
