import * as XLSX from 'xlsx';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExcelParserService {

  constructor() { }

  /**
   * Takes in an excel sheet and returns a 2d jason array
   * @param file -the excel file being parsed
   * @returns An any[] representing the sheet as a 
   * 2d array with empty cells perserved
   */
  async parseExcel(file: File): Promise<any[]> {
    const data = new Uint8Array(await file.arrayBuffer());
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  }
}
