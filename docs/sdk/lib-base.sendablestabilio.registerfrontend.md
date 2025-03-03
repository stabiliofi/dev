<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@stabilio/lib-base](./lib-base.md) &gt; [SendableStabilio](./lib-base.sendablestabilio.md) &gt; [registerFrontend](./lib-base.sendablestabilio.registerfrontend.md)

## SendableStabilio.registerFrontend() method

Register current wallet address as a Stabilio frontend.

<b>Signature:</b>

```typescript
registerFrontend(kickbackRate: Decimalish): Promise<SentStabilioTransaction<S, StabilioReceipt<R, void>>>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  kickbackRate | [Decimalish](./lib-base.decimalish.md) | The portion of STBL rewards to pass onto users of the frontend (between 0 and 1). |

<b>Returns:</b>

Promise&lt;[SentStabilioTransaction](./lib-base.sentstabiliotransaction.md)<!-- -->&lt;S, [StabilioReceipt](./lib-base.stabilioreceipt.md)<!-- -->&lt;R, void&gt;&gt;&gt;

