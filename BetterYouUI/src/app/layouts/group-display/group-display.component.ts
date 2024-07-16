import { Component, Input } from '@angular/core';
import { Metric, ScreenElement } from '../../Models/Models';
import { CommonModule } from '@angular/common';
import { GraphComponent } from '../../GraphComponent/graph/graph.component';

@Component({
  selector: 'app-group-display',
  standalone: true,
  imports: [ CommonModule,GraphComponent],
  templateUrl: './group-display.component.html',
  styleUrl: './group-display.component.scss'
})
export class GroupDisplayComponent {
  @Input() layout:ScreenElement[]=[];
  @Input() metrics: Metric[] = [];
  @Input() selectedUserId: number | null = null;
  constructor() {}

}
