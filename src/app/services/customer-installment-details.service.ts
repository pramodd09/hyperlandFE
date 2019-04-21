import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CustomerInstallmentDetails } from '../model/CustomerInstallmentDetails';

@Injectable({
  providedIn: 'root'
})
export class CustomerInstallmentDetailsService {

  constructor(private http: HttpClient) { }
  
  getAllCustomerInstallmentDetails():Observable<any>{
    var  baseURL = 'master/getAll/customerInstallment'; 
    return this.http.get(baseURL);
  }

  createCustomerInstallmentDetails(customerInstallmentRequest : CustomerInstallmentDetails) : Observable<any>{
    var baseURL = 'transaction/add/customerInstallment';
    return this.http.post(baseURL,customerInstallmentRequest);
  }

  updateCustomerInstallmentDetails(customerInstallmentIdRequest: CustomerInstallmentDetails) : Observable<any> {
    // to do url fix (remove .id)
    var  baseURL = 'master/update/customerInstallment/'+ customerInstallmentIdRequest; 
    return this.http.post(baseURL,customerInstallmentIdRequest);
  } 

  getCustomerInstallmentDetailsById(customerInstallmentId : any) : Observable<any>{
    var  baseURL = 'master/get/customerInstallment/'+customerInstallmentId; 
    return this.http.get(baseURL);
  }

  deleteCustomerInstallmentDetails(customerInstallmentId) : Observable<any> {
    var  baseURL = 'master/delete/customerInstallment/'+customerInstallmentId; 
    return this.http.post(baseURL,{});
  }
}
