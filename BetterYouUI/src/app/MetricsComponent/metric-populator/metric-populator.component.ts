import { Component, Input, OnInit } from '@angular/core';
import { Field, Metric, MetricData, VALID_FIELD_TYPES } from '../../Models/Models'; // Importing from the Models file
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { MetricService } from '../../services/DataServices/MetricService/metric.service';

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
  metricDataList: MetricData[] = []; // List to store submitted MetricData2 objects
  labels: string[] = []; // List of labels for table headers

  constructor(private formBuilder: FormBuilder,private metricService: MetricService) {
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
      date: [this.getCurrentDate(), Validators.required] // Initialize the date form control
    });
  }
  private getCurrentDate(): string {
    return new Date().toISOString().split('T')[0]; // Get current date without time
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

  onSubmit(): void {
    if (this.item) {
      const newMetricData2: MetricData = {
        metricDataId: this.metricDataList.length + 1,
        groupMembershipId: 1,
        metricId: this.item.metricId,
        Name: this.metricForm.value.Name,
        fields: this.metricForm.value.fields.map((field: any) => ({
          Label: field.Label,
          Value: field.Value
        })),
        date: this.metricForm.value.date
      };
  
      const existingIndex = this.metricDataList.findIndex(metric => metric.date === newMetricData2.date);
  
      if (existingIndex !== -1) {
        this.metricDataList[existingIndex] = newMetricData2;
      } else {
        this.metricDataList.push(newMetricData2);
      }
  
      this.metricDataList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      this.metricService.updateMetricDataList(this.item.metricId, this.metricDataList);
      //this.metricService.updateMetric({ ...this.item, data: this.metricDataList });
      console.log(this.metricDataList);
    }
  }

  resetForm(): void {
    // Reset the form and clear the fields
    this.metricForm.reset();
    this.fieldsFormArray.clear();
    this.metricForm.patchValue({ date: this.getCurrentDate() });
  }

  getFieldType(type: string): string {
    return VALID_FIELD_TYPES.includes(type) ? type : 'text';
  }
  

  getFieldValue(entry: MetricData, label: string): any {
    const field = entry.fields.find(field => field.Label === label);
    return field ? field.Value : '';
  }

  removeEntry(index: number): void {
    const removedMetric = this.metricDataList.splice(index, 1)[0];
    if (removedMetric) {
      this.metricService.removeMetricData(this.item?.metricId!, removedMetric.metricDataId);
    }
  }
}
