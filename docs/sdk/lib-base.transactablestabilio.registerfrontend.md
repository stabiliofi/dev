<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@stabilio/lib-base](./lib-base.md) &gt; [TransactableStabilio](./lib-base.transactablestabilio.md) &gt; [registerFrontend](./lib-base.transactablestabilio.registerfrontend.md)

## TransactableStabilio.registerFrontend() method

Register current wallet address as a Stabilio frontend.

<b>Signature:</b>

```typescript
registerFrontend(kickbackRate: Decimalish): Promise<void>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  kickbackRate | [Decimalish](./lib-base.decimalish.md) | The portion of STBL rewards to pass onto users of the frontend (between 0 and 1). |

<b>Returns:</b>

Promise&lt;void&gt;

## Exceptions

Throws [TransactionFailedError](./lib-base.transactionfailederror.md) in case of transaction failure.

