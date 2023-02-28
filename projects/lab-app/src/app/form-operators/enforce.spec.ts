import { FormControl, ValidatorFn, Validators } from "@angular/forms";
import { of, Subject } from "rxjs";
import { enforce } from "./enforce";

describe('enforce', () => {
    it('should apply validators when source emits true', () => {
        const control = new FormControl(null);
        of(true).pipe(enforce(control, [Validators.nullValidator])).subscribe();
        expect(control.hasValidator(Validators.nullValidator)).toBeTrue();
    })

    it('should remove validators after source emits false later', () => {
        const control = new FormControl(null);
        const source = new Subject<boolean>();
        const parameterized = (): ValidatorFn => (control) => null; // this is redundant but we check it anyway.
        const parameterized_instance = parameterized(); // if it fails, you have seriously broken something.
        source.pipe(enforce(control, [Validators.nullValidator, parameterized_instance])).subscribe();
        source.next(true);
        expect(control.hasValidator(Validators.nullValidator)).toBeTrue();
        expect(control.hasValidator(parameterized_instance)).withContext("identity check").toBeTrue();
        source.next(false);
        expect(control.hasValidator(Validators.nullValidator)).toBeFalse();
        expect(control.hasValidator(parameterized_instance)).withContext("identity check").toBeFalse();
    })
})
