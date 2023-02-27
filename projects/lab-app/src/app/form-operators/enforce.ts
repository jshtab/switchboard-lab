import { AbstractControl, ValidatorFn } from "@angular/forms";
import { finalize, MonoTypeOperatorFunction, tap } from "rxjs";


export function enforce(control: AbstractControl, validators: ValidatorFn[]): MonoTypeOperatorFunction<boolean> {
    return input => input.pipe(
        tap(active => active ? control.addValidators(validators) : control.removeValidators(validators)),
    )
}
