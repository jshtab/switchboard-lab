import { FormControl, FormGroup } from "@angular/forms";
import { Channel } from "../channel/channel";

export type ControlChannelGroup = FormGroup<{string: FormControl<string>}>
export const stringChannel: Channel<string> = {} as const;
export const controlChannel: Channel<ControlChannelGroup> = {} as const;
