import { Injectable } from '@angular/core';
import { PropertyCancellation } from '../model/PropertyCancellation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyCancellationService {

  constructor(private http: HttpClient) { }
  
  getAllPropertyCancellation():Observable<any>{
    var  baseURL = 'treansaction/getAll/propertyCancellation'; 
    return this.http.get(baseURL);
  }

  createPropertyCancellation(propertyCancellationRequest : PropertyCancellation) : Observable<any>{
    var baseURL = 'treansaction/add/propertyCancellation';
    return this.http.post(baseURL,propertyCancellationRequest);
  }

  updatePropertyCancellation(propertyCancellationRequest: PropertyCancellation) : Observable<any> {
    var  baseURL = 'treansaction/update/regipropertyCancellationstry/'+ propertyCancellationRequest.id; 
    return this.http.post(baseURL,propertyCancellationRequest);
  } 

  getPropertyCancellationById(propertyCancellationId : any) : Observable<any>{
    var  baseURL = 'treansaction/get/propertyCancellation/'+propertyCancellationId; 
    return this.http.get(baseURL);
  }

  deletePropertyCancellation(propertyCancellationId) : Observable<any> {
    var  baseURL = 'treansaction/delete/propertyCancellation/'+propertyCancellationId; 
    return this.http.post(baseURL,{});
  }
}
