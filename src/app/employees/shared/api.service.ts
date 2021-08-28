import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpclient: HttpClient) { }

  getEmployee() {
    return this.httpclient.get<any>('https://61029e0479ed680017482204.mockapi.io/api/partner/Partnerdetails')
      .pipe(map((res: any) => {
        return res;
      }))
  }

  postEmp(emp: any) {
    return this.httpclient.post<any>('https://61029e0479ed680017482204.mockapi.io/api/partner/Partnerdetails', emp)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  deleteEmp(emp: any) {
    return this.httpclient.delete<any>('https://61029e0479ed680017482204.mockapi.io/api/partner/Partnerdetails/' + emp.id)
      .pipe(map((res: any) => {
        console.log("res")
        
      }))
  }

  editEmp(emp: any,id:any) {
    return this.httpclient.put<any>('https://61029e0479ed680017482204.mockapi.io/api/partner/Partnerdetails/'+ id,emp)
      .pipe(map((res: any) => {
        console.log("res");
        
      }))

  }
}
