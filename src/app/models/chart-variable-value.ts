export class ChartVariableValue {
    private id!: number;
    private recordedAt = "";
    private value: string | number = "";

    public ChartVariableValue(id: number, recordedAt: string, value: string | number) {
        this.id = id;
        this.recordedAt = recordedAt;
        this.value = value;
    }
}