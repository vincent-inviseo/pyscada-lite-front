/* eslint-disable @typescript-eslint/no-explicit-any */

import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class DateCleanerGraphService {

    constructor(private readonly datePipe: DatePipe) {}

    public cleanDateGraph(date: any): string | boolean {
        const newDate = this.datePipe.transform(date, "dd/MM/yy HH:mm:ss");
        if (newDate == null) {
            return(false);
        }
        else {
            return(newDate);
        }
    }

    public cleanDateForFilterBackend(date: any): string | boolean {
        // Timezone France: RST
        const newDate = this.datePipe.transform(date, "YYYY-MM-ddTHH:mm:ss", 'RST');
        if (newDate == null) {
            return(false);
        }
        else {
            return(newDate);
        }
    }
}