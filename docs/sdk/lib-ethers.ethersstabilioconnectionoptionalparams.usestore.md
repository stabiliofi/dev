<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@stabilio/lib-ethers](./lib-ethers.md) &gt; [EthersStabilioConnectionOptionalParams](./lib-ethers.ethersstabilioconnectionoptionalparams.md) &gt; [useStore](./lib-ethers.ethersstabilioconnectionoptionalparams.usestore.md)

## EthersStabilioConnectionOptionalParams.useStore property

Create a [StabilioStore](./lib-base.stabiliostore.md) and expose it as the `store` property.

<b>Signature:</b>

```typescript
readonly useStore?: EthersStabilioStoreOption;
```

## Remarks

When set to one of the available [options](./lib-ethers.ethersstabiliostoreoption.md)<!-- -->, [ReadableEthersStabilio.connect()](./lib-ethers.readableethersstabilio.connect_1.md) will return a [ReadableEthersStabilioWithStore](./lib-ethers.readableethersstabiliowithstore.md)<!-- -->, while [EthersStabilio.connect()](./lib-ethers.ethersstabilio.connect_1.md) will return an [EthersStabilioWithStore](./lib-ethers.ethersstabiliowithstore.md)<!-- -->.

Note that the store won't start monitoring the blockchain until its [start()](./lib-base.stabiliostore.start.md) function is called.

