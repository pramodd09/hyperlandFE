import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ExpenseCategory } from '../model/ExpenseCategory';

@Injectable({
  providedIn: 'root'
})
export class ExpenseCategoryService {

  constructor(private http: HttpClient) { }
  
  getAllCategories():Observable<any>{
    var  baseURL = 'master/getAll/expenseCategory'; 
    return this.http.get(baseURL);
  }

  createCategory(categoryRequest : ExpenseCategory) : Observable<any>{
    var baseURL = 'master/add/expenseCategory';
    return this.http.post(baseURL,categoryRequest);
  }

  updateCategory(categoryRequest: ExpenseCategory) : Observable<any> {
    var  baseURL = 'master/update/expenseCategory/'+ categoryRequest.id; 
    return this.http.post(baseURL,categoryRequest);
  } 

  getCategoryById(categoryId : any) : Observable<any>{
    var  baseURL = 'master/get/expenseCategory/'+categoryId; 
    return this.http.get(baseURL);
  }

  deleteCategory(categoryId) : Observable<any> {
    var  baseURL = 'master/delete/expenseCategory/'+categoryId; 
    return this.http.post(baseURL,{});
  }

}
