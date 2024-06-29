import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Field, Metric, MetricData, VALID_FIELD_TYPES } from '../../../Models/Models';
import { MetricService } from '../../../services/DataServices/metric.service';
import { MetricDataService } from '../../../services/DataServices/metric-data.service';
import { UserService } from '../../../services/DataServices/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-metric-data-form',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    FormsModule, CommonModule, ReactiveFormsModule, TableModule, ButtonModule, InputTextModule, CalendarModule],
  templateUrl: './metric-data-form.component.html',
  styleUrl: './metric-data-form.component.scss'
})
export class MetricDataFormComponent {
  @Input() fields: Field[] | null = null;
  @Input() metricId: number | undefined;
  @Output() formSubmitted = new EventEmitter<void>();
  metricForm: FormGroup;
  metricDataList: MetricData[] = [];
  labels: string[] = [];
  name: string = '';
  //getter and setter for metricId
  private eventSubscription: Subscription;
  

  constructor(private formBuilder: FormBuilder, private metricService: MetricService,
    private metricDataService: MetricDataService,
    private usersService: UserService) {
      this.eventSubscription = this.metricService.event$.subscribe(() => {
        this.update();
      });
    if (!(this.metricId == undefined || this.metricId == -1)) {
      this.update();
    }
    this.metricForm = this.formBuilder.group({
      fields: this.formBuilder.array(this.createFieldsArray(this.fields || [])),
      date: [new Date(), Validators.required]
    });
  }

  update() {
    this.metricService.getMetricFields(this.metricId || 0).subscribe(fields => {
      this.fields = fields;
      this.labels = fields.map(field => field.label);
      this.metricForm = this.formBuilder.group({
        fields: this.formBuilder.array(this.createFieldsArray(this.fields || [])),
        date: [new Date(), Validators.required]
      });
    });
    this.metricService.getMetric(this.metricId || 0).subscribe(metric => {
      this.name = metric.name;
    });
  }
  ngonChanges(changes: SimpleChanges): void {
    if (changes['metricId']) {
      this.update();
    }
  }

  createFieldsArray(fields: Field[]): FormGroup[] {

    return fields.map(field => this.formBuilder.group({
      Label: [field.label, Validators.required],
      Type: [field.type, Validators.required],
      Value: ['', Validators.required]
    }));
  }
  getFieldType(type: string): string {
    return VALID_FIELD_TYPES.includes(type) ? type : 'text';
  }
  onSubmit(): void {

    if (this.fields) {
      this.metricForm.value.fields.forEach((field: any) => {
        this.metricDataService.createMetricData(this.metricId || 0,
          this.usersService.getLoggedInUser()?.userId || 0,
          field.Label,
          field.Value,
          this.metricForm.value.date).subscribe(() => {
            this.formSubmitted.emit();  // Emit the event after form submission
          })
      });
    }
  }
  get fieldsFormArray(): FormArray {

    return this.metricForm.get('fields') as FormArray;
  }
}
