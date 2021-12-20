import { Injectable } from '@nestjs/common';
import { Message } from '@twitter-stream/api-interfaces';
import { tap } from 'rxjs';
import { DataService } from './data/data.service';

@Injectable()
export class AppService {
  constructor(private ds:DataService){
    
  }
}
