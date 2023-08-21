import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class DateCleanerGraphService {

    constructor(private readonly datePipe: DatePipe) {}

    public cleanDate(date: any): string | boolean {
        const newDate = this.datePipe.transform(date, "dd/MM/yy HH:mm:ss");
        if (newDate == null) {
            return(false);
        }
        else {
            return(newDate);
        }
    }
}