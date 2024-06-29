import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Metric, MetricData } from '../../../Models/Models';
import { MetricService } from '../../../services/DataServices/metric.service';
import { UserService } from '../../../services/DataServices/user.service';
import { MetricDataService } from '../../../services/DataServices/metric-data.service';

@Component({
  selector: 'app-metric-data-list',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    FormsModule, CommonModule, ReactiveFormsModule, TableModule, ButtonModule, InputTextModule, CalendarModule],
  templateUrl: './metric-data-list.component.html',
  styleUrl: './metric-data-list.component.scss'
})
export class MetricDataListComponent {
  @Input() metricId: number | undefined;
  metricDataList: MetricData[] = [];
  labels: string[] = [];
  constructor(private metricService: MetricService,
    private userService: UserService,
    private metricDataService: MetricDataService,
  ) {
  }
  update() {
    var user = this.userService.getLoggedInUser();
    this.metricDataService.getUsersDataForMetric(this.metricId || 0, user?.userId || 0).subscribe(data => {
      this.metricDataList = data;
      data.forEach(entry => {
        entry.fields.forEach(field => {
          if (!this.labels.includes(field.label)) {
            this.labels.push(field.label);
          }
        });
      });
    });
  }
  getFieldValue(entry: MetricData, label: string): any {


    const field = entry.fields.find(field => field.label === label);
    return field ? field.value : '';
  }
  removeEntry(index: number): void {
    const removedMetric = this.metricDataList.splice(index, 1)[0];
    if (removedMetric) {
      this.metricService.removeMetricData(removedMetric.metricDataId).subscribe(() => {
        
        this.update();
    });
  }
}
}
