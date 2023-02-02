import { Component } from '@angular/core';
import { activeChannel, ActiveChannels } from '../../../channel/channel';
import { controlChannel } from '../../channels';

@Component({
  selector: 'app-test-channels-control',
  templateUrl: './test-channels-control.component.html',
  styleUrls: ['./test-channels-control.component.less']
})
export class TestChannelsControlComponent {

  control$ = activeChannel(this.channels.channels, controlChannel, null)

  constructor(
    private channels: ActiveChannels
  ) {}
}
