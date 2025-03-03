<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@stabilio/lib-ethers](./lib-ethers.md) &gt; [EthersStabilioConnection](./lib-ethers.ethersstabilioconnection.md)

## EthersStabilioConnection interface

Information about a connection to the Stabilio protocol.

<b>Signature:</b>

```typescript
export interface EthersStabilioConnection extends EthersStabilioConnectionOptionalParams 
```
<b>Extends:</b> [EthersStabilioConnectionOptionalParams](./lib-ethers.ethersstabilioconnectionoptionalparams.md)

## Remarks

Provided for debugging / informational purposes.

Exposed through [ReadableEthersStabilio.connection](./lib-ethers.readableethersstabilio.connection.md) and [EthersStabilio.connection](./lib-ethers.ethersstabilio.connection.md)<!-- -->.

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [addresses](./lib-ethers.ethersstabilioconnection.addresses.md) | Record&lt;string, string&gt; | A mapping of Stabilio contracts' names to their addresses. |
|  [bootstrapPeriod](./lib-ethers.ethersstabilioconnection.bootstrapperiod.md) | number | Time period (in seconds) after <code>deploymentDate</code> during which redemptions are disabled. |
|  [chainId](./lib-ethers.ethersstabilioconnection.chainid.md) | number | Chain ID of the connected network. |
|  [deploymentDate](./lib-ethers.ethersstabilioconnection.deploymentdate.md) | Date | Date when the Stabilio contracts were deployed. |
|  [provider](./lib-ethers.ethersstabilioconnection.provider.md) | [EthersProvider](./lib-ethers.ethersprovider.md) | Ethers <code>Provider</code> used for connecting to the network. |
|  [signer?](./lib-ethers.ethersstabilioconnection.signer.md) | [EthersSigner](./lib-ethers.etherssigner.md) | <i>(Optional)</i> Ethers <code>Signer</code> used for sending transactions. |
|  [startBlock](./lib-ethers.ethersstabilioconnection.startblock.md) | number | Number of block in which the first Stabilio contract was deployed. |
|  [totalStabilityPoolSTBLReward](./lib-ethers.ethersstabilioconnection.totalstabilitypoolstblreward.md) | [Decimal](./lib-base.decimal.md) | Total amount of STBL allocated for rewarding stability depositors. |
|  [version](./lib-ethers.ethersstabilioconnection.version.md) | string | Version of the Stabilio contracts (Git commit hash). |
|  [xbrlStblLiquidityMiningSTBLRewardRate](./lib-ethers.ethersstabilioconnection.xbrlstblliquidityminingstblrewardrate.md) | [Decimal](./lib-base.decimal.md) | Amount of STBL collectively rewarded to stakers of the liquidity mining pool per second. |
|  [xbrlWethLiquidityMiningSTBLRewardRate](./lib-ethers.ethersstabilioconnection.xbrlwethliquidityminingstblrewardrate.md) | [Decimal](./lib-base.decimal.md) | Amount of STBL collectively rewarded to stakers of the liquidity mining pool per second. |

