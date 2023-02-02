import { Observable } from 'rxjs';
import { Channel, Channels } from '../channel/channel';
import { SimpleSwitchboard } from './simple-switchboard';
import { Handle } from './switchboard';

class NullChannels implements Channels {
  public get<T>(token: Channel<T>): Observable<T> {
    throw new Error('Method not implemented.');
  }
}

describe('SimpleSwitchboard', () => {
  it('should create an instance', () => {
    expect(new SimpleSwitchboard()).toBeTruthy();
  });

  it('should update handle subscribers when it changes', () => {
    const instance = new SimpleSwitchboard();
    const handle = Symbol("handle 1") as Handle;
    const firstChannels = new NullChannels();
    const secondChannels = new NullChannels();
    
    const observer = jasmine.createSpy("observer");
    instance.getChannels(handle).subscribe(observer);
    expect(observer).withContext("unregistered channel should emit undefined").toHaveBeenCalledWith(undefined);
    
    instance.setHandle(handle, firstChannels);
    expect(observer).withContext("subscribers should be informed").toHaveBeenCalledWith(firstChannels);

    instance.setHandle(handle, secondChannels);
    expect(observer).withContext('subscribers should be informed').toHaveBeenCalledWith(secondChannels);
  })

  describe('getHandles', () => {
    it('should return all registered handles', () => {
      const instance = new SimpleSwitchboard();
      const handle1 = Symbol("handle 1") as Handle;
      const handle2 = Symbol("handle 2") as Handle;
      const channels = new NullChannels();

      instance.setHandle(handle1, channels);
      instance.setHandle(handle2, channels);
      
      const handles = Array.from(instance.getHandles());
      expect(handles).toContain(handle1);
      expect(handles).toContain(handle2);
    })
  });

});
