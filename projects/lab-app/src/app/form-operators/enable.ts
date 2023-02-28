import { AbstractControl } from "@angular/forms";
import { finalize, MonoTypeOperatorFunction, tap } from "rxjs";


/**
 * Enables control for every emission of true, disables it otherwise.
 * @see `disableControl`
 * @param control target to enable or disable
 * @param opts enable/disable options
 * @returns operator function
 */
export function enableControl(control: AbstractControl, opts?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
}): MonoTypeOperatorFunction<boolean> {
    const initial = control.enabled;
    return input => input.pipe(
        tap(active => active ? control.enable(opts) : control.disable(opts)),
    )
}

/**
 * Disables control for every emission of true, enables it otherwise.
 * @see `enableControl`
 * @param control target to enable or disable
 * @param opts enable/disable options
 * @returns operator function
 */
export function disableControl(control: AbstractControl, opts?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
}): MonoTypeOperatorFunction<boolean> {
    const initial = control.enabled;
    return input => input.pipe(
        tap(active => active ? control.disable(opts) : control.enable(opts)),
    )
}
