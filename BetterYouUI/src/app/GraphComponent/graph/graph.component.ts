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
  
  constructor(private metricService: MetricService) {}

  ngOnInit(): void {
    this.metricService.metric$.subscribe((metrics) => {
      this.metrics = metrics;
      if (metrics.length > 0) {
        this.selectedMetric = metrics[0];
        this.updateChart(this.selectedMetric);
      }
    });
  }
  onMetricChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const metricId = selectElement.value;
    this.selectedMetric = this.metrics.find(metric => metric.metricId.toString() === metricId) || null;
    if (this.selectedMetric) {
      this.updateChart(this.selectedMetric);
    }
  }
  private updateChart(metric: Metric): void {
    if (!metric || !metric.data) {
      return;
    }

    this.lineChartData.labels = metric.data.map(entry => new Date(entry.date).toDateString());

    this.lineChartData.datasets = metric.fields.map(field => ({
      label: field.Label,
      data: metric.data.map(entry => entry.fields.find(f => f.Label === field.Label)?.Value || null),
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      fill: 'origin',
    }));

    this.chart?.update();
  }


  

  public chartClicked({ event, active }: { event?: ChartEvent; active?: object[]; }): void {
   // console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent; active?: object[]; }): void {
   // console.log(event, active);
  }
}
