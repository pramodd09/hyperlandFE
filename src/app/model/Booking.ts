export class Booking {
id :string;
customerDetails : Customer;
coApplicantDetails : CoApplicant[];
firmId: "string";
projectId: "string";
propertyTypeId: "string";
blockId: "string";
agentId:"string";
plotNumber:"string";
paymentType:string;
bookingDate:any;
baseSellingPrice:number;
plcChargesType:string;
plcCharges:number;
bookingType:"string";
numberOfInstallment:number;
additionalCharges:"string";
installmentStartDate:any;
sqftRate:number;
plotSize:number;
receiptNo : "string";
totalAmount : number;
bank: string;
bookingAmount : number;
agentName : string;
paymentMode : string;
chequeNumber : string;
transactionId : string;
chequeDate : any;
installmentAmount:number;
transactionDate :any;
discount:number;
discountType:string;
}

export class CoApplicant {
customerName    : "string";
dateOfBirth     : any;
panNumber      : "string";
adhaarNo       : "string";
relationType   :"string";
relativeName   : "string";
}

export class Customer {
customerName    : "string";
panNumber      : "string";
adhaarNo       : "string";
address        : "string";
city           : "string";
state          : "string";
pinCode        : "string";
emailId        : "string";
phoneNo        : "string";
dateOfBirth    : any;
occupation     : "string";
relationType   :"string";
relativeName   : "string";

}

export class Payment {
bank    : "string";


}
