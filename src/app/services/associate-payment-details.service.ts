import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AssociatePaymentDetails } from '../model/AssociatePaymentDetails';
@Injectable({
  providedIn: 'root'
})
export class AssociatePaymentDetailsService {

  constructor(private http: HttpClient) { }
  
  getAllAssociatePaymentDetails():Observable<any>{
    var  baseURL = 'master/getAll/agentPayment'; 
    return this.http.get(baseURL);
  }

  createAssociatePaymentDetails(associatePaymentRequest : AssociatePaymentDetails) : Observable<any>{
    var baseURL = 'master/add/agentPayment';
    return this.http.post(baseURL,associatePaymentRequest);
  }

  updateAssociatePaymentDetails(associatePaymentIdRequest: AssociatePaymentDetails) : Observable<any> {
    var  baseURL = 'master/update/agentPayment/'+ associatePaymentIdRequest.id; 
    return this.http.post(baseURL,associatePaymentIdRequest);
  } 

  getAssociatePaymentDetailsById(associatePaymentId : any) : Observable<any>{
    var  baseURL = 'master/get/agentPayment/'+associatePaymentId; 
    return this.http.get(baseURL);
  }

  deleteAssociatePaymentDetails(associatePaymentId) : Observable<any> {
    var  baseURL = 'master/delete/agentPayment/'+associatePaymentId; 
    return this.http.post(baseURL,{});
  }
}
