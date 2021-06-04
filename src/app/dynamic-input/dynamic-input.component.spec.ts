import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { EntryBase } from '../entry/entry-base';
import { reducer } from '../store/manager.reducer';
import { DynamicInputComponent } from './dynamic-input.component';

describe('DynamicInputComponent', () => {
  let component: DynamicInputComponent;
  let fixture: ComponentFixture<DynamicInputComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [DynamicFormComponent, DynamicInputComponent],
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot({ managerName: reducer }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicInputComponent);
    component = fixture.componentInstance;
  });

  it('should create dynamic textbox input component', () => {
    component.entry = {
      key: 'name',
      label: 'Full Name',
      type: 'text',
      required: true,
      controlType: 'textbox',
      order: 1,
    };
    component.form = new FormGroup({
      [component.entry.key]: new FormControl('', Validators.required),
    });
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should create dynamic select input component', () => {
    component.entry = {
      key: 'department',
      label: 'Department',
      options: [
        { key: 'finance', value: 'Finance', manager: 'Jeremy Middleton' },
        { key: 'it', value: 'IT', manager: 'Bonnie Buckley' },
        { key: 'hr', value: 'HR', manager: 'Donald Booth' },
        { key: 'operations', value: 'Operations', manager: 'Lucas Hale' },
        { key: 'marketing', value: 'Marketing', manager: 'Egbert Holland' },
      ],
      controlType: 'dropdown',
      order: 5,
    };
    component.form = new FormGroup({
      [component.entry.key]: new FormControl(''),
    });
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
