import { EntryBase } from './entry-base';

export class EntryTextbox extends EntryBase<string> {
  controlType = 'textbox';
}

export class EntryTextarea extends EntryBase<string> {
  controlType = 'textarea';
}

export class EntryDropdown extends EntryBase<string> {
  controlType = 'dropdown';
}
