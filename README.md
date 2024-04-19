# Important Notice

This repository was created *before* the Angular 15 preview release of Signals, and their subsequent full release in Angular 16.
This new feature in Angular renders all this entire project moot, it does exactly what I wanted, and better than I could ever do.
A third-party add-on can't beat first-class support. This repository is now archived forever.

## switchboard-lab

This repository contains a bunch of experiments with Angular application design, RxJS, and runtime component manipulation.
The repository is automatically deployed [here](https://jshtab.github.io/switchboard-lab/) and should contain some applications to play around with.

## Experiments

The following experiments are here:
- [Channels](projects/lab-app/src/app/channel/README.md), toolkit for passing data using RxJS and DI
- Switchboard, helper module for Channels.

## Purpose

This lab started to develop an in-browser [JSON-LD](https://json-ld.org/) editor. This proved to be more of a challenge than I thought initially, taking me on this wild adventure of reactivity, architecture and more. The eventual goal is to create the editor, but there's alot of work to be done.

## Setup

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.4.

* Install project dependencies using `npm i`
- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.
- Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
- Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
