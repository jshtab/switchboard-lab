import { Observable, of } from "rxjs";
import { Channel, Channels } from "./channel";

/**
 * Channels storage utilizing a Map.
 */
export class ChannelMap implements Channels {

    private _used = false;
    private channels = new Map<Channel<any>, Observable<any>>;

    constructor(
        private fallback: Observable<any> = of()
    ) { }

    public get<T>(token: Channel<T>): Observable<T> {
        if(!this._used)
            this._used = true
        return this.channels.get(token) || this.fallback
    }

    public set<T>(token: Channel<T>, content: Observable<T>) {
        if(this._used)
            console.warn(`This ChannelMap has been used, the new value may not be reflected.`);
            // Non-reactive. If someone subscribed to the observable in get(), they won't get the new one.
        this.channels.set(token, content)
    }

}
