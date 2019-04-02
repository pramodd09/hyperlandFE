import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bank } from '../model/Bank';
import { MatTableDataSource } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(public http: HttpClient) { }

  bankDataSource: any;

  getAllBanks():Observable<any>{
    var  baseURL = 'master/getAll/bank';
    return this.http.get(baseURL);
  }

  createBank(bankRequest : Bank) : Observable<any>{
    var baseURL = 'master/add/bank';
    return this.http.post(baseURL,bankRequest);
  }

  updateBank(bankRequest: Bank) : Observable<any> {
    var  baseURL = 'master/update/bank/'+ bankRequest.id;
    return this.http.post(baseURL,bankRequest);
  }

  getBankById(bankId : any) : Observable<any>{
    var  baseURL = 'master/get/bank/'+bankId;
    return this.http.get(baseURL);
  }

  deleteBank(bankId) : Observable<any> {
    var  baseURL = 'master/delete/bank/'+bankId;
    return this.http.post(baseURL,{});
  }
}
