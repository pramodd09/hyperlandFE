import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Location } from '../model/Location';

@Injectable({
  providedIn: 'root'
})
export class InvesterService {

  constructor(private http: HttpClient) { }

  getAllInvester():Observable<any>{
    var  baseURL = 'master/getAll/invester'; 
    return this.http.get(baseURL);
  }

  createInvester(investerRequest : Location) : Observable<any>{
    var baseURL = 'master/add/invester';
    return this.http.post(baseURL,investerRequest);
  }

  updateInvester(investerRequest: Location) : Observable<any> {
    var  baseURL = 'master/update/invester/'+ investerRequest.id; 
    return this.http.post(baseURL,investerRequest);
  } 

  getInvesterById(investerId : any) : Observable<any>{
    var  baseURL = 'master/get/invester/'+investerId; 
    return this.http.get(baseURL);
  }

  deleteInvester(investerId) : Observable<any> {
    var  baseURL = 'master/delete/invester/'+investerId; 
    return this.http.post(baseURL,{});
  }
}
