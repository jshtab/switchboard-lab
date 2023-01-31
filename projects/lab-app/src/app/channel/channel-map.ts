import { Observable, of } from "rxjs";
import { Channel, Channels } from "./channel";

/**
 * Channels storage utilizing a Map.
 */
export class ChannelMap implements Channels {

    private channels = new Map<Channel<any>, Observable<any>>;

    constructor(
        private fallback: Observable<any> = of()
    ) { }

    public get<T>(token: Channel<T>): Observable<T> {
        return this.channels.get(token) || this.fallback
    }

    public set<T>(token: Channel<T>, content: Observable<T>) {
        this.channels.set(token, content)
    }

}
