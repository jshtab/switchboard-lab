import { Directive, Input } from '@angular/core';
import { map, Observable, ReplaySubject, switchMap } from 'rxjs';
import { ActiveChannels, Channel, Channels } from '../../channel/channel';
import { Handle, Switchboard } from '../switchboard';

/**
 * Provides channels for the given Handle.
 * Depends on a Switchboard.
 */
@Directive({
  selector: '[appHandle]',
  standalone: true,
  providers: [
    {provide: ActiveChannels, useExisting: HandleDirective}
  ]
})
export class HandleDirective implements ActiveChannels {

  private currentHandle = new ReplaySubject<Handle>(1);
  public readonly channels: Observable<Channels | undefined> = this.currentHandle.pipe(
    switchMap((channel) => this.switchboard.getChannels(channel))
  )

  @Input()
  public set appHandle(handle: Handle) {
    this.currentHandle.next(handle);
  }

  constructor(
    private switchboard: Switchboard
  ) { }

}
