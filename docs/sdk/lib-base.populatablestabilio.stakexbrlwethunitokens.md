<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@stabilio/lib-base](./lib-base.md) &gt; [PopulatableStabilio](./lib-base.populatablestabilio.md) &gt; [stakeXbrlWethUniTokens](./lib-base.populatablestabilio.stakexbrlwethunitokens.md)

## PopulatableStabilio.stakeXbrlWethUniTokens() method

Stake Uniswap XBRL/ETH LP tokens to participate in liquidity mining and earn STBL.

<b>Signature:</b>

```typescript
stakeXbrlWethUniTokens(amount: Decimalish): Promise<PopulatedStabilioTransaction<P, SentStabilioTransaction<S, StabilioReceipt<R, void>>>>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  amount | [Decimalish](./lib-base.decimalish.md) | Amount of LP tokens to add to new or existing stake. |

<b>Returns:</b>

Promise&lt;[PopulatedStabilioTransaction](./lib-base.populatedstabiliotransaction.md)<!-- -->&lt;P, [SentStabilioTransaction](./lib-base.sentstabiliotransaction.md)<!-- -->&lt;S, [StabilioReceipt](./lib-base.stabilioreceipt.md)<!-- -->&lt;R, void&gt;&gt;&gt;&gt;

