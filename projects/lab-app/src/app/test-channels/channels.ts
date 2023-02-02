import { FormControl, FormGroup } from "@angular/forms";
import { Channel } from "../channel/channel";

export type ControlChannelGroup = FormGroup<{string: FormControl<string>}>
export const stringChannel = Symbol() as Channel<String>
export const controlChannel = Symbol() as Channel<ControlChannelGroup>
