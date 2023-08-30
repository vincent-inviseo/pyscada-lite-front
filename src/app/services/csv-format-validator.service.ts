
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvFormatValidatorService {

  constructor() { }

  parseCsvFile(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        const csvData = event.target.result;
        const rows = csvData.split('\n');
        const headers = rows[0].split(',');

        const data = [];
        for (let i = 1; i < rows.length; i++) {
          const rowData = rows[i].split(',');
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

  async getHeadersFromFile(file: File): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      const reader = new FileReader();

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