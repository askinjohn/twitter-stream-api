import { Body, Controller, Get, Param, Query } from '@nestjs/common';

import { Message } from '@twitter-stream/api-interfaces';

import { AppService } from './app.service';
import { DataService } from './data/data.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,private ds:DataService) {
  }

  @Get('')
  getData() {
    console.log('Data Called')
    // return this.appService.getData();
  }

  @Get('india')
  getDataForIndiaToday(){
      console.log('india Called')
      return this.ds.getDataForIndiaToday();
  }

  @Get('other')
  getAllDataInit(@Query('token')data){
    console.log(data,'data')
    return this.ds.getOtherData(data);
  }

  @Get('all')
  getAllData(){
    console.log('All Data called')
    return this.ds.tweetData;
  }
}
