<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@stabilio/lib-base](./lib-base.md) &gt; [StabilioStoreState](./lib-base.stabiliostorestate.md)

## StabilioStoreState type

Type of [StabilioStore](./lib-base.stabiliostore.md)<!-- -->'s [state](./lib-base.stabiliostore.state.md)<!-- -->.

<b>Signature:</b>

```typescript
export declare type StabilioStoreState<T = unknown> = StabilioStoreBaseState & StabilioStoreDerivedState & T;
```
<b>References:</b> [StabilioStoreBaseState](./lib-base.stabiliostorebasestate.md)<!-- -->, [StabilioStoreDerivedState](./lib-base.stabiliostorederivedstate.md)

## Remarks

It combines all properties of [StabilioStoreBaseState](./lib-base.stabiliostorebasestate.md) and [StabilioStoreDerivedState](./lib-base.stabiliostorederivedstate.md) with optional extra state added by the particular `StabilioStore` implementation.

The type parameter `T` may be used to type the extra state.

