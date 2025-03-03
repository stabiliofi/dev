<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@stabilio/lib-base](./lib-base.md) &gt; [SendableStabilio](./lib-base.sendablestabilio.md) &gt; [unstakeXbrlWethUniTokens](./lib-base.sendablestabilio.unstakexbrlwethunitokens.md)

## SendableStabilio.unstakeXbrlWethUniTokens() method

Withdraw Uniswap XBRL/ETH LP tokens from liquidity mining.

<b>Signature:</b>

```typescript
unstakeXbrlWethUniTokens(amount: Decimalish): Promise<SentStabilioTransaction<S, StabilioReceipt<R, void>>>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  amount | [Decimalish](./lib-base.decimalish.md) | Amount of LP tokens to withdraw. |

<b>Returns:</b>

Promise&lt;[SentStabilioTransaction](./lib-base.sentstabiliotransaction.md)<!-- -->&lt;S, [StabilioReceipt](./lib-base.stabilioreceipt.md)<!-- -->&lt;R, void&gt;&gt;&gt;

