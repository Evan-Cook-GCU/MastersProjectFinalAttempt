import { CommonModule } from "@angular/common";
import { Component, Input, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { ChartConfiguration, ChartType, ChartEvent, registerables, Chart } from "chart.js";
import { BaseChartDirective } from "ng2-charts";
import { Metric, MetricData } from "../../Models/Models";
import { MetricService } from "../../services/DataServices/metric.service";
import { MetricDataService } from "../../services/DataServices/metric-data.service";

Chart.register(...registerables);

@Component({
  imports: [CommonModule, BaseChartDirective],
  selector: 'app-graph',
  standalone: true,
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  @Input() metrics: Metric[] = [];
  @Input() selectedUserId: number | null = null;
  public lineChartType: ChartType = 'line';
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: [],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        ticks: {
          callback: (value, index, values) => values[index].value,
          color: 'red',
        },
      },
      y: {
        position: 'left',
      },
      y1: {
        position: 'right',
        grid: {
          color: 'black',
        },
        ticks: {
          color: 'blue',
        },
      },
    },
    plugins: {
      legend: { display: true },
    },
  };

  

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  selectedXMetric: Metric | null = null;
  selectedYMetric: Metric | null = null;
  xField: string | undefined;
  yField: string | undefined;
  public tableData: { label: any, value: number }[] = [];
  constructor(private metricService: MetricService,
    private metricDaService: MetricDataService
  ) {}

  ngOnInit(): void {
    this.loadMetricFields();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['metrics']) {
      this.loadMetricFields();
    }if (changes['selectedUserId']) {
      this.loadMetricFields();
    }
  }
  
  private loadMetricFields(): void {
    this.metrics.forEach(metric => {
      this.metricService.getMetricFields(metric.metricId).subscribe(fields => {
        metric.fields = fields;
        if (this.metrics.length > 0) {
          this.selectedXMetric = this.metrics[0];
          this.selectedYMetric = this.metrics[0];
          if (this.selectedXMetric && this.selectedXMetric.fields&& this.selectedXMetric.fields.length > 0) {
            this.xField = 'Date'
          }
          if (this.selectedYMetric && this.selectedYMetric.fields&& this.selectedYMetric.fields.length > 0) {
            this.yField = this.selectedYMetric.fields[0].label;
          }
          this.updateChart();
        }
      });
    });
    
    
  }
  onXMetricFieldChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;
    this.selectedXMetric = this.metrics.find(metric => metric.metricId.toString() === value) || null;
    this.xField = this.selectedXMetric && this.selectedXMetric.fields.length > 0 ? this.selectedXMetric.fields[0].label :'Date' ;
    this.updateChart();
  }
  onYMetricFieldChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;
    this.selectedYMetric = this.metrics.find(metric => metric.metricId.toString() === value) || null;
    this.yField = this.selectedYMetric && this.selectedYMetric.fields.length > 0 ? this.selectedYMetric.fields[0].label : 'Date';
    this.updateChart();
  }
  onxFieldChange(event: Event): void {

    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;
    this.xField = value;
    this.updateChart();
  }
  onyFieldChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;
    this.yField = value;
    this.updateChart();
  }
  

  private updateChart(): void {
    if (!this.canUpdateChart()) return;

    const xData = this.getXData();
    const yData = this.getYData();
    const xLabels = this.getXLabels(xData);

    const dataset = this.createDataset(xData, yData);
    this.tableData = this.createTableData(xLabels, yData);

    this.lineChartData = this.createLineChartData(xLabels, dataset);
    this.lineChartOptions = this.createLineChartOptions(xLabels);

    this.chart?.update();
  }


  private createTableData(labels: any[], yData: number[]): { label: any, value: number }[] {
    return labels.map((label, index) => ({ label, value: yData[index] }));
  }

  private canUpdateChart(): boolean {
    if (!this.selectedUserId) {
      return false;
    }
    if (!this.selectedXMetric) {
      return false;
    }
  
  if (!this.selectedXMetric.data) {
    this.metricDaService.getUsersDataForMetric(this.selectedXMetric.metricId, this.selectedUserId).subscribe(data => {
      this.selectedXMetric!.data = data;
      this.loadMetricFields();
    }
    );
      return false;
  }
  
  if (!this.selectedYMetric) {
      return false;
  }
  
  if (!this.selectedYMetric.data) {
    this.metricDaService.getUsersDataForMetric(this.selectedYMetric.metricId, this.selectedUserId).subscribe(data => {
      this.selectedXMetric!.data = data;
      this.loadMetricFields();
    }
    );
      return false;
  }
  
  if (!this.xField) {
      return false;
  }
  
  if (!this.yField) {
      return false;
  }
  
  return true;
  }

  private getXData(): number[] {
    if (this.xField === 'Date') {
      return this.selectedXMetric!.data.map(entry => new Date(entry.date).getTime());
    }
    return this.selectedXMetric!.data.map(entry => entry.fields.find(f => f.label === this.xField)?.value || null).map(Number);
  }

  private getYData(): number[] {
    return this.selectedYMetric!.data.map(entry => entry.fields.find(f => f.label === this.yField)?.value || null).map(Number);
  }

  private getXLabels(xData: number[]): any[] {
    if (this.xField === 'Date') {
      return this.selectedXMetric!.data.map(entry => new Date(entry.date).toDateString());
    }
    return xData;
  }

  private createDataset(xData: number[], yData: number[]): { x: number, y: number }[] {
    return xData.map((x, index) => ({ x, y: yData[index] }));
  }


  private createLineChartData(labels: any[], dataset: { x: number, y: number }[]): ChartConfiguration['data'] {
    return {
      labels: labels,
      datasets: [
        {
          label: this.yField,
          data: dataset,
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          fill: 'origin',
        },
      ],
    };
  }

  private createLineChartOptions(xLabels: any[]): ChartConfiguration['options'] {
    return {
      ...this.lineChartOptions,
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          ticks: {
           // callback: (value, index, values) => xLabels[index],
           maxTicksLimit:xLabels[xLabels.length-1],
            color: 'red',
        },
      },
        y: {
          position: 'left',
        },
        y1: {
          position: 'right',
          grid: {
            color: 'black',
          },
          ticks: {
            color: 'blue',
          },
        },
      },
    };
  }

  public chartClicked({ event, active }: { event?: ChartEvent; active?: object[]; }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent; active?: object[]; }): void {
    // console.log(event, active);
  }
}
