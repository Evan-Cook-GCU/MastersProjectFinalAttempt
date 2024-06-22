import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ChartConfiguration, ChartType, ChartEvent, registerables, Chart } from "chart.js";
import { BaseChartDirective } from "ng2-charts";
import { MetricDataService } from "../../services/MetricDataService/MetricDataService";
import { Metric, MetricData, MetricData2 } from "../../Models/Models";
import { MetricService } from "../../services/MetricService/metric.service";

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
  selectedMetric: Metric | null = null;
  xField: string | null = null;
  yField: string | null = null;

  constructor(private metricService: MetricService) {}

  ngOnInit(): void {
    this.metricService.metric$.subscribe((metrics) => {
      this.metrics = metrics;
      if (metrics.length > 0) {
        this.selectedMetric = metrics[0];
        this.updateChart();
      }
    });
  }
  onMetricChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const metricId = selectElement.value;
    this.selectedMetric = this.metrics.find(metric => metric.metricId.toString() === metricId) || null;
    this.updateChart();
  }

  onFieldChange(event: Event, axis: 'x' | 'y'): void {
    const selectElement = event.target as HTMLSelectElement;
    const fieldLabel = selectElement.value;
    if (axis === 'x') {
      this.xField = fieldLabel;
    } else {
      this.yField = fieldLabel;
    }
    this.updateChart();
  }

  private updateChart(): void {
    if (!this.selectedMetric || !this.selectedMetric.data || !this.xField || !this.yField) {
      return;
    }

    let xData: any[] = [];
    if (this.xField === 'date') {
      xData = this.selectedMetric.data.map(entry => new Date(entry.date).toDateString());
    } else {
      xData = this.selectedMetric.data.map(entry => entry.fields.find(f => f.Label === this.xField)?.Value || null);
    }

    const yData = this.selectedMetric.data.map(entry => entry.fields.find(f => f.Label === this.yField)?.Value || null);
    const labels = xData;

    this.lineChartData.labels = labels;
    this.lineChartData.datasets = [
      {
        label: this.yField,
        data: yData,
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ];

    this.chart?.update();
  }


  

  public chartClicked({ event, active }: { event?: ChartEvent; active?: object[]; }): void {
   // console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent; active?: object[]; }): void {
   // console.log(event, active);
  }
}
