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
    FormsModule, CommonModule, ReactiveFormsModule, TableModule, ButtonModule, InputTextModule, CalendarModule, MetricDataFormComponent,
    MetricDataListComponent],
  templateUrl: './metric-populator.component.html',
  styleUrls: ['./metric-populator.component.scss']
})
export class MetricPopulatorComponent implements OnInit {
  @Input() item: Metric | null = null;
  @ViewChild(MetricDataFormComponent) formComponent!: MetricDataFormComponent;
  @ViewChild(MetricDataListComponent) ListComponent!: MetricDataListComponent;
  
  metricDataList: MetricData[] = [];
  labels: string[] = [];


  constructor( private metricService: MetricService) {
  }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item']) {
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
  update() {
    this.formComponent?.update();
  }

  handleFormSubmitted(): void {
    if (this.ListComponent) {
      this.ListComponent.update();
    }
  }

}
