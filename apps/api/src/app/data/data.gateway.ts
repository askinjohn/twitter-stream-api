import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
import { DataService } from './data.service';

@WebSocketGateway({ transports: ['websocket'] })

export class DataGateway implements OnGatewayConnection,OnGatewayDisconnect{
  @WebSocketServer() server;
  
  constructor(private ds:DataService){
    console.log('called')
  }


  async handleConnection(client) {
    console.log('Client Connected')
  }

  async handleDisconnect(client: any) {
    console.log('Disconnected')
  }

  @SubscribeMessage('start')
  async startDataStream(client,message){
    console.log('message')
    client.broadcast.emit('chat', message);
  }
}