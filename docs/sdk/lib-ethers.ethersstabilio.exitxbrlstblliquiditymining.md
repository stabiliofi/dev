<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@stabilio/lib-ethers](./lib-ethers.md) &gt; [EthersStabilio](./lib-ethers.ethersstabilio.md) &gt; [exitXbrlStblLiquidityMining](./lib-ethers.ethersstabilio.exitxbrlstblliquiditymining.md)

## EthersStabilio.exitXbrlStblLiquidityMining() method

Withdraw all staked LP tokens from liquidity mining and claim reward.

<b>Signature:</b>

```typescript
exitXbrlStblLiquidityMining(overrides?: EthersTransactionOverrides): Promise<void>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  overrides | [EthersTransactionOverrides](./lib-ethers.etherstransactionoverrides.md) |  |

<b>Returns:</b>

Promise&lt;void&gt;

## Exceptions

Throws [EthersTransactionFailedError](./lib-ethers.etherstransactionfailederror.md) in case of transaction failure. Throws [EthersTransactionCancelledError](./lib-ethers.etherstransactioncancellederror.md) if the transaction is cancelled or replaced.

