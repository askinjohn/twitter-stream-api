import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, switchMap } from 'rxjs/operators';
import { IncomingMessage } from 'http';
import { BehaviorSubject, fromEventPattern } from 'rxjs';

@Injectable()
export class DataService {
  subscription: any;
  tweets = new BehaviorSubject('');
  tweetsToReturn = this.tweets.asObservable()
  constructor(private http: HttpService) {
    
  }

  getDataForIndiaToday(){
     return this.http.get('https://api.twitter.com/2/users/38647512/tweets?max_results=100',{
        headers: {
            Authorization:
              'Bearer AAAAAAAAAAAAAAAAAAAAACnlXAEAAAAAws8CxBmTGp4%2B%2FC9mb6L%2BvTWCftg%3DaHrUc8ByinwGuHLqaigl4Jz8i2GnCmtqOxxu3OUBBe1bAchjbj',
          },
          responseType:'json'
      }).pipe(map((res)=>
           res.data
      ))
  }

  getOtherData(data){
      console.log(data,'called')
        return this.http.get(`https://api.twitter.com/2/users/38647512/tweets?max_results=100&pagination_token=${data}`,{
            headers: {
                Authorization:
                  'Bearer AAAAAAAAAAAAAAAAAAAAACnlXAEAAAAAws8CxBmTGp4%2B%2FC9mb6L%2BvTWCftg%3DaHrUc8ByinwGuHLqaigl4Jz8i2GnCmtqOxxu3OUBBe1bAchjbj',
              },
              responseType:'json'
        }).pipe(map((res)=>{ 
            return res.data}));
  }

  getData() {
    console.log('Data Access Called')
    this.subscription =  this.http
      .get('https://api.twitter.com/2/tweets/sample/stream', {
        headers: {
          Authorization:
            'Bearer AAAAAAAAAAAAAAAAAAAAACnlXAEAAAAAws8CxBmTGp4%2B%2FC9mb6L%2BvTWCftg%3DaHrUc8ByinwGuHLqaigl4Jz8i2GnCmtqOxxu3OUBBe1bAchjbj',
        },
        responseType: 'stream',
      })
      .pipe(
        map((res) => res.data),
        switchMap((incomingMessage: IncomingMessage) => {
          return fromEventPattern(
            (handler) => {
              incomingMessage.on('data', handler);
            },
            (handler) => {
              incomingMessage.off('data', handler);
              incomingMessage.destroy();
            }
          );
        })
      ).subscribe((data)=>{
          try{
            const parsed = JSON.parse(data as string);
            this.tweets.next(parsed);
          }catch(e){
            console.log('error parsing Tweet')
          }
      });
  }

  get tweetData(){
      console.log(this.tweetsToReturn)
      return this.tweetsToReturn
  }

  stopData(){
      if(this.subscription){
        this.subscription.unsubscribe()
      }
  }
}
