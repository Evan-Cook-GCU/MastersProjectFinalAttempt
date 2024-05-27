import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Table } from 'primeng/table';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown'
import { TagModule } from 'primeng/tag';
import { SliderModule } from 'primeng/slider';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { Column } from '../interfaces/column';

@Component({
  selector: 'app-table-reusable',
  standalone: true,
  imports: [
    CommonModule,
    TableModule, 
    MultiSelectModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    SliderModule,
    TagModule,
    ProgressBarModule,
    FormsModule,
    InputNumberModule,
    InputTextareaModule,
    InputGroupAddonModule,
  ],
  templateUrl: './table-reusable.component.html',
  styleUrl: './table-reusable.component.scss'
})
export class TableReusableComponent implements OnInit {
  @Input() tableData!: any[];
  @Input() tableHeaders!: Column[];
  loading: boolean = true;

  constructor() {
    this.loading = false;
  }

  ngOnInit(): void {
  }
  
  clear(table: Table) {
    table.clear();
  }
}
