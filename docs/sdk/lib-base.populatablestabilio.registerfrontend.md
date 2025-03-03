<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@stabilio/lib-base](./lib-base.md) &gt; [PopulatableStabilio](./lib-base.populatablestabilio.md) &gt; [registerFrontend](./lib-base.populatablestabilio.registerfrontend.md)

## PopulatableStabilio.registerFrontend() method

Register current wallet address as a Stabilio frontend.

<b>Signature:</b>

```typescript
registerFrontend(kickbackRate: Decimalish): Promise<PopulatedStabilioTransaction<P, SentStabilioTransaction<S, StabilioReceipt<R, void>>>>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  kickbackRate | [Decimalish](./lib-base.decimalish.md) | The portion of STBL rewards to pass onto users of the frontend (between 0 and 1). |

<b>Returns:</b>

Promise&lt;[PopulatedStabilioTransaction](./lib-base.populatedstabiliotransaction.md)<!-- -->&lt;P, [SentStabilioTransaction](./lib-base.sentstabiliotransaction.md)<!-- -->&lt;S, [StabilioReceipt](./lib-base.stabilioreceipt.md)<!-- -->&lt;R, void&gt;&gt;&gt;&gt;

