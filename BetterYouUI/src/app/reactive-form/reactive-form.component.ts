import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.scss'
})
export class ReactiveFormComponent {
  @Output() showFormInput: EventEmitter<any> = new EventEmitter();
  formGroup1 = this.formBuilder.group({
    formControl1: ['', Validators.required],
    formControl2: ['', Validators.required],
    formGroup2: this.formBuilder.group({
      subFormControl1: [''],
      subFormControl2: [''],
      subFormControl3: [''],
      subFormControl4: [''],
    }),
    formArray: this.formBuilder.array([this.formBuilder.control('')]),
  });

  constructor(private formBuilder: FormBuilder) {}

  get formArray() {
    return this.formGroup1.get('formArray') as FormArray;
  }

  addAlias() {
    this.formArray.push(this.formBuilder.control(''));
  }

  onSubmit() {
    // Emit event to possible child component
    this.showFormInput.emit(this.formGroup1.value)
    
  }
}
