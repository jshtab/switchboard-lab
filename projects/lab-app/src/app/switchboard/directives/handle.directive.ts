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

  private currentHandle = new ReplaySubject<Handle>(1);
  public readonly channels: Observable<Channels> = this.currentHandle.pipe(
    switchMap((handle) => this.switchboard.getChannels(handle))
  )

  @Input()
  public set appHandle(handle: Handle) {
    this.currentHandle.next(handle);
  }

  constructor(
    private switchboard: Switchboard
  ) { }

}
