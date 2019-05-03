import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Location } from '../model/Location';
import { Investor } from '../model/Investor';

@Injectable({
  providedIn: 'root'
})
export class InvesterService {

  constructor(private http: HttpClient) { }

  getAllInvester():Observable<any>{
    var  baseURL = 'master/getAll/investor'; 
    return this.http.get(baseURL);
  }

  createInvester(investerRequest : Investor) : Observable<any>{
    var baseURL = 'master/add/investor';
    return this.http.post(baseURL,investerRequest);
  }

  updateInvester(investerRequest: Investor) : Observable<any> {
    var  baseURL = 'master/update/investor/'+ investerRequest.id; 
    return this.http.post(baseURL,investerRequest);
  } 

  getInvesterById(investerId : any) : Observable<any>{
    var  baseURL = 'master/get/investor/'+investerId; 
    return this.http.get(baseURL);
  }

  deleteInvester(investerId) : Observable<any> {
    var  baseURL = 'master/delete/investor/'+investerId; 
    return this.http.post(baseURL,{});
  }
}
