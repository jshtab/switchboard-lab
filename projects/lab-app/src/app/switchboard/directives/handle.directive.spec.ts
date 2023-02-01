import { Observable } from 'rxjs';
import { Channel } from '../../channel/channel';
import { Handle, Switchboard } from '../switchboard';
import { HandleDirective } from './handle.directive';

class NullSwitchboard implements Switchboard {
  public getChannel<T>(handle: Handle, channel: Channel<T>): Observable<T> {
    throw new Error('Method not implemented.');
  }
}

describe('HandleDirective', () => {
  it('should create an instance', () => {
    const sb = new NullSwitchboard();
    const directive = new HandleDirective(sb);
    expect(directive).toBeTruthy();
  });
});
