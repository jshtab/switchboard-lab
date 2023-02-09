# Channels

Data-passing toolkit using RxJS. Most useful when Input bindings are impossible, impractical, or the data being passed is expensive to create. Components use Channels by depending on a service. This service contains Observables mapped to a name.

## Benefits

Channels perform better than Input bindings when:
- passing data to components created at runtime
- any case where Input binding is impossible
- Inputs change very frequently or have complex setter logic.
- data provided to a component shouldn't be calculated unless used

## Examples

TODO

