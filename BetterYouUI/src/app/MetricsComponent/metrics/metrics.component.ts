import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { MetricData } from '../../Models/Models';
import { MetricDataService } from '../../services/MetricDataService/MetricDataService';

@Component({
  selector: 'app-metrics',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TableModule, ButtonModule, InputTextModule, CalendarModule],
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent {
  metricForm: FormGroup;
  entries: MetricData[] = [];
  labels: string[] = [];

  constructor(private formBuilder: FormBuilder, private dataService: MetricDataService) {
    console.log(1)
    this.metricForm = this.formBuilder.group({
      metrics: this.formBuilder.group(this.createMetricControls()),
      date: ['', Validators.required],
      labels: this.formBuilder.array(this.labels.map(label => this.formBuilder.control(label)))
    });
    console.log(2)

    this.labelsFormArray.valueChanges.subscribe(value => {
      this.labels = value;
      this.dataService.updateLabels(value);
      this.updateMetricControls();
    });
    console.log(3)
  }

  get labelsFormArray(): FormArray {
    console.log(4)
    return this.metricForm.get('labels') as FormArray;
  }

  get metricsFormGroup(): FormGroup {
    console.log(5)
    return this.metricForm.get('metrics') as FormGroup;
  }

  createMetricControls(): { [key: string]: any } {
    console.log(6)
    const controls: { [key: string]: any } = {};
    console.log(61)
    this.labels.forEach((label, index) => {
      controls['metric' + (index + 1)] = ['', Validators.required];
    });
    return controls;
  }
  
  updateMetricControls(): void {
    console.log(7)
    const metricsGroup = this.metricsFormGroup;
    const labelsArray = this.labelsFormArray;
  
    this.labels.forEach((label, index) => {
      const controlName = 'metric' + (index + 1);
      if (!metricsGroup.controls[controlName]) {
        metricsGroup.addControl(controlName, this.formBuilder.control('', Validators.required));
        labelsArray.insert(index, this.formBuilder.control(label));
      }
    });
  
    // Remove extra controls if labels are reduced
    Object.keys(metricsGroup.controls).forEach(controlName => {
      const index = parseInt(controlName.replace('metric', ''), 10) - 1;
      if (index >= this.labels.length) {
        metricsGroup.removeControl(controlName);
        labelsArray.removeAt(index);
      }
    });
  }
  addEntry(): void {
    console.log(8)
    const newEntry: MetricData = {
      metricDataId: 1, // This would be generated by the backend
      userMetricId: 1, // Set appropriately
      dataValue: this.metricsFormGroup.value,
      dataDate: new Date(this.metricForm.value.date)
    };
    this.entries.push(newEntry);
    this.entries.sort((a, b) => a.dataDate.getTime() - b.dataDate.getTime());
    this.dataService.updateMetricData(this.entries);
    this.metricForm.reset();
  }

  removeEntry(index: number): void {
    console.log(9)
    this.entries.splice(index, 1);
    this.dataService.updateMetricData(this.entries);
  }

  onSubmit(): void {
    console.log(10)
    if (this.entries.length > 0) {
      console.log(this.entries);
    }
  }
}
