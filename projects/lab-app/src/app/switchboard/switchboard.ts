import { Observable } from "rxjs";
import { Channel, Channels } from "../channel/channel";

/**
 * Opaque token representing a set of Channels.
 */
export type Handle = {};

/**
 * Resolves Handles to Channels
 */
export abstract class Switchboard {

    public abstract getChannels(handle: Handle): Observable<Channels | undefined>

}
