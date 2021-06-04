import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './dynamic-form.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../store/manager.reducer';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [DynamicFormComponent],
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot({ managerName: reducer }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    component.entries = [
      {
        key: 'name',
        label: 'Full Name',
        type: 'text',
        value: '',
        required: true,
        controlType: 'textbox',
        order: 1,
      },
      {
        key: 'email',
        label: 'Email',
        value: '',
        type: 'email',
        required: true,
        controlType: 'textbox',
        order: 2,
      },
    ];
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create dynamic form component', () => {
    expect(component).toBeTruthy();
  });

  it('should test form validity', () => {
    const form = component.form;
    expect(form.valid).toBeFalsy();

    const nameInput = form.controls.name;
    nameInput.setValue('Test');

    const emailInput = form.controls.email;
    emailInput.setValue('test@test.com');

    expect(form.valid).toBeTruthy();
  });

  it('should email input validity', () => {
    const emailInput = component.form.controls.email;

    expect(emailInput.valid).toBeFalsy();

    emailInput.setValue('test');
    expect(emailInput.valid).toBeFalsy();

    emailInput.setValue('test@test');
    expect(emailInput.valid).toBeFalsy();

    emailInput.setValue('test@test.com');
    expect(emailInput.valid).toBeTruthy();
  });

  it('should submit the form', () => {
    const form = component.form;
    expect(form.valid).toBeFalsy();

    const nameInput = form.controls.name;
    nameInput.setValue('Test');

    const emailInput = form.controls.email;
    emailInput.setValue('test@test.com');

    expect(form.valid).toBeTruthy();

    component.onSubmit();
    let formData = form.getRawValue();

    expect(formData.name).toBe('Test');
    expect(formData.email).toBe('test@test.com');
  });
});
