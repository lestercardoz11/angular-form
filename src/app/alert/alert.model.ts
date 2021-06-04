export class Alert {
  id: string = '';
  message: string = '';
  alertType: string = '';

  // constructs a type with all properties of Type set to optional.
  constructor(init?: Partial<Alert>) {
    Object.assign(this, init);
  }
}
