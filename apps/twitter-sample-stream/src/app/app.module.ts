import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SocketServiceService } from './socket-service.service';
import { TopBarComponent } from './top-bar/top-bar.component';
import { TweetBoxComponent } from './tweet-box/tweet-box.component';
import { ReactiveFormsModule } from '@angular/forms';

const config: SocketIoConfig = {
  url: 'http://localhost:3333',
  options: {
    transports: ['websockets'],
  },
};

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    TopBarComponent,
    TweetBoxComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    ReactiveFormsModule
  ],
  providers: [SocketServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
