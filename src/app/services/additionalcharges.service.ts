import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdditionalCharges } from '../model/AdditionalCharges';
import { MatTableDataSource } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AdditionalChargesService {

  constructor(public http: HttpClient) { }

  additionalChargesDataSource: any;

  getAllAdditionalCharges():Observable<any>{
    var  baseURL = 'master/getAll/additionalCharges';
    return this.http.get(baseURL);
  }

  createAdditionalCharges(additionalChargesRequest : AdditionalCharges) : Observable<any>{
    var baseURL = 'master/add/additionalCharges';
    return this.http.post(baseURL,additionalChargesRequest);
  }

  updateAdditionalCharges(additionalChargesRequest: AdditionalCharges) : Observable<any> {
    var  baseURL = 'master/update/additionalCharges/'+ additionalChargesRequest.id;
    return this.http.post(baseURL,additionalChargesRequest);
  }

  getAdditionalChargesById(additionalChargesId : any) : Observable<any>{
    var  baseURL = 'master/get/additionalCharges/'+additionalChargesId;
    return this.http.get(baseURL);
  }

  deleteAdditionalCharges(additionalChargesId) : Observable<any> {
    var  baseURL = 'master/delete/additionalCharges/'+additionalChargesId;
    return this.http.post(baseURL,{});
  }
}
