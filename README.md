## switchboard-lab

Switchboard is a experimental utility for passing Observables to Angular Components at runtime without using `@Input`. Useful in situations where the type of the component is unknown ahead-of-time, such as runtime mounting using `ngComponentOutlet`, `router-outlet` or `ViewContainerRef`. Instead, it uses Dependency Injection and RxJS. Dynamically mounted components consume Observables in place of input bindings.

## Demo

This lab will accumulate demonstrations in the future. Currently,  none are deployed anywhere. You can review the current demonstration in the `lab-app/src/app/test-channels` module.

## Use

Using Switchboard, components with dynamic outlets provide their children with data directly using Observables. Each Observable is associated with a typed symbol identifier (like Angular's *InjectionToken*) called a *Channel*.

```html
<ng-container [appChannels]="fieldInfo">
	<ng-container *ngComponentOutlet="dynamicEditor"></ng-container>
</ng-container>
```

Writing components with Switchboard is very similar to Angular Router's Resolver feature, but generic and type-safe. Components are provided an injectable (similar to *ActivatedRoute*) that provides access to any injected observables from the parent.

```ts
export const valueChannel: Channel<string> = {} as const;

@Component()
class ConsumerComponent {

	values = this.activeChannels.channels.pipe(
		extractChannel(valueChannel, null)
	);

	constructor(
		private activeChannels: ActiveChannels
	) { }
}
```

Much like Angular's Dependency Injector, a concievable that the parent doesn't define an Observable associated with a *Channel* object that the child component requires. So, a possible provider for any *Channel* is *undefined*. In the example, the included *extractChannel* operator subscribes to the newest provider for *valueChannel* and emits. When there is no provider, the default value *null* is emitted instead.

## Modules

This experiment has an important contstraint: *flexibility*. The *channel* module describes the interaction between Switchboard and Angular Components, and nothing more. The other modules must be interchangable features built on top. How Observables are consumed should be completely seperate from how they're created and how they're provided to different parts of the application.

Currently, these features are included in the lab:
- Core channel functionality, provides type-safe injected data.
- Switchboard, a rudamentary service for providing channels at runtime.

## Purpose
This lab started to develop an in-browser [JSON-LD](https://json-ld.org/) editor. After several iterations, it was clear that a utility for distributing and consuming state between parts of the application was required. Linked Data is dynamic enough that defining the interface purely using the template is infeasable long-term. Too much will change at runtime, and large `ngSwitch` cases are hard to test and lack good code reuse features.

After switching to runtime component mounting, Input bindings aren't possible without serious boilerplate and assumptions about the Components being mounted. This leaves dependency injection, but only using  dependency injection causes reactivity issues. Exposing Observables through injectables and taking liberal inspiration from the Router has gone the furthest towards making the original idea, and aligns well with Inversion of Control principles.

## Setup

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.4.

* Install project dependencies using `npm i`
- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.
- Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
- Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.