import { formatDate } from "@/utils";

export interface Receipt {
  // id?: number;
  cardType: string;
  cardNo: string;
  invDate: Date;
  sellerBan: number;
  sellerName: string;
  invNum: string;
  amount: number;
  invStatus: string;
  details: { amount: number; description: string }[];
}

export class Receipt {
  constructor(
    cardType: string,
    cardNo: string,
    invDate: string,
    sellerBan: number,
    sellerName: string,
    invNum: string,
    amount: number,
    invStatus: string
  ) {
    this.cardType = cardType;
    this.cardNo = cardNo;
    this.invDate = new Date(formatDate(invDate, "####-##-##", "GMT+08:00"));
    this.sellerBan = +sellerBan;
    this.sellerName = sellerName;
    this.invNum = invNum;
    this.amount = +amount;
    this.invStatus = invStatus;
    this.details = [];
  }

  addDetail(amount: number, description: string) {
    this.details.push({ amount, description });
  }
}
