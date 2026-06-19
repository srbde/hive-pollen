[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / OperationTuple

# Interface: OperationTuple

Defined in: [src/chain/operation.ts:184](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L184)

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
- [`FillConvertRequestOperation`](FillConvertRequestOperation.md)
- [`AuthorRewardOperation`](AuthorRewardOperation.md)
- [`CurationRewardOperation`](CurationRewardOperation.md)
- [`CommentRewardOperation`](CommentRewardOperation.md)
- [`LiquidityRewardOperation`](LiquidityRewardOperation.md)
- [`InterestOperation`](InterestOperation.md)
- [`FillVestingWithdrawOperation`](FillVestingWithdrawOperation.md)
- [`FillOrderOperation`](FillOrderOperation.md)
- [`ShutdownWitnessOperation`](ShutdownWitnessOperation.md)
- [`FillTransferFromSavingsOperation`](FillTransferFromSavingsOperation.md)
- [`HardforkOperation`](HardforkOperation.md)
- [`CommentPayoutUpdateOperation`](CommentPayoutUpdateOperation.md)
- [`ReturnVestingDelegationOperation`](ReturnVestingDelegationOperation.md)
- [`CommentBenefactorRewardOperation`](CommentBenefactorRewardOperation.md)
- [`ProducerRewardOperation`](ProducerRewardOperation.md)
- [`ClearNullAccountBalanceOperation`](ClearNullAccountBalanceOperation.md)
- [`ProposalPayOperation`](ProposalPayOperation.md)
- [`SpsFundOperation`](SpsFundOperation.md)
- [`HardforkHiveOperation`](HardforkHiveOperation.md)
- [`HardforkHiveRestoreOperation`](HardforkHiveRestoreOperation.md)
- [`DelayedVotingOperation`](DelayedVotingOperation.md)
- [`ConsolidateTreasuryBalanceOperation`](ConsolidateTreasuryBalanceOperation.md)
- [`EffectiveCommentVoteOperation`](EffectiveCommentVoteOperation.md)
- [`IneffectiveDeleteCommentOperation`](IneffectiveDeleteCommentOperation.md)
- [`SpsConvertOperation`](SpsConvertOperation.md)
- [`ExpiredAccountNotificationOperation`](ExpiredAccountNotificationOperation.md)
- [`ChangedRecoveryAccountOperation`](ChangedRecoveryAccountOperation.md)
- [`TransferToVestingCompletedOperation`](TransferToVestingCompletedOperation.md)
- [`PowRewardOperation`](PowRewardOperation.md)
- [`VestingSharesSplitOperation`](VestingSharesSplitOperation.md)
- [`AccountCreatedOperation`](AccountCreatedOperation.md)
- [`FillCollateralizedConvertRequestOperation`](FillCollateralizedConvertRequestOperation.md)
- [`SystemWarningOperation`](SystemWarningOperation.md)
- [`FillRecurrentTransferOperation`](FillRecurrentTransferOperation.md)
- [`FailedRecurrentTransferOperation`](FailedRecurrentTransferOperation.md)
- [`LimitOrderCancelledOperation`](LimitOrderCancelledOperation.md)
- [`ProducerMissedOperation`](ProducerMissedOperation.md)
- [`ProposalFeeOperation`](ProposalFeeOperation.md)
- [`CollateralizedConvertImmediateConversionOperation`](CollateralizedConvertImmediateConversionOperation.md)
- [`EscrowApprovedOperation`](EscrowApprovedOperation.md)
- [`EscrowRejectedOperation`](EscrowRejectedOperation.md)
- [`ProxyClearedOperation`](ProxyClearedOperation.md)
- [`DeclinedVotingRightsOperation`](DeclinedVotingRightsOperation.md)

## Properties

### 0

> **0**: [`OperationName`](../type-aliases/OperationName.md) \| [`VirtualOperationName`](../type-aliases/VirtualOperationName.md)

Defined in: [src/chain/operation.ts:185](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L185)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:186](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L186)

#### Index Signature

\[`key`: `string`\]: `any`
