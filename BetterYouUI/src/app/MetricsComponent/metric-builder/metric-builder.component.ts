import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Metric } from '../../Models/Models';
import { MetricService } from '../../services/MetricService/metric.service';

@Component({
  selector: 'app-metric-builder',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TableModule, ButtonModule, InputTextModule, CalendarModule, FormsModule],
  templateUrl: './metric-builder.component.html',
  styleUrls: ['./metric-builder.component.scss']
})
export class MetricBuilderComponent implements OnInit {

  metricForm: FormGroup;
  options: Metric[] = [];
  selectedOption: Metric | null = null;

  constructor(private formBuilder: FormBuilder, private metricService: MetricService) {
    this.metricForm = this.formBuilder.group({
      Name: ['', Validators.required],
      fields: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    this.metricService.metric$.subscribe(metrics => {
      this.options = metrics;
    });
  }

  get fieldsFormArray(): FormArray {
    return this.metricForm.get('fields') as FormArray;
  }

  addField(): void {
    const field = this.formBuilder.group({
      Label: ['', Validators.required],
      Type: ['', Validators.required]
    });
    this.fieldsFormArray.push(field);
  }

  deleteField(index: number): void {
    this.fieldsFormArray.removeAt(index);
  }

  onSubmit(): void {
    const newMetric: Metric = this.metricForm.value;
    if (this.selectedOption) {
      this.metricService.updateMetric(newMetric);
    } else {
      this.metricService.addMetric(newMetric);
    }
    this.resetForm();
  }

  resetForm(): void {
    this.metricForm.reset();
    this.fieldsFormArray.clear();
    this.selectedOption = null;
  }

  onOptionChange(newValue:Metric): void {
    this.fieldsFormArray.clear();
    newValue?.fields.forEach(field => {
      this.fieldsFormArray.push(this.formBuilder.group(field));
    });
    this.selectedOption = newValue;
    this.metricForm.patchValue(newValue);

  }
 
}
