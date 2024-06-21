import { Component, Input, OnInit } from '@angular/core';
import { Field, Metric, MetricData2 } from '../../Models/Models'; // Importing from the Models file
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-metric-populator',
  standalone: true,
  imports: [CommonModule,
     ReactiveFormsModule,
      FormsModule,CommonModule, ReactiveFormsModule, TableModule, ButtonModule, InputTextModule, CalendarModule],
  templateUrl: './metric-populator.component.html',
  styleUrls: ['./metric-populator.component.scss']
})
export class MetricPopulatorComponent implements OnInit {
  @Input() item: Metric | null = null; // Input property to receive a Metric object
  metricForm: FormGroup; // Form group for the form
  options: Metric[] = []; // Options for the metrics
  selectedOption: Metric | null = null; // Selected option for the metric
  metricDataList: MetricData2[] = []; // List to store submitted MetricData2 objects
  labels: string[] = []; // List of labels for table headers

  constructor(private formBuilder: FormBuilder) {
    console.log(this.item);
    // Initialize the form group with Name, fields array, and date
    this.metricForm = this.formBuilder.group({
      Name: [this.item?.Name, Validators.required],
      fields: this.formBuilder.array(this.createFieldsArray(this.item?.fields || [])),
      date: [new Date(), Validators.required] // Add the date form control
    });
    console.log(this.metricForm?.value.fields);
  }

  ngOnInit(): void {
    console.log(this.item);
    const fields: Field[] = this.item?.fields ?? [];
    this.labels = fields.map(field => field.Label); // Initialize labels
    // Map fields to form groups
    this.metricForm = this.formBuilder.group({
      Name: [this.item?.Name, Validators.required],
      fields: this.formBuilder.array(this.createFieldsArray(fields)),
      date: [new Date(), Validators.required] // Initialize the date form control
    });
  }

  get fieldsFormArray(): FormArray {
    return this.metricForm.get('fields') as FormArray;
  }

  createFieldsArray(fields: Field[]): FormGroup[] {
    // Create an array of form groups for each field
    return fields.map(field => this.formBuilder.group({
      Label: [field.Label, Validators.required],
      Type: [field.Type, Validators.required],
      Value: ['', Validators.required] // Add a value control to store the field input
    }));
  }

  refresh() {
    console.log(this.metricForm?.value.fields);
  }

  addField(): void {
    // Add a new field to the form array
    const field = this.formBuilder.group({
      Label: ['', Validators.required],
      Type: ['', Validators.required],
      Value: ['', Validators.required] // Add a value control to store the field input
    });
    this.fieldsFormArray.push(field);
  }

  deleteField(index: number): void {
    // Remove a field from the form array
    this.fieldsFormArray.removeAt(index);
  }

  onSubmit(): void {
    // Handle form submission
    const newMetric: MetricData2 = {
      Name: this.metricForm.value.Name,
      fields: this.metricForm.value.fields.map((field: any) => ({
        Label: field.Label,
        Value: field.Value
      })),
      date: this.metricForm.value.date
    };

    // Check if a metric data entry already exists for the same date
    const existingIndex = this.metricDataList.findIndex(metric => metric.date === newMetric.date);

    if (existingIndex !== -1) {
      // Overwrite the existing data
      this.metricDataList[existingIndex] = newMetric;
    } else {
      // Add new metric data
      this.metricDataList.push(newMetric);
    }

    // Sort by date
    this.metricDataList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    console.log(this.metricDataList);
    // Perform actions with the newMetric, including the date
  }

  resetForm(): void {
    // Reset the form and clear the fields
    this.metricForm.reset();
    this.fieldsFormArray.clear();
    this.selectedOption = null;
  }

  onOptionChange(newValue: Metric): void {
    // Handle the change of selected metric option
    this.fieldsFormArray.clear();
    newValue?.fields.forEach(field => {
      this.fieldsFormArray.push(this.formBuilder.group({
        Label: [field.Label, Validators.required],
        Type: [field.Type, Validators.required],
        Value: ['', Validators.required] // Add a value control to store the field input
      }));
    });
    this.labels = newValue?.fields.map(field => field.Label) || [];
    this.selectedOption = newValue;
    this.metricForm.patchValue(newValue);
  }

  getFieldType(type: string): string {
    const validTypes = ['text', 'number', 'date', 'email', 'url', 'password', 'tel'];
    return validTypes.includes(type) ? type : 'text';
  }

  getFieldValue(entry: MetricData2, label: string): any {
    const field = entry.fields.find(field => field.Label === label);
    return field ? field.Value : '';
  }

  removeEntry(index: number): void {
    this.metricDataList.splice(index, 1);
  }
}
