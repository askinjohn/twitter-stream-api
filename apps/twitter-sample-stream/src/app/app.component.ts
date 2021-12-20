import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data/data.service';
import { take } from 'rxjs';

@Component({
  selector: 'twitter-stream-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$: any;

  constructor(private http: HttpClient, private ds: DataService) {}
  ngOnInit() {
    // this.ds.sendChat();
    // this.getAllData();
    // this.getData();
  }
 

  async getAllData(){
    console.log(';data needed')
    const obs = this.http.get('http://localhost:3333/api/all').pipe(take(1));
  }
}
