<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@stabilio/lib-base](./lib-base.md) &gt; [SendableStabilio](./lib-base.sendablestabilio.md)

## SendableStabilio interface

Send Stabilio transactions.

<b>Signature:</b>

```typescript
export interface SendableStabilio<R = unknown, S = unknown> extends _SendableFrom<TransactableStabilio, R, S> 
```
<b>Extends:</b> \_SendableFrom&lt;[TransactableStabilio](./lib-base.transactablestabilio.md)<!-- -->, R, S&gt;

## Remarks

The functions return an object implementing [SentStabilioTransaction](./lib-base.sentstabiliotransaction.md)<!-- -->, which can be used to monitor the transaction and get its details when it succeeds.

Implemented by [SendableEthersStabilio](./lib-ethers.sendableethersstabilio.md)<!-- -->.

## Methods

|  Method | Description |
|  --- | --- |
|  [adjustTrove(params, maxBorrowingRate)](./lib-base.sendablestabilio.adjusttrove.md) | Adjust existing Trove by changing its collateral, debt, or both. |
|  [approveXbrlStblUniTokens(allowance)](./lib-base.sendablestabilio.approvexbrlstblunitokens.md) | Allow the liquidity mining contract to use Uniswap XBRL/STBL LP tokens for [staking](./lib-base.transactablestabilio.stakexbrlstblunitokens.md)<!-- -->. |
|  [approveXbrlWethUniTokens(allowance)](./lib-base.sendablestabilio.approvexbrlwethunitokens.md) | Allow the liquidity mining contract to use Uniswap XBRL/ETH LP tokens for [staking](./lib-base.transactablestabilio.stakexbrlwethunitokens.md)<!-- -->. |
|  [borrowXBRL(amount, maxBorrowingRate)](./lib-base.sendablestabilio.borrowxbrl.md) | Adjust existing Trove by borrowing more XBRL. |
|  [claimCollateralSurplus()](./lib-base.sendablestabilio.claimcollateralsurplus.md) | Claim leftover collateral after a liquidation or redemption. |
|  [closeTrove()](./lib-base.sendablestabilio.closetrove.md) | Close existing Trove by repaying all debt and withdrawing all collateral. |
|  [depositCollateral(amount)](./lib-base.sendablestabilio.depositcollateral.md) | Adjust existing Trove by depositing more collateral. |
|  [depositXBRLInStabilityPool(amount, frontendTag)](./lib-base.sendablestabilio.depositxbrlinstabilitypool.md) | Make a new Stability Deposit, or top up existing one. |
|  [exitXbrlStblLiquidityMining()](./lib-base.sendablestabilio.exitxbrlstblliquiditymining.md) | Withdraw all staked LP tokens from liquidity mining and claim reward. |
|  [exitXbrlWethLiquidityMining()](./lib-base.sendablestabilio.exitxbrlwethliquiditymining.md) | Withdraw all staked LP tokens from liquidity mining and claim reward. |
|  [liquidate(address)](./lib-base.sendablestabilio.liquidate.md) | Liquidate one or more undercollateralized Troves. |
|  [liquidateUpTo(maximumNumberOfTrovesToLiquidate)](./lib-base.sendablestabilio.liquidateupto.md) | Liquidate the least collateralized Troves up to a maximum number. |
|  [openTrove(params, maxBorrowingRate)](./lib-base.sendablestabilio.opentrove.md) | Open a new Trove by depositing collateral and borrowing XBRL. |
|  [redeemXBRL(amount, maxRedemptionRate)](./lib-base.sendablestabilio.redeemxbrl.md) | Redeem XBRL to native currency (e.g. Ether) at face value. |
|  [registerFrontend(kickbackRate)](./lib-base.sendablestabilio.registerfrontend.md) | Register current wallet address as a Stabilio frontend. |
|  [repayXBRL(amount)](./lib-base.sendablestabilio.repayxbrl.md) | Adjust existing Trove by repaying some of its debt. |
|  [sendSTBL(toAddress, amount)](./lib-base.sendablestabilio.sendstbl.md) | Send STBL tokens to an address. |
|  [sendXBRL(toAddress, amount)](./lib-base.sendablestabilio.sendxbrl.md) | Send XBRL tokens to an address. |
|  [stakeSTBL(amount)](./lib-base.sendablestabilio.stakestbl.md) | Stake STBL to start earning fee revenue or increase existing stake. |
|  [stakeXbrlStblUniTokens(amount)](./lib-base.sendablestabilio.stakexbrlstblunitokens.md) | Stake Uniswap XBRL/STBL LP tokens to participate in liquidity mining and earn STBL. |
|  [stakeXbrlWethUniTokens(amount)](./lib-base.sendablestabilio.stakexbrlwethunitokens.md) | Stake Uniswap XBRL/ETH LP tokens to participate in liquidity mining and earn STBL. |
|  [transferCollateralGainToTrove()](./lib-base.sendablestabilio.transfercollateralgaintotrove.md) | Transfer [collateral gain](./lib-base.stabilitydeposit.collateralgain.md) from Stability Deposit to Trove. |
|  [unstakeSTBL(amount)](./lib-base.sendablestabilio.unstakestbl.md) | Withdraw STBL from staking. |
|  [unstakeXbrlStblUniTokens(amount)](./lib-base.sendablestabilio.unstakexbrlstblunitokens.md) | Withdraw Uniswap XBRL/STBL LP tokens from liquidity mining. |
|  [unstakeXbrlWethUniTokens(amount)](./lib-base.sendablestabilio.unstakexbrlwethunitokens.md) | Withdraw Uniswap XBRL/ETH LP tokens from liquidity mining. |
|  [withdrawCollateral(amount)](./lib-base.sendablestabilio.withdrawcollateral.md) | Adjust existing Trove by withdrawing some of its collateral. |
|  [withdrawGainsFromStabilityPool()](./lib-base.sendablestabilio.withdrawgainsfromstabilitypool.md) | Withdraw [collateral gain](./lib-base.stabilitydeposit.collateralgain.md) and [STBL reward](./lib-base.stabilitydeposit.stblreward.md) from Stability Deposit. |
|  [withdrawGainsFromStaking()](./lib-base.sendablestabilio.withdrawgainsfromstaking.md) | Withdraw [collateral gain](./lib-base.stblstake.collateralgain.md) and [XBRL gain](./lib-base.stblstake.xbrlgain.md) from STBL stake. |
|  [withdrawSTBLRewardFromXbrlStblLiquidityMining()](./lib-base.sendablestabilio.withdrawstblrewardfromxbrlstblliquiditymining.md) | Withdraw STBL that has been earned by mining liquidity. |
|  [withdrawSTBLRewardFromXbrlWethLiquidityMining()](./lib-base.sendablestabilio.withdrawstblrewardfromxbrlwethliquiditymining.md) | Withdraw STBL that has been earned by mining liquidity. |
|  [withdrawXBRLFromStabilityPool(amount)](./lib-base.sendablestabilio.withdrawxbrlfromstabilitypool.md) | Withdraw XBRL from Stability Deposit. |

