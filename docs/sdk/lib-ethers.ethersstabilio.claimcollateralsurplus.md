<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@stabilio/lib-ethers](./lib-ethers.md) &gt; [EthersStabilio](./lib-ethers.ethersstabilio.md) &gt; [claimCollateralSurplus](./lib-ethers.ethersstabilio.claimcollateralsurplus.md)

## EthersStabilio.claimCollateralSurplus() method

Claim leftover collateral after a liquidation or redemption.

<b>Signature:</b>

```typescript
claimCollateralSurplus(overrides?: EthersTransactionOverrides): Promise<void>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  overrides | [EthersTransactionOverrides](./lib-ethers.etherstransactionoverrides.md) |  |

<b>Returns:</b>

Promise&lt;void&gt;

## Exceptions

Throws [EthersTransactionFailedError](./lib-ethers.etherstransactionfailederror.md) in case of transaction failure. Throws [EthersTransactionCancelledError](./lib-ethers.etherstransactioncancellederror.md) if the transaction is cancelled or replaced.

## Remarks

Use [getCollateralSurplusBalance()](./lib-base.readablestabilio.getcollateralsurplusbalance.md) to check the amount of collateral available for withdrawal.

