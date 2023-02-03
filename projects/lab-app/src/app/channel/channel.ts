import { Observable, of, switchMap } from "rxjs"

// export interface Channel<T> extends Symbol {}

/**
 * Opaque token representing a single channel
 */
export type Channel<T> = {}

/**
 * Group of several channels.
 */
export abstract class Channels {
    /**
     * Get the underlying observable for a given Channel.
     * @param token requested channel
     * @returns observable of that channel, or undefined if none exist.
     */
    public abstract get<T>(token: Channel<T>): Observable<T> | undefined;
}

export abstract class ActiveChannels {
    public readonly abstract channels: Observable<Channels | undefined>
}

/**
 * Extract a channel from an observable of active channels.
 * @param channels observable of active channels
 * @param channel the channel to extract
 * @param fallback the value to emit when no channel is present
 * @returns most recently emitted value from the most recently provided set of active channels
 */
export function activeChannel<T, R>(channels: Observable<Channels | undefined>, channel: Channel<T>, fallback: R): Observable<T | R> {
    return channels.pipe(
        switchMap((activeChannels) => activeChannels?.get(channel) ?? of(fallback)),
    )
}


/**
 * For each emission of the source observable, emit the contents of the channel, or the fallback value if the channel is undefined.
 * @param channel channel to extract
 * @param fallback value to emit when no channel is available
 * @returns operator function
 */
export function extractChannel<T, R>(channel: Channel<T>, fallback: R): {(source: Observable<Channels|undefined>): Observable<T|R>} {
    return (channels) => activeChannel(channels, channel, fallback)
}
