import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Angular Form';

  angularForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
  });

  onSubmit() {
    console.warn(this.angularForm.value);
  }
}
