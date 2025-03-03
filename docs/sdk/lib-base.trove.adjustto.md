<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@stabilio/lib-base](./lib-base.md) &gt; [Trove](./lib-base.trove.md) &gt; [adjustTo](./lib-base.trove.adjustto.md)

## Trove.adjustTo() method

Calculate the parameters of an [adjustTrove()](./lib-base.transactablestabilio.adjusttrove.md) transaction that will change this Trove into the given Trove.

<b>Signature:</b>

```typescript
adjustTo(that: Trove, borrowingRate?: Decimalish): TroveAdjustmentParams<Decimal>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  that | [Trove](./lib-base.trove.md) | The desired result of the transaction. |
|  borrowingRate | [Decimalish](./lib-base.decimalish.md) | Current borrowing rate. |

<b>Returns:</b>

[TroveAdjustmentParams](./lib-base.troveadjustmentparams.md)<!-- -->&lt;[Decimal](./lib-base.decimal.md)<!-- -->&gt;

