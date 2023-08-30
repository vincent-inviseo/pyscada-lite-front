
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvFormatValidatorService {

  constructor() { }

  parseCsvFile(data: any[], file: File): void {
    const csvContent = this.convertToCsv(data);
    this.downloadCsv(csvContent, 'exportData.csv');
  }

  private convertToCsv(data: any[]): string {
    const headers = Object.keys(data[0]);
    const rows = data.map(item => headers.map(header => item[header]));
    
    const csvArray = [headers, ...rows];
    const csvContent = csvArray.map(row => row.join(',')).join('\n');
    
    return csvContent;
  }

  private downloadCsv(content: string, fileName: string): void {
    const blob = new Blob([content], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName + '.csv';
    link.click();
  }

  async getHeadersFromFile(file: File, seperator:string = ';'): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      const reader = new FileReader();
      const regex = /[,;]+/;

      reader.onload = (event: ProgressEvent<FileReader>) => {
        const result = event.target?.result as string;
        console.log('result reader', result);
        const lines = result.split('\n');
        let formatedJsonDocument: any = null;
        let formatedDocument:string[] = [];

        lines.forEach(line => {
          let leftHeader = line.split(";")[0]
          let values = line.split(";")
          values.splice(0, 1);
          if(leftHeader.length !== 0) {
            formatedJsonDocument = {
              [leftHeader]: values
            }
            formatedDocument.push(formatedJsonDocument)
          }
        });
        resolve(formatedDocument);
      };

      reader.onerror = () => {
        reject(new Error('Error reading the file'));
      };

      reader.readAsText(file);
    });
  }

  public parseEntireCsvFile(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      const regex = /[,;]+/;

      reader.onload = (event: any) => {
        const csvData = event.target.result;
        const rows = csvData.split('\n');
        const headers = rows[0].split(regex);

        const data = [];
        for (let i = 1; i < rows.length; i++) {
          const rowData = rows[i].split(regex);
          if (rowData.length === headers.length) {
            const entry: any = {};
            for (let j = 0; j < headers.length; j++) {
              entry[headers[j]] = rowData[j];
            }
            data.push(entry);
          }
        }

        resolve(data);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsText(file);
    });
  }
}