export class LiveBilling {
    constructor(
        public sno: number,
        public product?: string,
        public quantity?: number,
        // public unit: string,
        public price?: number,
        public tax?: number,
        public total?: number,
    ) {}
}