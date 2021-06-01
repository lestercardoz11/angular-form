import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { EntryBase } from './entry-base';
import { EntryTextbox } from './entry-textbox';
import { EntryDropdown } from './entry-dropdown';
import { EntryTextarea } from './entry-textarea';

@Injectable()
export class EntryService {
  getEntries() {
    const entries: EntryBase<string>[] = [
      new EntryTextbox({
        key: 'fullName',
        label: 'Full Name',
        type: 'text',
        required: true,
        order: 1,
      }),

      new EntryTextbox({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        required: true,
        order: 2,
      }),

      new EntryTextbox({
        key: 'Birthdate',
        label: 'Date of Birth',
        type: 'date',
        order: 3,
      }),

      new EntryTextarea({
        key: 'address',
        label: 'Address',
        order: 4,
      }),

      new EntryDropdown({
        key: 'department',
        label: 'Department',
        options: [
          { key: 'finance', value: 'Finance' },
          { key: 'it', value: 'IT' },
          { key: 'hr', value: 'HR' },
          { key: 'operations', value: 'Operations' },
          { key: 'marketing', value: 'Marketing' },
        ],
        order: 5,
      }),
    ];

    return of(entries.sort((a, b) => a.order - b.order));
  }
}
