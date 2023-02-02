import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Channel, Channels } from '../channel';
import { ChannelsDirective } from './channel.directive';

describe('ChannelsDirective', () => {
  const testChannel = {} as Channel<string>

  it('should create an instance', () => {
    const directive = new ChannelsDirective();
    expect(directive).toBeTruthy();
  });

  it('should provide updated values when channels change', () => {
    const currentContent =  new ConstantChannels(of());
    const nextContent = new ConstantChannels(of());

    const directive = new ChannelsDirective();
    directive.appChannels = currentContent

    const observer = jasmine.createSpy("consumer");
    directive.channels.subscribe(observer)

    expect(observer)
      .withContext("must call consumer with current channel content")
      .toHaveBeenCalledWith(currentContent);
    
    directive.appChannels = nextContent
    
    expect(observer)
      .withContext("must call consumer with new channel content")
      .toHaveBeenCalledWith(nextContent);
  })

});



class ConstantChannels implements Channels {
  
  constructor(
    private content: Observable<any>
  ) {}

  public get<T>(token: Channel<T>): Observable<T> {
    return this.content
  }
  
}
