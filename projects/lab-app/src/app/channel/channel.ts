import { Observable } from "rxjs"

export interface Channel<T> extends Symbol {}

/**
 * Group of several channels.
 */
export abstract class Channels {
    /**
     * Get the underlying observable for a given Channel.
     * This method must be pure, the same token must become the same observable.
     * @param token requested channel
     * @returns observable of that channel
     */
    public abstract get<T>(token: Channel<T>): Observable<T>;
}
