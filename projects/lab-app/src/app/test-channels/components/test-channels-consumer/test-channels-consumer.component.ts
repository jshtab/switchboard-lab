import { Component, Optional } from '@angular/core';
import { of } from 'rxjs';
import { activeChannel, ActiveChannels, Channels } from '../../../channel/channel';
import { controlChannel, stringChannel } from '../../channels';

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
