<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@stabilio/lib-base](./lib-base.md) &gt; [STBLStake](./lib-base.stblstake.md)

## STBLStake class

Represents a user's STBL stake and accrued gains.

<b>Signature:</b>

```typescript
export declare class STBLStake 
```

## Remarks

Returned by the [getSTBLStake()](./lib-base.readablestabilio.getstblstake.md) function.

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `STBLStake` class.

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [collateralGain](./lib-base.stblstake.collateralgain.md) |  | [Decimal](./lib-base.decimal.md) | Collateral gain available to withdraw. |
|  [isEmpty](./lib-base.stblstake.isempty.md) |  | boolean |  |
|  [stakedSTBL](./lib-base.stblstake.stakedstbl.md) |  | [Decimal](./lib-base.decimal.md) | The amount of STBL that's staked. |
|  [xbrlGain](./lib-base.stblstake.xbrlgain.md) |  | [Decimal](./lib-base.decimal.md) | XBRL gain available to withdraw. |

## Methods

|  Method | Modifiers | Description |
|  --- | --- | --- |
|  [apply(change)](./lib-base.stblstake.apply.md) |  | Apply a [STBLStakeChange](./lib-base.stblstakechange.md) to this <code>STBLStake</code>. |
|  [equals(that)](./lib-base.stblstake.equals.md) |  | Compare to another instance of <code>STBLStake</code>. |
|  [whatChanged(thatStakedSTBL)](./lib-base.stblstake.whatchanged.md) |  | Calculate the difference between this <code>STBLStake</code> and <code>thatStakedSTBL</code>. |

