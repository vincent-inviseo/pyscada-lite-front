
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

  async getHeadersFromFile(file: File): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      const reader = new FileReader();
      const regex = /[,;]+/;

      reader.onload = (event: ProgressEvent<FileReader>) => {
        const result = event.target?.result as string;
        const lines = result.split('\n');

        let headers:string[] = [];
        
        if (lines.length > 0) {
          lines.forEach(element => {
            headers.push(element[0])
          });
          // const headers = lines[0].trim().split(',');
          resolve(headers);
        } else {
          reject(new Error('Empty file'));
        }
      };

      reader.onerror = () => {
        reject(new Error('Error reading the file'));
      };

      reader.readAsText(file);
    });
  }
}