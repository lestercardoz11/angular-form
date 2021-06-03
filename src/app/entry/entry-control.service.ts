import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EntryBase } from './entry-base';

@Injectable()
export class EntryControlService {
  constructor() {}

  toFormGroup(entries: EntryBase<string>[]) {
    const group: any = {};

    entries.forEach((entry) => {
      group[entry.key] = entry.required
        ? entry.key === 'email'
          ? new FormControl(
              entry.value || '',
              Validators.compose([Validators.required, Validators.email])
            )
          : new FormControl(entry.value || '', Validators.required)
        : new FormControl(entry.value || '');
    });
    return new FormGroup(group);
  }
}
