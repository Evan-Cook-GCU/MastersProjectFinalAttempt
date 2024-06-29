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
  metricDataList: any[] = [];
  labels: string[] = [];
  constructor(private metricService: MetricService,
    private userService: UserService,
    private metricDataService: MetricDataService,
  ) {
  }
  update() {
    var user = this.userService.getLoggedInUser();
    this.metricDataService.getUsersDataForMetric(this.metricId || 0, user?.userId || 0).subscribe(data => {
      // Group data by date
      const groupedData: { [key: string]: any } = {};
      data.forEach(entry => {
        if (!groupedData[entry.date]) {
          groupedData[entry.date] = { date: entry.date, fields: {}, ids: [] };
        }
        groupedData[entry.date].ids.push(entry.metricDataId);
        entry.fields.forEach(field => {
          if (!groupedData[entry.date].fields[field.label]) {
            groupedData[entry.date].fields[field.label] = field.value;
          }
        });
      });
      // Convert grouped data to array
      this.metricDataList = Object.keys(groupedData).map(date => groupedData[date]);

      data.forEach(entry => {
        entry.fields.forEach(field => {
          if (!this.labels.includes(field.label)) {
            this.labels.push(field.label);
          }
        });
      });
    });
  }
  getFieldValue(entry: any, label: string): any {
    return entry.fields[label] || '';
  }
  removeEntry(index: number): void {
    const removedMetricIds = this.metricDataList[index].ids;
    if (removedMetricIds) {
      removedMetricIds.forEach((id: number) => {
        this.metricService.removeMetricData(id).subscribe(() => {
          this.update();
        });
      });
    }
  }
}

