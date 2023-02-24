import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'lab-app';
  destroyed = new Subject<undefined>();

  // Invalid if all members of group are true
  private cantAllBeTrue: ValidatorFn = (control) => 
    Object.values(control.value).reduce((prev, current) => prev && current, true) ? {cantAllBeTrue: true} : null;

  example = this.fb.group({
    toggles: this.fb.group({
      groupA: this.fb.nonNullable.control(false),
      groupB: this.fb.nonNullable.control(false)
    }, {validators: [this.cantAllBeTrue]}),
    groupA: this.fb.group({
      a: this.fb.nonNullable.control(1)
    }),
    groupB: this.fb.group({
      a: this.fb.nonNullable.control(1)
    }),
  })

  constructor(private fb: FormBuilder) { }

  private disabler(control: AbstractControl) {
    return (condition: any) => condition ? control.disable() : control.enable();
  }

  private setupToggleListener(toggle: FormControl<boolean>, target: FormGroup) {
    toggle.valueChanges.pipe(takeUntil(this.destroyed)).subscribe(this.disabler(target));
  }

  ngOnInit(): void {
    const groups = this.example.controls;
    const toggles = this.example.controls.toggles.controls;
    this.setupToggleListener(toggles.groupA, groups.groupA)
    this.setupToggleListener(toggles.groupB, groups.groupB)
    this.example.updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.destroyed.next(undefined);
  }

}
