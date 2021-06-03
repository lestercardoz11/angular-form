import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EntryBase } from './entry-base';

@Injectable()
export class EntryControlService {
  constructor() {}

  toFormGroup(entries: EntryBase<string>[]) {
    const group: any = {};
    const emailRegexExp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    entries.forEach((entry) => {
      group[entry.key] = entry.required
        ? entry.key === 'email'
          ? new FormControl(
              entry.value || '',
              Validators.compose([
                Validators.required,
                Validators.pattern(emailRegexExp),
              ])
            )
          : new FormControl(entry.value || '', Validators.required)
        : new FormControl(entry.value || '');
    });
    return new FormGroup(group);
  }
}
