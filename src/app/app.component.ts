import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { EntryBase } from './entry-base';
import { EntryService } from './entry.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [EntryService],
})
export class AppComponent {
  title = 'Angular Form';

  entries$: Observable<EntryBase<any>[]>;

  constructor(service: EntryService) {
    this.entries$ = service.getEntries();
  }
}
