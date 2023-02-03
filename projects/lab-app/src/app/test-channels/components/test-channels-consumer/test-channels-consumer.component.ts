import { Component } from '@angular/core';
import { activeChannel, ActiveChannels, extractChannel } from '../../../channel/channel';
import { stringChannel } from '../../channels';

@Component({
  selector: 'app-test-channels-consumer',
  templateUrl: './test-channels-consumer.component.html',
  styleUrls: ['./test-channels-consumer.component.less']
})
export class TestChannelsConsumerComponent {

  message$ = this.activeChannels.channels.pipe(
    extractChannel(stringChannel, null)
  )

  constructor(
    private activeChannels: ActiveChannels
  ) { }

}
