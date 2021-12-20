import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
// import { DataGateway } from './data.gateway';
import { DataService } from './data.service';

@Module({
    providers:[
        // DataGateway,
        DataService],
    imports:[HttpModule]
})
export class DataModule {}
