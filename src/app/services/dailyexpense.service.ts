import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DailyExpense } from '../model/DailyExpense';

@Injectable({
  providedIn: 'root'
})
export class DailyExpenseService {

  constructor(public http: HttpClient) { }

  bankDataSource: any;

  getAllDailyExpenses():Observable<any>{
    var  baseURL = 'master/getAll/dailyexpense';
    return this.http.get(baseURL);
  }

  createDailyExpense(expenseRequest : DailyExpense) : Observable<any>{
    var baseURL = 'master/add/dailyexpense';
    return this.http.post(baseURL,expenseRequest);
  }

  updateDailyExpense(expenseRequest: DailyExpense) : Observable<any> {
    var  baseURL = 'master/update/dailyexpense/'+ expenseRequest.id;
    return this.http.post(baseURL,expenseRequest);
  }

  getExpenseById(expenseId : any) : Observable<any>{
    var  baseURL = 'master/get/dailyexpense/'+expenseId;
    return this.http.get(baseURL);
  }

  deleteExpense(dailyexpenseId) : Observable<any> {
    var  baseURL = 'master/delete/bank/'+dailyexpenseId;
    return this.http.post(baseURL,{});
  }
}
