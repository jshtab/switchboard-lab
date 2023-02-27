import { FormControl } from "@angular/forms";
import { of, shareReplay, Subject } from "rxjs";
import { disableControl, enableControl } from "./enable";

describe('enableControl', () => {
    it('should enable the control when source emits true', () => {
        const control = new FormControl({value: null, disabled: true});
        expect(control.enabled).toBeFalse();
        of(true).pipe(enableControl(control)).subscribe();
        expect(control.enabled).toBeTrue();
    })

    it('should disable the control when source emits false', () => {
        const control = new FormControl();
        of(false).pipe(enableControl(control)).subscribe();
        expect(control.enabled).toBeFalse();
    })
})

describe('disableControl', () => {
    it('should disable the control when source emits true', () => {
        const control = new FormControl();
        of(true).pipe(disableControl(control)).subscribe();
        expect(control.enabled).toBeFalse();
    })

    it('should enable the control when source emits false', () => {
        const control = new FormControl({value: null, disabled: true});
        expect(control.enabled).toBeFalse();
        of(false).pipe(disableControl(control)).subscribe();
        expect(control.enabled).toBeTrue();
    })
})
