import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable, of, ReplaySubject, switchMap } from 'rxjs';
import { ChannelMap } from '../../../channel/channel-map';
import { SimpleSwitchboard } from '../../../switchboard/simple-switchboard';
import { Switchboard } from '../../../switchboard/switchboard';
import { controlChannel, ControlChannelGroup, stringChannel } from '../../channels';
import { TestChannelsConsumerComponent } from '../test-channels-consumer/test-channels-consumer.component';
import { TestChannelsControlComponent } from '../test-channels-control/test-channels-control.component';

@Component({
  selector: 'app-test-channels-main',
  templateUrl: './test-channels-main.component.html',
  styleUrls: ['./test-channels-main.component.less'],
  providers: [
    {provide: SimpleSwitchboard, useClass: SimpleSwitchboard},
    {provide: Switchboard, useExisting: SimpleSwitchboard}
  ]
})
export class TestChannelsMainComponent implements OnInit {

  consumerComponent = TestChannelsConsumerComponent
  controlComponent = TestChannelsControlComponent

  constructor(
    private switchboard: SimpleSwitchboard,
    private fb: FormBuilder
  ) {}

  handles: Set<string> = new Set();
  consumers = this.fb.record<FormControl<string>>({});

  private createHandleForm(): ControlChannelGroup {
    return this.fb.nonNullable.group({
      string: this.fb.nonNullable.control('')
    })
  }

  private createStringChannel(form: Observable<ControlChannelGroup>): Observable<string> {
    const replay = new ReplaySubject<string>(1);
    const values = form.pipe(
      switchMap((group) => group.controls.string.valueChanges),
    );
    values.subscribe(replay);
    return replay.asObservable();
  }

  addHandle() {
    let handle = crypto.randomUUID();
    while(handle in this.handles) {
      handle = crypto.randomUUID();
    }
    const channels = new ChannelMap();
    const formChannel$ = of(this.createHandleForm())
    
    channels.set(controlChannel, formChannel$);
    channels.set(stringChannel, this.createStringChannel(formChannel$))

    this.switchboard.setHandle(handle, channels);
    this.handles.add(handle);
  }

  removeHandle(name: string) {
    this.handles.delete(name);
    for(const record in this.consumers.controls) {
      const control = this.consumers.controls[record];
      if(control.value == name) {
        control.reset();
      }
    }
  }

  addConsumer() {
    let name = crypto.randomUUID();
    while(name in this.handles) {
      name = crypto.randomUUID();
    }
    this.consumers.addControl(name, this.fb.nonNullable.control(''));
  }

  removeConsumer(name: string) {
    this.consumers.removeControl(name);
  }
  
  ngOnInit(): void {
  }

}
