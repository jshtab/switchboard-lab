import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestChannelsMainComponent } from './components/test-channels-main/test-channels-main.component';
import { TestChannelsConsumerComponent } from './components/test-channels-consumer/test-channels-consumer.component';
import { ChannelsDirective } from '../channel/directives/channel.directive';


@NgModule({
  declarations: [
    TestChannelsMainComponent,
    TestChannelsConsumerComponent
  ],
  imports: [
    CommonModule,
    ChannelsDirective
  ],
  exports: [
    TestChannelsMainComponent
  ]
})
export class TestChannelsModule { }
