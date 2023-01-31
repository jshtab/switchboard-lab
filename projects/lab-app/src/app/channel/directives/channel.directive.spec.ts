import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Channel, Channels } from '../channel';
import { ChannelsDirective } from './channel.directive';

describe('ChannelsDirective', () => {
  const testChannel = Symbol() as Channel<string>

  it('should create an instance', () => {
    const directive = new ChannelsDirective();
    expect(directive).toBeTruthy();
  });

  it('should provide updated values when channels change', () => {
    const currentContent = of('test1');
    const nextContent = of('test2');

    const directive = new ChannelsDirective();
    directive.appChannels = new ConstantChannels(currentContent);;
    
    const observer = jasmine.createSpy("consumer");
    directive.get(testChannel).subscribe(observer)

    expect(observer)
      .withContext("must call consumer with current channel content")
      .toHaveBeenCalledWith('test1');
    
    directive.appChannels = new ConstantChannels(nextContent)
    
    expect(observer)
      .withContext("must call consumer with new channel content")
      .toHaveBeenCalledWith('test2');
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
