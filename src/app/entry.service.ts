import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { EntryBase } from './entry-base';
import { EntryTextbox } from './entry-textbox';
import { EntryDropdown } from './entry-dropdown';
import { EntryTextarea } from './entry-textarea';
import { EntryTextboxReadonly } from './entry-textbox-readonly';

@Injectable()
export class EntryService {
  getEntries() {
    const entries: EntryBase<string>[] = [
      new EntryTextbox({
        key: 'name',
        label: 'Full Name',
        type: 'text',
        required: true,
        order: 1,
      }),

      new EntryTextbox({
        key: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        order: 2,
      }),

      new EntryTextbox({
        key: 'birth-date',
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
          { key: 'finance', value: 'Finance', manager: 'Jeremy Middleton' },
          { key: 'it', value: 'IT', manager: 'Bonnie Buckley' },
          { key: 'hr', value: 'HR', manager: 'Donald Booth' },
          { key: 'operations', value: 'Operations', manager: 'Lucas Hale' },
          { key: 'marketing', value: 'Marketing', manager: 'Egbert Holland' },
        ],
        order: 5,
      }),

      new EntryTextboxReadonly({
        key: 'manager',
        label: 'Manager',
        type: 'text',
        readonly: true,
        order: 6,
      }),
    ];

    return of(entries.sort((a, b) => a.order - b.order));
  }
}
