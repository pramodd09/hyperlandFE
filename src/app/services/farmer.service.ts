import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Farmer } from './../model/Farmer';


@Injectable({
  providedIn: 'root'
})
export class FarmerService {

  constructor(private http: HttpClient) { }
  
  getAllFarmers():Observable<any>{
    var  baseURL = 'master/getAll/farmer'; 
    return this.http.get(baseURL);
  }

  createFarmer(farmerRequest : Farmer) : Observable<any>{
    var baseURL = 'master/add/farmer';
    return this.http.post(baseURL,farmerRequest);
  }

  updateFarmer(farmerRequest: Farmer) : Observable<any> {
    var  baseURL = 'master/update/farmer/'+ farmerRequest.id; 
    return this.http.post(baseURL,farmerRequest);
  } 

  getFarmerById(farmerId : any) : Observable<any>{
    var  baseURL = 'master/get/farmer/'+farmerId; 
    return this.http.get(baseURL);
  }

  deleteFarmer(farmerId) : Observable<any> {
    var  baseURL = 'master/delete/farmer/'+farmerId; 
    return this.http.post(baseURL,{});
  }

}
