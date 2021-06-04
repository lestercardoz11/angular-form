import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AlertMessages } from './alert-messages';
import { Alert } from './alert.model';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private subject = new BehaviorSubject<Alert>({
    id: '',
    message: '',
    alertType: '',
  });
  private defaultId = 'default-alert';

  // handle alert operations
  onAlert(id = this.defaultId): Observable<Alert> {
    return this.subject.asObservable().pipe(filter((x) => x && x.id === id));
  }

  success(message: string) {
    this.alert(new Alert({ alertType: AlertMessages.SUCCESS, message }));
  }

  error(message: string) {
    this.alert(new Alert({ alertType: AlertMessages.ERROR, message }));
  }

  alert(alert: Alert) {
    alert.id = alert.id || this.defaultId;
    this.subject.next(alert);
  }

  clear(id = this.defaultId) {
    this.subject.next(new Alert({ id }));
  }
}
