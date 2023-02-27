import { AbstractControl, FormControl, Validators } from "@angular/forms"
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
        source.pipe(enforce(control, [Validators.nullValidator])).subscribe();
        source.next(true);
        expect(control.hasValidator(Validators.nullValidator)).toBeTrue();
        source.next(false);
        expect(control.hasValidator(Validators.nullValidator)).toBeFalse();
    })
})