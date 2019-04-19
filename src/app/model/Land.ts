import { Farmer } from "../model/Farmer";
export class Land {
    id : string;
    khasraNumber : string;
    landValue: number;
    farmerName : string;
    farmers : Farmer[];
    paidAmount : number;
}
