<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@stabilio/lib-base](./lib-base.md) &gt; [SendableStabilio](./lib-base.sendablestabilio.md) &gt; [borrowXBRL](./lib-base.sendablestabilio.borrowxbrl.md)

## SendableStabilio.borrowXBRL() method

Adjust existing Trove by borrowing more XBRL.

<b>Signature:</b>

```typescript
borrowXBRL(amount: Decimalish, maxBorrowingRate?: Decimalish): Promise<SentStabilioTransaction<S, StabilioReceipt<R, TroveAdjustmentDetails>>>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  amount | [Decimalish](./lib-base.decimalish.md) | The amount of XBRL to borrow. |
|  maxBorrowingRate | [Decimalish](./lib-base.decimalish.md) | Maximum acceptable [borrowing rate](./lib-base.fees.borrowingrate.md)<!-- -->. |

<b>Returns:</b>

Promise&lt;[SentStabilioTransaction](./lib-base.sentstabiliotransaction.md)<!-- -->&lt;S, [StabilioReceipt](./lib-base.stabilioreceipt.md)<!-- -->&lt;R, [TroveAdjustmentDetails](./lib-base.troveadjustmentdetails.md)<!-- -->&gt;&gt;&gt;

## Remarks

Equivalent to:

```typescript
adjustTrove({ borrowXBRL: amount }, maxBorrowingRate)

```

