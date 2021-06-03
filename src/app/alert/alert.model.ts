export class Alert {
  id: string = '';
  message: string = '';
  alertType: string = '';

  constructor(init?: Partial<Alert>) {
    Object.assign(this, init);
  }
}
