
import { AbstractControl, FormControl, ValidatorFn } from "@angular/forms";
import { map, merge, Observable, ObservableInput, startWith, OperatorFunction, MonoTypeOperatorFunction, tap, takeUntil } from "rxjs";

export interface ConditionalSource {
    when<T>(control: FormControl<T>, cond: (val: T) => boolean): ConditionalActions;
    when<T>(control: AbstractControl<T>, cond: (val: T) => boolean): ConditionalActions;
}

export interface ConditionalActions {
    // enforceOn(validators: ValidatorFn[], control: AbstractControl): ConditionalActions;
    disable(control: AbstractControl): ConditionalActions;
    enable(control: AbstractControl): ConditionalActions;
    readonly and: ConditionalSource

    until(signal: ObservableInput<any>): Observable<boolean>
    // while(predicate: BooleanConstructor): Observable<boolean>
    merge(): Observable<boolean>
}

export const enableControl = (control: AbstractControl): ActionFunction => (active) => active ? control.enable() : control.disable();
export const disableControl = (control: AbstractControl): ActionFunction => (active) => active ?  control.disable() :control.enable();

export type ActionFunction = (active: boolean) => void;

class StackAction implements ConditionalActions {

    private actions: ActionFunction[] = [];
    constructor(private stack: StackSource, private source: Observable<boolean>) {}

    private stackSource() {
        return new StackSource([...this.stack.stack, this.composeActions()])
    }

    public disable(control: AbstractControl) {
        this.actions.push(disableControl(control));
        return this;
    }

    public enable(control: AbstractControl) {
        this.actions.push(enableControl(control));
        return this;
    }

    private composeActions() {
        return this.source.pipe(
            tap((active) => this.actions.forEach(action => action(active)))
        )
    }

    get and(): ConditionalSource {
        return this.stackSource();
    }

    merge(): Observable<boolean> {
        return merge(...this.stackSource().stack)
    }

    until(signal: ObservableInput<any>): Observable<boolean> {
        return this.merge().pipe(takeUntil(signal));
    }

}

class StackSource implements ConditionalSource {

    constructor(public readonly stack: Observable<boolean>[] = []) {}
    public when<T>(control: AbstractControl<T>, cond: (val: T) => boolean): ConditionalActions {
        const pipe = control.valueChanges.pipe(startWith(control.value), map(cond))
        return new StackAction(this, pipe);
    }

}

export function when<T>(control: FormControl<T>, cond: (val: T) => boolean) : ConditionalActions;
export function when<T>(control: AbstractControl<T>, cond: (val: T) => boolean): ConditionalActions {
    return new StackSource().when(control, cond);
}
