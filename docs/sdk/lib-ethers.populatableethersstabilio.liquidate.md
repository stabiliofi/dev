<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@stabilio/lib-ethers](./lib-ethers.md) &gt; [PopulatableEthersStabilio](./lib-ethers.populatableethersstabilio.md) &gt; [liquidate](./lib-ethers.populatableethersstabilio.liquidate.md)

## PopulatableEthersStabilio.liquidate() method

Liquidate one or more undercollateralized Troves.

<b>Signature:</b>

```typescript
liquidate(address: string | string[], overrides?: EthersTransactionOverrides): Promise<PopulatedEthersStabilioTransaction<LiquidationDetails>>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  address | string \| string\[\] | Address or array of addresses whose Troves to liquidate. |
|  overrides | [EthersTransactionOverrides](./lib-ethers.etherstransactionoverrides.md) |  |

<b>Returns:</b>

Promise&lt;[PopulatedEthersStabilioTransaction](./lib-ethers.populatedethersstabiliotransaction.md)<!-- -->&lt;[LiquidationDetails](./lib-base.liquidationdetails.md)<!-- -->&gt;&gt;

