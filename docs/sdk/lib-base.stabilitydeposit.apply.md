<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@stabilio/lib-base](./lib-base.md) &gt; [StabilityDeposit](./lib-base.stabilitydeposit.md) &gt; [apply](./lib-base.stabilitydeposit.apply.md)

## StabilityDeposit.apply() method

Apply a [StabilityDepositChange](./lib-base.stabilitydepositchange.md) to this Stability Deposit.

<b>Signature:</b>

```typescript
apply(change: StabilityDepositChange<Decimalish> | undefined): Decimal;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  change | [StabilityDepositChange](./lib-base.stabilitydepositchange.md)<!-- -->&lt;[Decimalish](./lib-base.decimalish.md)<!-- -->&gt; \| undefined |  |

<b>Returns:</b>

[Decimal](./lib-base.decimal.md)

The new deposited XBRL amount.

