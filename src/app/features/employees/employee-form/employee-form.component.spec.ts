import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { EmployeeFormComponent } from './employee-form.component';
import { EmployeeService } from '../../../core/services/employee.service';
import { DepartmentService } from '../../../core/services/department.service';
import { SalaryService } from '../../../core/services/salary.service';
import { MaterialModule } from '../../../shared/material.module';

describe('EmployeeFormComponent Validation', () => {
  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MaterialModule
      ],
      declarations: [EmployeeFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        EmployeeService,
        DepartmentService,
        SalaryService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // initializes the forms
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('required field validation', () => {
    it('should mark name and departmentId as invalid when empty', () => {
      const nameControl = component.form.get('name')!;
      const deptControl = component.form.get('departmentId')!;
      
      nameControl.setValue('');
      deptControl.setValue(null);
      
      expect(nameControl.valid).toBeFalsy();
      expect(nameControl.errors && nameControl.errors['required']).toBeTruthy();
      
      expect(deptControl.valid).toBeFalsy();
      expect(deptControl.errors && deptControl.errors['required']).toBeTruthy();
    });

    it('should mark name as valid when filled', () => {
      const nameControl = component.form.get('name')!;
      nameControl.setValue('John Doe');
      
      expect(nameControl.valid).toBeTruthy();
    });
  });

  describe('email validation', () => {
    it('should mark email as invalid if incorrect format', () => {
      const emailControl = component.form.get('email')!;
      
      emailControl.setValue('not-an-email');
      
      expect(emailControl.valid).toBeFalsy();
      expect(emailControl.errors && emailControl.errors['email']).toBeTruthy();
    });

    it('should mark email as valid if correct format', () => {
      const emailControl = component.form.get('email')!;
      
      emailControl.setValue('john@example.com');
      
      expect(emailControl.valid).toBeTruthy();
    });
  });

  describe('salary validation', () => {
    it('should mark baseAmount as invalid if negative', () => {
      const baseAmountControl = component.salaryForm.get('baseAmount')!;
      
      baseAmountControl.setValue(-100);
      
      expect(baseAmountControl.valid).toBeFalsy();
      expect(baseAmountControl.errors && baseAmountControl.errors['min']).toBeTruthy();
    });

    it('should mark baseAmount as valid if positive', () => {
      const baseAmountControl = component.salaryForm.get('baseAmount')!;
      
      baseAmountControl.setValue(50000);
      
      expect(baseAmountControl.valid).toBeTruthy();
    });

    it('should require paymentFrequency', () => {
      const freqControl = component.salaryForm.get('paymentFrequency')!;
      
      freqControl.setValue('');
      
      expect(freqControl.valid).toBeFalsy();
      expect(freqControl.errors && freqControl.errors['required']).toBeTruthy();
    });
  });
});
