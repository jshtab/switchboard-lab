import { AbstractControl, ValidatorFn, Validators } from "@angular/forms";
import { finalize, MonoTypeOperatorFunction, tap } from "rxjs";

/**
 * Applies validators to controls for each emission of true, removes them otherwise.
 * 
 * This operator works by reference. When targeting the same control in different pipes
 * with identical validators, if one pipe is true and the other is false, then the
 * operator functions will race, leading to unexpected behavior.
 * 
 * This is mitigated by wrapping your validators in a {@link Validators.compose},
 * with a drawback: {@link AbstractControl.hasValidator} won't work as expected.
 *  
 * @param control target to apply validators
 * @param validators the validator functions to apply/remove
 * @returns operator function
 */
export function enforce(control: AbstractControl, validators: ValidatorFn[]): MonoTypeOperatorFunction<boolean> {
    return input => input.pipe(
        tap(active => active ? control.addValidators(validators) : control.removeValidators(validators)),
    )
}
