
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { mapTo } from 'rxjs';
import { db } from '../db/db'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private socket: Socket,private http:HttpClient) {
    this.getData();
  }

  async getData(){
    const response = this.http.get('/api/india');
      response.subscribe(async(c:any)=>{
        console.log('Adding to db',c)
          await db.currentTweets.add(c,1)
      })
    return response;
  }

  async getNextData(token){
    const options = token ? {params: new HttpParams().set('token',token)}:{};
    const response = this.http.get('/api/other',options);
      response.subscribe(async(c:any)=>{
        console.log('Adding to next Tweets Db',c)
          await db.nextTweets.add(c,2)
      })
    return response;
  }

  async getPreviousData(token){
    const options = token ? {params: new HttpParams().set('token',token)}:{};
    const response = this.http.get('/api/other',options);
      response.subscribe(async(c:any)=>{
        console.log('Adding to previous Tweets Db',c)
          await db.previousTweets.add(c,3)
      })
    return response;
  }

}
