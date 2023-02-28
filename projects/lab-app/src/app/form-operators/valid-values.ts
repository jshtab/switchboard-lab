import { AbstractControl } from "@angular/forms";
import { filter, Observable } from "rxjs";

/**
 * Return observable containing only valid values from the given control.
 * @param control target control
 * @returns changes in value which are valid
 */
export function validValues<T>(control: AbstractControl<T>): Observable<T> {
    return control.valueChanges.pipe(
        filter(_ => control.status == 'VALID')
    )
}
