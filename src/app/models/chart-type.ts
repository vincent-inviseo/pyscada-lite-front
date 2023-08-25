/* eslint-disable @typescript-eslint/no-explicit-any */

export class ChartType {
    private barGraph = {name: 'barGraph', value: 0};
    private lineChart = {name: 'lineChart', value: 1};
    private doughnut = {name: 'doughnut', value: 2};
    private gauge = {name: 'gauge', value: 3};
    private loadProfile = {name: 'loadProfile', value: 4};
    private number = {name: 'number', value: 5};

    private chartTypes: any[] = [this.barGraph, this.lineChart, this.doughnut, this.gauge, this.loadProfile, this.number];

    public getNameByValue(value: any): string {
        let chartType = '';
        for (let i = 0; i < this.chartTypes.length; i++) {
            if (this.chartTypes[i].value == value) {
                chartType = this.chartTypes[i].name;
            }
        }
        return(chartType)
    }
}