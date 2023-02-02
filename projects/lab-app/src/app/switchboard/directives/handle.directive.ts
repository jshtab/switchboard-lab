import { Directive, Input } from '@angular/core';
import { Observable, of, ReplaySubject, switchMap } from 'rxjs';
import { ActiveChannels, Channels } from '../../channel/channel';
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

  private currentHandle = new ReplaySubject<Handle | undefined>(1);
  public readonly channels: Observable<Channels | undefined> = this.currentHandle.pipe(
    switchMap((channel) => channel ? this.switchboard.getChannels(channel) : of(undefined))
  )

  @Input()
  public set appHandle(handle: Handle | undefined) {
    this.currentHandle.next(handle);
  }

  constructor(
    private switchboard: Switchboard
  ) { }

}
