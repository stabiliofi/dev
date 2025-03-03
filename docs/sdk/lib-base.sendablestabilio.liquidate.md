<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@stabilio/lib-base](./lib-base.md) &gt; [SendableStabilio](./lib-base.sendablestabilio.md) &gt; [liquidate](./lib-base.sendablestabilio.liquidate.md)

## SendableStabilio.liquidate() method

Liquidate one or more undercollateralized Troves.

<b>Signature:</b>

```typescript
liquidate(address: string | string[]): Promise<SentStabilioTransaction<S, StabilioReceipt<R, LiquidationDetails>>>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  address | string \| string\[\] | Address or array of addresses whose Troves to liquidate. |

<b>Returns:</b>

Promise&lt;[SentStabilioTransaction](./lib-base.sentstabiliotransaction.md)<!-- -->&lt;S, [StabilioReceipt](./lib-base.stabilioreceipt.md)<!-- -->&lt;R, [LiquidationDetails](./lib-base.liquidationdetails.md)<!-- -->&gt;&gt;&gt;

