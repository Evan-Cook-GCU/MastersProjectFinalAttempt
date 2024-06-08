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
    datasets: [
      {
        data: [],
        label: 'Metric 1',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [],
        label: 'Metric 2',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      },
    ],
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
    this.dataService.weightLabel$.subscribe((label: string) => {
      this.lineChartData.datasets[0].label = label;
      this.chart?.update();
    });
    this.dataService.repsLabel$.subscribe((label: string) => {
      this.lineChartData.datasets[1].label = label;
      this.chart?.update();
    });
  }

  private updateChart(data: MetricData[]): void {
    this.lineChartData.datasets[0].data = data.map((entry) => entry.dataValue['metric1']);
    this.lineChartData.datasets[1].data = data.map((entry) => entry.dataValue['metric2']);
    this.lineChartData.labels = data.map((entry) => entry.dataDate.toDateString());
    this.chart?.update();
  }

  public randomize(): void {
    for (let i = 0; i < this.lineChartData.datasets.length; i++) {
      for (let j = 0; j < this.lineChartData.datasets[i].data.length; j++) {
        this.lineChartData.datasets[i].data[j] = GraphComponent.generateNumber(i);
      }
    }
    this.chart?.update();
  }

  public chartClicked({ event, active }: { event?: ChartEvent; active?: object[]; }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent; active?: object[]; }): void {
    console.log(event, active);
  }

  public hideOne(): void {
    const isHidden = this.chart?.isDatasetHidden(1);
    this.chart?.hideDataset(1, !isHidden);
  }

  public pushOne(): void {
    this.lineChartData.datasets.forEach((x, i) => {
      const num = GraphComponent.generateNumber(i);
      x.data.push(num);
    });
    this.lineChartData.labels?.push(`Label ${this.lineChartData.labels.length}`);
    this.chart?.update();
  }

  public changeColor(): void {
    this.lineChartData.datasets[1].borderColor = 'green';
    this.lineChartData.datasets[1].backgroundColor = `rgba(0, 255, 0, 0.3)`;
    this.chart?.update();
  }

  public changeLabel(): void {
    const tmp = this.lineChartData.datasets[1].label;
    this.lineChartData.datasets[1].label = 'New Label';
    this.chart?.update();
  }

  private static generateNumber(i: number): number {
    return Math.floor(Math.random() * (i < 2 ? 100 : 1000) + 1);
  }
}
