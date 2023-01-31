import { Component, Optional } from '@angular/core';
import { of } from 'rxjs';
import { Channels } from '../../../channel/channel';
import { StringChannel } from '../../channels';

@Component({
  selector: 'app-test-channels-consumer',
  templateUrl: './test-channels-consumer.component.html',
  styleUrls: ['./test-channels-consumer.component.less']
})
export class TestChannelsConsumerComponent {

  message$ = this.channels?.get(StringChannel) ?? of();

  constructor(
    @Optional() private channels?: Channels
  ) { }

}
