import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertMessages } from './alert-messages';
import { Alert } from './alert.model';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() id = 'default-alert';

  alerts: Alert[] = [];
  alertSubscription: Subscription = new Subscription();

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    // subscription represents a disposable resource
    this.alertSubscription = this.alertService
      .onAlert(this.id)
      .subscribe((alert) => {
        if (!alert.message) {
          this.alerts = [];
          return;
        }

        // renders alert message
        this.alerts.push(alert);
      });
  }

  ngOnDestroy() {
    // unsubscribe to avoid memory leaks
    this.alertSubscription.unsubscribe();
  }

  // method to close alert
  removeAlert(alert: Alert) {
    if (!this.alerts.includes(alert)) return;

    this.alerts = this.alerts.filter((x) => x !== alert);
  }

  // dynamic css classes depending on the alert type
  cssClass(alert: Alert) {
    if (!alert) return;

    const classes = ['alert', 'alert-dismissable'];

    const alertTypeClass = {
      [AlertMessages.SUCCESS]: 'alert alert-success',
      [AlertMessages.ERROR]: 'alert alert-danger',
    };

    classes.push(alertTypeClass[alert.alertType]);

    return classes.join(' ');
  }
}
