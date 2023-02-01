import { Observable, of } from "rxjs";
import { Channel, Channels } from "../channel/channel";
import { Handle, Switchboard } from "./switchboard";

/**
 * Switchboard with a simplified API, for experiments.
 */
export class SimpleSwitchboard implements Switchboard {
    
    private handleMap = new Map<Handle, Channels>();
    
    public getChannels(handle: Handle): Observable<Channels | undefined> {
        const channels = this.handleMap.get(handle);
        return of(channels); // this does not reactively update- should probably.
    }

    public setHandle(handle: Handle, channel: Channels) {
        this.handleMap.set(handle, channel);
    }

    public getHandle(handle: Handle): Channels | undefined {
        return this.handleMap.get(handle);
    }

    public getHandles(): Iterable<Handle> {
        return this.handleMap.keys();
    }

}

