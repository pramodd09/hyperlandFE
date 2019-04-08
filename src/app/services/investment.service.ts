import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Location } from '../model/Location';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  constructor(private http: HttpClient) { }

  getAllInvestment():Observable<any>{
    var  baseURL = 'master/getAll/investment'; 
    return this.http.get(baseURL);
  }

  createInvestment(investmentRequest : Location) : Observable<any>{
    var baseURL = 'master/add/investment';
    return this.http.post(baseURL,investmentRequest);
  }

  updateInvestment(investmentRequest: Location) : Observable<any> {
    var  baseURL = 'master/update/investment/'+ investmentRequest.id; 
    return this.http.post(baseURL,investmentRequest);
  } 

  getInvestmentById(investmentId : any) : Observable<any>{
    var  baseURL = 'master/get/investment/'+investmentId; 
    return this.http.get(baseURL);
  }

  deleteInvestment(investmentId) : Observable<any> {
    var  baseURL = 'master/delete/investment/'+investmentId; 
    return this.http.post(baseURL,{});
  }
}
