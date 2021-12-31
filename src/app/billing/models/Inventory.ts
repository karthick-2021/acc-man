export class Inventory {
    constructor(
        public productID?: string,
        public product?: string,
        public quantity?: number,
        public price?: number,
        public tax?: number,
    ) {}
}