import { FormControl } from "@angular/forms";
import { Subject } from "rxjs";
import { when } from "./listener";

describe("conditial form actions", () => {
    it("should work", () => {
        const checkBox = new FormControl<boolean>(false, { nonNullable: true });
        const textBox = new FormControl<number>(11);

        const stopWatching = new Subject();
        when(checkBox, (val) => !!val).enable(textBox).until(stopWatching).subscribe();

        expect(textBox.enabled).toBeFalse();
        checkBox.setValue(true);
        expect(textBox.enabled).toBeTrue();
        checkBox.setValue(false);
        expect(textBox.enabled).toBeFalse();

        stopWatching.next(undefined);
        checkBox.setValue(true);
        expect(textBox.enabled).toBeFalse();
        checkBox.setValue(false);
        expect(textBox.enabled).toBeFalse();
    })
    it("should stack")
})
