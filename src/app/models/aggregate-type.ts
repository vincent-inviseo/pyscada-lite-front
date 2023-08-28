/* eslint-disable @typescript-eslint/no-explicit-any */

export class AggregateTypes {
    private minute = {name: 'minute', value: 1};
    private hour = {name: 'heure', value: 2};
    private day = {name: 'jour', value: 3};
    private week = {name: 'semaine', value: 4};
    private month = {name: 'mois', value: 5};
    private year = {name: 'année', value: 6};

    // When custom is implemented
    // private custom = {name: 'custom', value: 7};

    // public aggregateTypes: any[] = [this.minute, this.hour, this.day, this.week, this.month, this.year, this.custom];

    public aggregateTypes: any[] = [this.minute, this.hour, this.day, this.week, this.month, this.year];
}