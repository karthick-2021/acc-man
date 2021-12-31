import { LiveBilling } from "./LiveBilling";

export class Invoice {
    constructor(
        public invoiceNo: number,
        public custMobile: number,
        public custName: string,
        public custEmail: string,
        public date: string,
        public billings: LiveBilling[],
        public amtInWords: string,
        public grandTotal: number,
    ) {}
}
