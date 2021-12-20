import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DataService } from '../data/data.service';
import { liveQuery } from 'dexie';
import { db, Tweets } from '../db/db';


@Component({
  selector: 'twitter-stream-tweet-box',
  templateUrl: './tweet-box.component.html',
  styleUrls: ['./tweet-box.component.scss']
})
export class TweetBoxComponent implements OnInit {
  // tweetsObs:Observable<any>;
  tweetsObs:any= liveQuery(() => this.getCurrentTweets());
  nextTweets: Tweets[];
  state = 'DATA'
  constructor(private ds:DataService) { }

  ngOnInit(): void {
    db.resetDb();
  }

  async getCurrentTweets(){
    const data:any = await db.currentTweets.toArray()
    console.log(data[0],'data');
    const nextToken = data[0]?.meta?.next_token;
    if(nextToken){
      this.getNextTweets(nextToken);
    }
    return data[0]
  }

  async getNextTweets(nextToken){
     this.ds.getNextData(nextToken)
  }

  getOldTweets(){
     this.tweetsObs = this.getNextTweetsFromStore()

  }

  async getNextTweetsFromStore(){
    console.log('getting next tweets')
      this.nextTweets = await db.nextTweets.toArray();
      console.log(this.nextTweets,'tweets')
      const nextToken = this.nextTweets[0]?.meta?.next_token;
      const prevToken = this.nextTweets[0]?.meta?.previous_token;

      if(nextToken){
        this.getNextTweets(nextToken);
      }
      if(prevToken){
        this.getPreviousTweets(prevToken)
      }
      return this.nextTweets[0]
  }

  async getPreviousTweets(prevToken){
      this.ds.getPreviousData(prevToken)
  }

  ngOnDestroy(){
    
  }

}
