<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@stabilio/lib-base](./lib-base.md) &gt; [PopulatableStabilio](./lib-base.populatablestabilio.md) &gt; [stakeSTBL](./lib-base.populatablestabilio.stakestbl.md)

## PopulatableStabilio.stakeSTBL() method

Stake STBL to start earning fee revenue or increase existing stake.

<b>Signature:</b>

```typescript
stakeSTBL(amount: Decimalish): Promise<PopulatedStabilioTransaction<P, SentStabilioTransaction<S, StabilioReceipt<R, void>>>>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  amount | [Decimalish](./lib-base.decimalish.md) | Amount of STBL to add to new or existing stake. |

<b>Returns:</b>

Promise&lt;[PopulatedStabilioTransaction](./lib-base.populatedstabiliotransaction.md)<!-- -->&lt;P, [SentStabilioTransaction](./lib-base.sentstabiliotransaction.md)<!-- -->&lt;S, [StabilioReceipt](./lib-base.stabilioreceipt.md)<!-- -->&lt;R, void&gt;&gt;&gt;&gt;

## Remarks

As a side-effect, the transaction will also pay out an existing STBL stake's [collateral gain](./lib-base.stblstake.collateralgain.md) and [XBRL gain](./lib-base.stblstake.xbrlgain.md)<!-- -->.

