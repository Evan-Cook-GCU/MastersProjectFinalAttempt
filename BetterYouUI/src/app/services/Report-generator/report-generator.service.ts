import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ReportGeneratorService {

  constructor() { }

  public exportToExcel(metricDataList: any[], labels: string[], fileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
    const headers = [...labels, 'Date'];

    // Add headers
    XLSX.utils.sheet_add_aoa(worksheet, [headers]);

    // Add data
    metricDataList.forEach(entry => {
      const row = labels.map(label => entry.fields[label] || '');
      row.push(entry.date);
      XLSX.utils.sheet_add_aoa(worksheet, [row], { origin: -1 });
    });

    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, fileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
