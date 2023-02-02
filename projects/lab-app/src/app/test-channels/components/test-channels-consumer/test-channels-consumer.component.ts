import { Component } from '@angular/core';
import { activeChannel, ActiveChannels } from '../../../channel/channel';
import { stringChannel } from '../../channels';

@Component({
  selector: 'app-test-channels-consumer',
  templateUrl: './test-channels-consumer.component.html',
  styleUrls: ['./test-channels-consumer.component.less']
})
export class TestChannelsConsumerComponent {

  message$ = activeChannel(this.channels.channels, stringChannel, null);

  constructor(
    private channels: ActiveChannels
  ) { }

}
