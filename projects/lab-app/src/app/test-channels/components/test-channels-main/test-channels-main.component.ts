import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { ChannelMap } from '../../../channel/channel-map';
import { StringChannel } from '../../channels';

@Component({
  selector: 'app-test-channels-main',
  templateUrl: './test-channels-main.component.html',
  styleUrls: ['./test-channels-main.component.less']
})
export class TestChannelsMainComponent implements OnInit {
  
  channels = new ChannelMap();
  
  ngOnInit(): void {
    this.channels.set(StringChannel, of("hello!"))
  }

}
