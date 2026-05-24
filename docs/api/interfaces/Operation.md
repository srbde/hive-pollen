[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / Operation

# Interface: Operation

Defined in: [src/chain/operation.ts:175](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L175)

Generic Hive operation tuple.

## Remarks

Position `0` is the operation name; position `1` is the payload object. Use
the specific operation interfaces when constructing transactions so TypeScript
can validate the payload shape.

## Example

```ts
const op: Operation = ['transfer', {
  from: 'srbde',
  to: 'alice',
  amount: '1.000 HIVE',
  memo: 'Pollen'
}]
```

## Extended by

- [`AccountCreateOperation`](AccountCreateOperation.md)
- [`AccountCreateWithDelegationOperation`](AccountCreateWithDelegationOperation.md)
- [`AccountUpdateOperation`](AccountUpdateOperation.md)
- [`AccountWitnessProxyOperation`](AccountWitnessProxyOperation.md)
- [`AccountWitnessVoteOperation`](AccountWitnessVoteOperation.md)
- [`CancelTransferFromSavingsOperation`](CancelTransferFromSavingsOperation.md)
- [`ChangeRecoveryAccountOperation`](ChangeRecoveryAccountOperation.md)
- [`ClaimRewardBalanceOperation`](ClaimRewardBalanceOperation.md)
- [`ClaimAccountOperation`](ClaimAccountOperation.md)
- [`CommentOperation`](CommentOperation.md)
- [`CommentOptionsOperation`](CommentOptionsOperation.md)
- [`ConvertOperation`](ConvertOperation.md)
- [`CreateClaimedAccountOperation`](CreateClaimedAccountOperation.md)
- [`CustomOperation`](CustomOperation.md)
- [`CustomBinaryOperation`](CustomBinaryOperation.md)
- [`CustomJsonOperation`](CustomJsonOperation.md)
- [`DeclineVotingRightsOperation`](DeclineVotingRightsOperation.md)
- [`DelegateVestingSharesOperation`](DelegateVestingSharesOperation.md)
- [`DeleteCommentOperation`](DeleteCommentOperation.md)
- [`EscrowApproveOperation`](EscrowApproveOperation.md)
- [`EscrowDisputeOperation`](EscrowDisputeOperation.md)
- [`EscrowReleaseOperation`](EscrowReleaseOperation.md)
- [`EscrowTransferOperation`](EscrowTransferOperation.md)
- [`FeedPublishOperation`](FeedPublishOperation.md)
- [`LimitOrderCancelOperation`](LimitOrderCancelOperation.md)
- [`LimitOrderCreateOperation`](LimitOrderCreateOperation.md)
- [`LimitOrderCreate2Operation`](LimitOrderCreate2Operation.md)
- [`RecoverAccountOperation`](RecoverAccountOperation.md)
- [`ReportOverProductionOperation`](ReportOverProductionOperation.md)
- [`RequestAccountRecoveryOperation`](RequestAccountRecoveryOperation.md)
- [`ResetAccountOperation`](ResetAccountOperation.md)
- [`SetResetAccountOperation`](SetResetAccountOperation.md)
- [`SetWithdrawVestingRouteOperation`](SetWithdrawVestingRouteOperation.md)
- [`TransferOperation`](TransferOperation.md)
- [`TransferFromSavingsOperation`](TransferFromSavingsOperation.md)
- [`TransferToSavingsOperation`](TransferToSavingsOperation.md)
- [`TransferToVestingOperation`](TransferToVestingOperation.md)
- [`VoteOperation`](VoteOperation.md)
- [`WithdrawVestingOperation`](WithdrawVestingOperation.md)
- [`WitnessUpdateOperation`](WitnessUpdateOperation.md)
- [`WitnessSetPropertiesOperation`](WitnessSetPropertiesOperation.md)
- [`AccountUpdate2Operation`](AccountUpdate2Operation.md)
- [`CreateProposalOperation`](CreateProposalOperation.md)
- [`UpdateProposalVotesOperation`](UpdateProposalVotesOperation.md)
- [`RemoveProposalOperation`](RemoveProposalOperation.md)
- [`UpdateProposalOperation`](UpdateProposalOperation.md)
- [`CollateralizedConvertOperation`](CollateralizedConvertOperation.md)
- [`RecurrentTransferOperation`](RecurrentTransferOperation.md)

## Properties

### 0

> **0**: [`OperationName`](../type-aliases/OperationName.md) \| [`VirtualOperationName`](../type-aliases/VirtualOperationName.md)

Defined in: [src/chain/operation.ts:176](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L176)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:177](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L177)

#### Index Signature

\[`key`: `string`\]: `any`
