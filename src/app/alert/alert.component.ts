import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
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
  routeSubscription: Subscription = new Subscription();

  constructor(private router: Router, private alertService: AlertService) {}

  ngOnInit() {
    this.alertSubscription = this.alertService
      .onAlert(this.id)
      .subscribe((alert) => {
        if (!alert.message) {
          this.alerts = [];
          return;
        }

        this.alerts.push(alert);
      });

    // clear alerts on location change
    this.routeSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.alertService.clear(this.id);
      }
    });
  }

  ngOnDestroy() {
    // unsubscribe to avoid memory leaks
    this.alertSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  removeAlert(alert: Alert) {
    if (!this.alerts.includes(alert)) return;

    this.alerts = this.alerts.filter((x) => x !== alert);
  }

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
