import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { ChartConfiguration, ChartType, ChartEvent, registerables, Chart } from "chart.js";
import { BaseChartDirective } from "ng2-charts";
import { MetricDataService } from "../../services/MetricDataService/MetricDataService";
import { MetricData } from "../../Models/Models";

Chart.register(...registerables);

@Component({
  imports: [CommonModule, BaseChartDirective],
  selector: 'app-graph',
  standalone: true,
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent {
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

  constructor(private dataService: MetricDataService) {
    this.dataService.metricData$.subscribe((data) => {
      this.updateChart(data);
    });
    this.dataService.labels$.subscribe((labels: string[]) => {
      this.updateLabels(labels);
    });
  }

  private updateChart(data: MetricData[]): void {
    this.lineChartData.labels = data.map((entry) => entry.dataDate.toDateString());
    this.lineChartData.datasets.forEach((dataset, index) => {
      dataset.data = data.map((entry) => entry.dataValue[this.lineChartData.datasets[index].label as string]);
    });
    this.chart?.update();
  }

  private updateLabels(labels: string[]): void {
    this.lineChartData.datasets = labels.map((label) => ({
      data: [],
      label: label,
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
