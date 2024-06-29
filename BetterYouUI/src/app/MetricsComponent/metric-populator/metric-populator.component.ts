import { Component, Input, OnInit, SimpleChanges, ViewChild, viewChild } from '@angular/core';
import { Field, Metric, MetricData, VALID_FIELD_TYPES } from '../../Models/Models'; // Importing from the Models file
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { MetricService } from '../../services/DataServices/metric.service';
import { MetricDataFormComponent } from './metric-data-form/metric-data-form.component';
import { MetricDataListComponent } from './metric-data-list/metric-data-list.component';

@Component({
  selector: 'app-metric-populator',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    FormsModule, CommonModule, ReactiveFormsModule, TableModule, ButtonModule, InputTextModule, CalendarModule,MetricDataFormComponent,
    MetricDataListComponent],
  templateUrl: './metric-populator.component.html',
  styleUrls: ['./metric-populator.component.scss']
})
export class MetricPopulatorComponent implements OnInit {
  @Input() item: Metric | null = null;
  @ViewChild(MetricDataFormComponent) formComponent!: MetricDataFormComponent;
  @ViewChild(MetricDataListComponent) ListComponent!: MetricDataListComponent;
  metricForm: FormGroup;
  metricDataList: MetricData[] = [];
  labels: string[] = [];


  constructor(private formBuilder: FormBuilder, private metricService: MetricService) {
    this.metricForm = this.formBuilder.group({
      //Name: [this.item?.name, Validators.required],
      fields: this.formBuilder.array(this.createFieldsArray(this.item?.fields || [])),
      date: [new Date(), Validators.required]
    });
  }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item']) {
      this.updateForm();
      this.formComponent?.update();
    }
  }
  ngAfterViewInit(): void {
    // Ensure the child component's update method is called after view initialization
    if (this.formComponent) {
      this.formComponent.update();
    }
    if (this.ListComponent) {
      this.ListComponent.update();
  }
}
  update(){
    this.updateForm();
    this.formComponent?.update();
  }
  private updateForm(): void {
    if (this.item) {
      this.metricService.getMetricFields(this.item.metricId).subscribe(fields => {
        if (this.item) {
          this.item.fields = fields;
          this.labels = fields.map(field => field.label);
          this.metricForm = this.formBuilder.group({
           // Name: [this.item.name, Validators.required],
            fields: this.formBuilder.array(this.createFieldsArray(fields)),
            date: [this.getCurrentDate(), Validators.required]
          });
        }
      });
    }
  }
private getCurrentDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  get fieldsFormArray(): FormArray {

    return this.metricForm.get('fields') as FormArray;
  }

  createFieldsArray(fields: Field[]): FormGroup[] {

    return fields.map(field => this.formBuilder.group({
      Label: [field.label, Validators.required],
      Type: [field.type, Validators.required],
      Value: ['', Validators.required]
    }));
  }

  onSubmit(): void {

    this.metricForm = this.formBuilder.group({
      //Name: [this.item?.name, Validators.required],
      fields: this.formBuilder.array(this.createFieldsArray(this.item?.fields || [])),
      date: [new Date(), Validators.required]
    });
    if (this.item) {
      const newMetricData: MetricData = {
        metricDataId: this.metricDataList.length + 1,
        groupMembershipId: 1,
        metricId: this.item.metricId,
        Name: this.metricForm.value.name,
        fields: this.metricForm.value.fields.map((field: any) => ({
          Label: field.label,
          Value: field.value
        })),
        date: this.metricForm.value.date
      };

      const existingIndex = this.metricDataList.findIndex(metric => metric.date === newMetricData.date);

      if (existingIndex !== -1) {
        this.metricDataList[existingIndex] = newMetricData;
      } else {
        this.metricDataList.push(newMetricData);
      }

      this.metricDataList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
  }

  resetForm(): void {
    this.metricForm.reset();
    this.fieldsFormArray.clear();
    this.metricForm.patchValue({ date: this.getCurrentDate() });
  }

  getFieldType(type: string): string {
    return VALID_FIELD_TYPES.includes(type) ? type : 'text';
  }

 

  removeEntry(index: number): void {
    const removedMetric = this.metricDataList.splice(index, 1)[0];
    if (removedMetric) {
      this.metricService.removeMetricData(removedMetric.metricDataId);
    }
  }
  handleFormSubmitted(): void {
    if (this.ListComponent) {
      this.ListComponent.update();
    }
  }

}
