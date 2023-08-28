/* eslint-disable @typescript-eslint/no-explicit-any */

export class chartWidth {
    private width25 = {width: '25%', value: '25vw'};
    private width33 = {width: '33%', value: '33vw'};
    private width50 = {width: '50%', value: '50vw'};
    private width75 = {width: '75%', value: '75vw'};
    private width100 = {width: '100%', value: '100vw'};

    public getWidthInVh(width: string): string {
        let value = '';
        if (width != '' && width != null) {
            const length  = width.length;
            value = width.slice(0, length - 1);
            value = value + 'vw';
        }
        return(value)
    }
}