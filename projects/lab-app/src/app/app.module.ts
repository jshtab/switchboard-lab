import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestChannelsModule } from './test-channels/test-channels.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TestChannelsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
