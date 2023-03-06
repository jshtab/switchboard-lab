import { AbstractControl } from "@angular/forms";
import { MonoTypeOperatorFunction, tap } from "rxjs";


/**
 * Enables control for every truthy value, disables it otherwise.
 * @see {@link disableControl} for inverse
 * @param control target to enable or disable
 * @param opts enable/disable options
 * @returns operator function
 */
export function enableControl<T>(control: AbstractControl, opts?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
}): MonoTypeOperatorFunction<T> {
    const initial = control.enabled;
    return input => input.pipe(
        tap(active => active ? control.enable(opts) : control.disable(opts)),
    )
}

/**
 * Disables control for every truthy value, enables it otherwise.
 * @see {@link enableControl} for inverse
 * @param control target to enable or disable
 * @param opts enable/disable options
 * @returns operator function
 */
export function disableControl<T>(control: AbstractControl, opts?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
}): MonoTypeOperatorFunction<T> {
    const initial = control.enabled;
    return input => input.pipe(
        tap(active => active ? control.disable(opts) : control.enable(opts)),
    )
}
