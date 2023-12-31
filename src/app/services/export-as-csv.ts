/* eslint-disable @typescript-eslint/no-explicit-any */

import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class ExportDataAsCsvService {

  private saveAsFile(buffer: any, fileName: string, fileType: string): void {
    const data: Blob = new Blob([buffer], { type: fileType });
    saveAs(data, fileName);
  }

  public exportToCsv(data: any, fileName: string, columns?: string[], separator:string = ";"): any {
    let rowsConcat:any[] = [];
    data.forEach((rows:any[]) => {
      rows.forEach((row:any) => {
        rowsConcat.push(row);      
      });
    })
    
    if (!rowsConcat || !rowsConcat.length) {
      return;
    }
    const keys = Object.keys(rowsConcat[0]).filter(k => {
      if (columns?.length) {
        return columns.includes(k);
      } else {
        return true;
      }
    });
    const csvContent = 
      keys.join(separator) +
      '\n' +
      rowsConcat.map((row:any) => {
        return keys.map(k => {
          let cell = row[k] === null || row[k] === undefined ? '' : row[k];
          cell = cell instanceof Date
            ? cell.toLocaleString()
            : cell.toString().replace(/"/g, '""');
          if (cell.search(/("|,|\n)/g) >= 0) {
            cell = `"${cell}"`;
          }
          return cell;
        }).join(separator);
      }).join('\n');
    this.saveAsFile(csvContent, `${fileName}`, '.csv');
  }
}