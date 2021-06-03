import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicInputComponent } from './dynamic-input/dynamic-input.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/manager.reducer';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [AppComponent, DynamicInputComponent, DynamicFormComponent, AlertComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ managerName: reducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
