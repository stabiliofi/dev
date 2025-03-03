<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@stabilio/lib-base](./lib-base.md) &gt; [TroveListingParams](./lib-base.trovelistingparams.md)

## TroveListingParams interface

Parameters of the [getTroves()](./lib-base.readablestabilio.gettroves_1.md) function.

<b>Signature:</b>

```typescript
export interface TroveListingParams 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [beforeRedistribution?](./lib-base.trovelistingparams.beforeredistribution.md) | boolean | <i>(Optional)</i> When set to <code>true</code>, the retrieved Troves won't include the liquidation shares received since the last time they were directly modified. |
|  [first](./lib-base.trovelistingparams.first.md) | number | Number of Troves to retrieve. |
|  [sortedBy](./lib-base.trovelistingparams.sortedby.md) | "ascendingCollateralRatio" \| "descendingCollateralRatio" | How the Troves should be sorted. |
|  [startingAt?](./lib-base.trovelistingparams.startingat.md) | number | <i>(Optional)</i> Index of the first Trove to retrieve from the sorted list. |

