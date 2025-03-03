<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@stabilio/lib-ethers](./lib-ethers.md) &gt; [EthersStabilio](./lib-ethers.ethersstabilio.md) &gt; [sendSTBL](./lib-ethers.ethersstabilio.sendstbl.md)

## EthersStabilio.sendSTBL() method

Send STBL tokens to an address.

<b>Signature:</b>

```typescript
sendSTBL(toAddress: string, amount: Decimalish, overrides?: EthersTransactionOverrides): Promise<void>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  toAddress | string | Address of receipient. |
|  amount | [Decimalish](./lib-base.decimalish.md) | Amount of STBL to send. |
|  overrides | [EthersTransactionOverrides](./lib-ethers.etherstransactionoverrides.md) |  |

<b>Returns:</b>

Promise&lt;void&gt;

## Exceptions

Throws [EthersTransactionFailedError](./lib-ethers.etherstransactionfailederror.md) in case of transaction failure. Throws [EthersTransactionCancelledError](./lib-ethers.etherstransactioncancellederror.md) if the transaction is cancelled or replaced.

