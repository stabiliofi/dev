import React, { useCallback, useState } from "react";
import { Heading, Box, Flex, Card, Button } from "theme-ui";
import { Decimal, StabilioStoreState } from "@stabilio/lib-base";
import { LP } from "../../../../strings";
import { Icon } from "../../../Icon";
import { EditableRow, StaticRow } from "../../../Trove/Editor";
import { LoadingOverlay } from "../../../LoadingOverlay";
import { useFarmView } from "../../context/FarmViewContext";
import { useMyTransactionState } from "../../../Transaction";
import { Confirm } from "../Confirm";
import { Description } from "../Description";
import { Approve } from "../Approve";
import { Validation } from "../Validation";
import { useValidationState } from "../../context/useValidationState";
import { useStabilioSelector } from "@stabilio/lib-react";

const transactionId = /farm-/;
const selector = ({ totalStakedXbrlWethUniTokens }: StabilioStoreState) => ({ totalStakedXbrlWethUniTokens });

export const Staking: React.FC = () => {
  const { dispatchEvent } = useFarmView();
  const { totalStakedXbrlWethUniTokens } = useStabilioSelector(selector);

  const [amount, setAmount] = useState<Decimal>(Decimal.from(0));
  const editingState = useState<string>();
  const isDirty = !amount.isZero;

  const { maximumStake, hasSetMaximumStake } = useValidationState(amount);

  const transactionState = useMyTransactionState(transactionId);
  const isTransactionPending =
    transactionState.type === "waitingForApproval" ||
    transactionState.type === "waitingForConfirmation";

  const handleCancelPressed = useCallback(() => {
    dispatchEvent("CANCEL_PRESSED");
  }, [dispatchEvent]);

  const nextTotalStakedUniTokens = totalStakedXbrlWethUniTokens.add(amount);

  const poolShare = amount.mulDiv(100, nextTotalStakedUniTokens);

  return (
    <Card>
      <Flex sx={{ justifyContent: "space-between", width: "100%", px: [2, 3], pt: 3, pb: 2 }}>
        <Heading sx={{ fontSize: 16  }}>
          ETH/xBRL Uniswap LP
        </Heading>
        {isDirty && !isTransactionPending && (
          <Button
            variant="titleIcon"
            sx={{ ":enabled:hover": { color: "danger" } }}
            onClick={() => setAmount(Decimal.from(0))}
          >
            <Icon name="history" size="lg" />
          </Button>
        )}
      </Flex>

      <Box sx={{ p: [2, 3] }}>
        <EditableRow
          label="Stake"
          inputId="amount-lp"
          amount={amount.prettify(4)}
          unit={LP}
          editingState={editingState}
          editedAmount={amount.toString(4)}
          setEditedAmount={amount => setAmount(Decimal.from(amount))}
          maxAmount={maximumStake.toString()}
          maxedOut={hasSetMaximumStake}
        ></EditableRow>

        {poolShare.infinite ? (
          <StaticRow label="Pool share" inputId="farm-share" amount="N/A" />
        ) : (
          <StaticRow
            label="Pool share"
            inputId="farm-share"
            amount={poolShare.prettify(4)}
            unit="%"
          />
        )}

        {isDirty && <Validation amount={amount} />}
        <Description amount={amount} />

        <Flex variant="layout.actions">
          <Button variant="cancel" onClick={handleCancelPressed}>
            Cancel
          </Button>
          <Approve amount={amount} />
          <Confirm amount={amount} />
        </Flex>
      </Box>
      {isTransactionPending && <LoadingOverlay />}
    </Card>
  );
};
