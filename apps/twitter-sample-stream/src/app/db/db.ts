import Dexie, { Table } from 'dexie';

export interface Tweet{
        id?:string;
        text:string;
}

export interface Tweets{
    meta:any;
    data:Tweet[];
}



export class AppDB extends Dexie{
    previousTweets:Table<Tweets,number>;
    currentTweets:Table<Tweets,number>;
    nextTweets:Table<Tweets,number>
  
    constructor(){
        super('ngdexieliveQuery');
        this.version(1).stores({
            previousTweets:'++id',
            currentTweets:'++id',
            nextTweets:'++id'
        })
    }

    async resetPreviousTweets(){
        await db.transaction('rw','previousTweets',()=>{
            this.previousTweets.clear();
        })
    }

    async resetNextTweets(){
        await db.transaction('rw','nextTweets',()=>{
            this.currentTweets.clear();
        })
    }

    async resetCurrentTweets(){
        await db.transaction('rw','currentTweets',()=>{
            this.nextTweets.clear();
        })
    }
    async resetDb(){
        await db.transaction('rw','previousTweets','currentTweets','nextTweets',()=>{
            this.previousTweets.clear();
            this.currentTweets.clear();
            this.nextTweets.clear();
        })
    }
}

export const db = new AppDB()