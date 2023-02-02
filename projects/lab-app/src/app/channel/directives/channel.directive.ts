import { Directive, Input } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { ActiveChannels, Channels } from '../channel';

/**
 * Provide channels to an element.
 */
@Directive({
  selector: '[appChannels]',
  standalone: true,
  providers: [
    {provide: ActiveChannels, useExisting: ChannelsDirective}
  ]
})
export class ChannelsDirective implements ActiveChannels {

  private currentChannels = new ReplaySubject<Channels>(1);
  public channels: Observable<Channels | undefined> = this.currentChannels.asObservable();

  @Input()
  public set appChannels(appChannels: Channels) {
    this.currentChannels.next(appChannels);
  }

  constructor() { }

}
