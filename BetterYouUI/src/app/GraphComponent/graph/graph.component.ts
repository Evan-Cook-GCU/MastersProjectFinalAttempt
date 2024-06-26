import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ChartConfiguration, ChartType, ChartEvent, registerables, Chart } from "chart.js";
import { BaseChartDirective } from "ng2-charts";
import { Metric, MetricData } from "../../Models/Models";
import { MetricService } from "../../services/DataServices/MetricService/metric.service";

Chart.register(...registerables);

@Component({
  imports: [CommonModule, BaseChartDirective],
  selector: 'app-graph',
  standalone: true,
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
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

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  metrics: Metric[] = [];
  selectedXMetric: Metric | null = null;
  selectedYMetric: Metric | null = null;
  xField: string | undefined;
  yField: string | undefined;
  public tableData: { label: any, value: number }[] = [];
  constructor(private metricService: MetricService) {}

  ngOnInit(): void {
    this.metricService.metric$.subscribe((metrics) => {
      this.metrics = metrics;
      if (metrics.length > 0) {
        this.selectedXMetric = metrics[0];
        this.selectedYMetric = metrics[0];
        this.updateChart();
      }
    });
  }

  onMetricFieldChange(event: Event, type: 'xMetric' | 'xField' | 'yMetric' | 'yField'): void {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;

    if (!this.yField) this.yField = this.metrics[0].fields[0].Label;
    if (!this.xField) this.xField = this.metrics[0].fields[0].Label;
    if (!this.selectedXMetric) this.selectedXMetric = this.metrics[0];
    if (!this.selectedYMetric) this.selectedYMetric = this.metrics[0];

    switch (type) {
      case 'xMetric':
        this.selectedXMetric = this.metrics.find(metric => metric.metricId.toString() === value) || null;
        break;
      case 'xField':
        this.xField = value;
        break;
      case 'yMetric':
        this.selectedYMetric = this.metrics.find(metric => metric.metricId.toString() === value) || null;
        break;
      case 'yField':
        this.yField = value;
        break;
    }
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
    return !!this.selectedXMetric && !!this.selectedXMetric.data && !!this.selectedYMetric && !!this.selectedYMetric.data && !!this.xField && !!this.yField;
  }

  private getXData(): number[] {
    if (this.xField === 'date') {
      return this.selectedXMetric!.data.map(entry => new Date(entry.date).getTime());
    }
    return this.selectedXMetric!.data.map(entry => entry.fields.find(f => f.Label === this.xField)?.Value || null).map(Number);
  }

  private getYData(): number[] {
    return this.selectedYMetric!.data.map(entry => entry.fields.find(f => f.Label === this.yField)?.Value || null).map(Number);
  }

  private getXLabels(xData: number[]): any[] {
    if (this.xField === 'date') {
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
