import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewtransactionService {

  constructor(private http: HttpClient) { 

  }

  getData(transactionType: string):Observable<any> {
    var  baseURL = 'search/'+transactionType; 
    return this.http.post(baseURL,{'isApproved':'N'});
  }

  approveTransaction(id:string,type:string) {
    var  baseURL = 'transaction/approve/'+type+'/'+id; 
    return this.http.post(baseURL,{});
  }
}
