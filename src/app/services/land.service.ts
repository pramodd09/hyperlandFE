import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Land } from './../model/land';

@Injectable({
  providedIn: 'root'
})
export class LandService {

  constructor(private http: HttpClient) { }
  
  getAllLands():Observable<any>{
    var  baseURL = 'master/getAll/land'; 
    return this.http.get(baseURL);
  }

  createLand(landRequest : Land) : Observable<any>{
    var baseURL = 'master/addLand'
    ;
    return this.http.post(baseURL,landRequest);
  }

  updateLand(landRequest: Land) : Observable<any> {
    var  baseURL = 'master/update/land/'+ landRequest.id; 
    return this.http.post(baseURL,landRequest);
  } 

  getLandById(landId : any) : Observable<any>{
    var  baseURL = 'master/getLand/'+landId;
    return this.http.get(baseURL);
  }

  deleteLand(landId) : Observable<any> {
    var  baseURL = 'master/delete/land/'+landId; 
    return this.http.post(baseURL,{});
  }

}
