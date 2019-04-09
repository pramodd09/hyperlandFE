import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FarmerPaymentDetails } from '../model/FarmerPaymentDetails';

@Injectable({
  providedIn: 'root'
})
export class FarmerPaymentDetailsService {

  constructor(private http: HttpClient) { }
  
  getAllFarmerPaymentDetails():Observable<any>{
    var  baseURL = 'master/getAll/farmerPayment'; 
    return this.http.get(baseURL);
  }

  createFarmerPaymentDetails(farmerPaymentRequest : FarmerPaymentDetails) : Observable<any>{
    var baseURL = 'master/add/farmerPayment';
    return this.http.post(baseURL,farmerPaymentRequest);
  }

  updateFarmerPaymentDetails(farmerPaymentIdRequest: FarmerPaymentDetails) : Observable<any> {
    var  baseURL = 'master/update/farmerPayment/'+ farmerPaymentIdRequest.id; 
    return this.http.post(baseURL,farmerPaymentIdRequest);
  } 

  getFarmerPaymentDetailsById(farmerPaymentId : any) : Observable<any>{
    var  baseURL = 'master/get/farmerPayment/'+farmerPaymentId; 
    return this.http.get(baseURL);
  }

  deleteFarmerPaymentDetails(farmerPaymentId) : Observable<any> {
    var  baseURL = 'master/delete/farmerPayment/'+farmerPaymentId; 
    return this.http.post(baseURL,{});
  }
}
