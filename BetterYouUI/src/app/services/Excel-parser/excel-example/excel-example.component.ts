import { Component, ViewChild } from '@angular/core';
import { ExcelParserService } from '../excel-parser.service';

@Component({
  selector: 'app-excel-example',
  standalone: true,
  imports: [],
  templateUrl: './excel-example.component.html',
  styleUrl: './excel-example.component.scss'
})
export class ExcelExampleComponent {
  @ViewChild('fileInput') fileInput: any
  constructor(private excelParserService: ExcelParserService) { }
  /**
   * verifies file exists and calls parser
   * @param event the selection of a file
   * @returns void-short circuit
   */
  handleFileInput(event: any): void {
    const files = event.target.files;
    const fileToUpload = files.item(0);
    if (!fileToUpload) {
      return;
    }
    this.parseExcelFile(fileToUpload);
  }

/**
 * parses an excel file, writes result to console, and clear input
 * @param file excel file to pars
 */
  parseExcelFile(file: File): void {
    this.excelParserService.parseExcel(file).then((sheet) => {
      //clears the input in case same file needs uploading 
      this.fileInput.nativeElement.value = '';
    });

  }
}
