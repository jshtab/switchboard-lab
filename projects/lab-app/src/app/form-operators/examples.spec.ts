import { FormControl } from "@angular/forms"
import { filter, map } from "rxjs";
import { disableControl } from "./enable";

describe('form-operators api', () => {
    it('should mostly use base RxJS', () => {
        const control = new FormControl("test");

        control.valueChanges.pipe(
            map((value) => value && value.length > 5), // convert value to condition
            disableControl(control) // side effect of disabling the control
        ).subscribe();

        expect(control.enabled).toBeTrue();
        control.setValue("longer than five");
        expect(control.enabled).toBeFalse();
    })

    xit('should have some nice tools for selection', () => {
        // selectChanges<string>(group.select("thing.x.x.x.x")) -> valueChanges.any -> type
    })
})