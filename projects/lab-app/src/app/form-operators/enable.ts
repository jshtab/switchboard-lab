import { AbstractControl } from "@angular/forms";
import { finalize, MonoTypeOperatorFunction, tap } from "rxjs";



export function enableControl(control: AbstractControl, opts?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
}): MonoTypeOperatorFunction<boolean> {
    const initial = control.enabled;
    return input => input.pipe(
        tap(active => active ? control.enable(opts) : control.disable(opts)),
    )
}

export function disableControl(control: AbstractControl, opts?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
}): MonoTypeOperatorFunction<boolean> {
    const initial = control.enabled;
    return input => input.pipe(
        tap(active => active ? control.disable(opts) : control.enable(opts)),
    )
}
