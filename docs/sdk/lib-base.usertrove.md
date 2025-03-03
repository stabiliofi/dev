<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@stabilio/lib-base](./lib-base.md) &gt; [UserTrove](./lib-base.usertrove.md)

## UserTrove class

A Trove that is associated with a single owner.

<b>Signature:</b>

```typescript
export declare class UserTrove extends Trove 
```
<b>Extends:</b> [Trove](./lib-base.trove.md)

## Remarks

The SDK uses the base [Trove](./lib-base.trove.md) class as a generic container of collateral and debt, for example to represent the [total collateral and debt](./lib-base.readablestabilio.gettotal.md) locked up in the protocol.

The `UserTrove` class extends `Trove` with extra information that's only available for Troves that are associated with a single owner (such as the owner's address, or the Trove's status).

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `UserTrove` class.

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [ownerAddress](./lib-base.usertrove.owneraddress.md) |  | string | Address that owns this Trove. |
|  [status](./lib-base.usertrove.status.md) |  | [UserTroveStatus](./lib-base.usertrovestatus.md) | Provides more information when the UserTrove is empty. |

## Methods

|  Method | Modifiers | Description |
|  --- | --- | --- |
|  [equals(that)](./lib-base.usertrove.equals.md) |  |  |

