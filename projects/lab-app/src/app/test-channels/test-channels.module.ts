import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestChannelsMainComponent } from './components/test-channels-main/test-channels-main.component';
import { TestChannelsConsumerComponent } from './components/test-channels-consumer/test-channels-consumer.component';
import { HandleDirective } from '../switchboard/directives/handle.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestChannelsControlComponent } from './components/test-channels-control/test-channels-control.component';


@NgModule({
  declarations: [
    TestChannelsMainComponent,
    TestChannelsConsumerComponent,
    TestChannelsControlComponent
  ],
  imports: [
    CommonModule,
    HandleDirective,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    TestChannelsMainComponent
  ]
})
export class TestChannelsModule { }
