import { ChartVariableValue } from "./chart-variable-value";

export class ChartVariable {
    private name = "";
    private id!: number;
    private value!: ChartVariableValue;

    public Chartvariable(name: string, id: number, value: ChartVariableValue) {
        this.name = name;
        this.id = id;
        this.value = value;
    }
}