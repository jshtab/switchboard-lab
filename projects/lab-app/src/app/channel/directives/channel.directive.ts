import { Directive, Input } from '@angular/core';
import { Observable, ReplaySubject, switchMap } from 'rxjs';
import { Channel, Channels } from '../channel';

/**
 * Provide channels to an element.
 */
@Directive({
  selector: '[appChannels]',
  standalone: true,
  providers: [
    {provide: Channels, useExisting: ChannelsDirective}
  ]
})
export class ChannelsDirective implements Channels {

  private currentChannels = new ReplaySubject<Channels>(1);

  @Input()
  public set appChannels(appChannels: Channels) {
    this.currentChannels.next(appChannels);
  }

  constructor() { }

  public get<T>(token: Channel<T>): Observable<T> {
    return this.currentChannels.pipe(
      switchMap((channels) => channels.get(token))
    )
  }

}
