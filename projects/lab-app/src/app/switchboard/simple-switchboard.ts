import { BehaviorSubject, Observable } from "rxjs";
import { Channels } from "../channel/channel";
import { Handle, Switchboard } from "./switchboard";

/**
 * Switchboard with a simplified API, for experiments.
 */
export class SimpleSwitchboard implements Switchboard {
    
    private handleMap = new Map<Handle, BehaviorSubject<Channels|undefined>>();
    
    public getChannels(handle: Handle): Observable<Channels | undefined> {
        return this.getHandleSubject(handle)?.asObservable();
    }

    /**
     * Register and change the state of a handle.
     * @param handle the handle to target
     * @param channels the new state of the handle
     */
    public setHandle(handle: Handle, channels: Channels) {
        const subject = this.getHandleSubject(handle);
        subject.next(channels);
    }

    /**
     * Return the current Channels object for a given handle.
     * @param handle The handle to lookup
     * @returns state snapshot, or undefined if not registered.
     */
    public getHandle(handle: Handle): Channels | undefined {
        return this.getHandleSubject(handle)?.value
    }

    private getHandleSubject(handle: Handle): BehaviorSubject<Channels|undefined> {
        const currentSubject = this.handleMap.get(handle) ?? new BehaviorSubject<Channels|undefined>(undefined)
        this.handleMap.set(handle, currentSubject)
        return currentSubject;
    }

    /**
     * @returns all registered handles
     */
    public getHandles(): Iterable<Handle> {
        return this.handleMap.keys();
    }

}

