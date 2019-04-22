import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ExpenseCategory } from '../model/ExpenseCategory';
import { Registry } from '../model/Registry';

@Injectable({
  providedIn: 'root'
})
export class RegistryService {

  constructor(private http: HttpClient) { }
  
  getAllRegistry():Observable<any>{
    var  baseURL = 'treansaction/getAll/registry'; 
    return this.http.get(baseURL);
  }

  createRegistry(registryRequest : Registry) : Observable<any>{
    var baseURL = 'treansaction/add/registry';
    return this.http.post(baseURL,registryRequest);
  }

  updateRegistry(registryRequest: Registry) : Observable<any> {
    var  baseURL = 'treansaction/update/registry/'+ registryRequest.id; 
    return this.http.post(baseURL,registryRequest);
  } 

  getRegistryById(registryId : any) : Observable<any>{
    var  baseURL = 'treansaction/get/registry/'+registryId; 
    return this.http.get(baseURL);
  }

  deleteRegistry(registryId) : Observable<any> {
    var  baseURL = 'treansaction/delete/registry/'+registryId; 
    return this.http.post(baseURL,{});
  }

}
