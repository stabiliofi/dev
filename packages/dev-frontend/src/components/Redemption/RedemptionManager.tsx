import React, { useEffect, useState } from "react";
import { Button, Box, Flex, Card, Heading } from "theme-ui";

import { Decimal, Percent, StabilioStoreState, MINIMUM_COLLATERAL_RATIO } from "@stabilio/lib-base";
import { useStabilioSelector } from "@stabilio/lib-react";

import { COIN } from "../../strings";

import { Icon } from "../Icon";
import { LoadingOverlay } from "../LoadingOverlay";
import { EditableRow, StaticRow } from "../Trove/Editor";
import { ActionDescription, Amount } from "../ActionDescription";
import { ErrorDescription } from "../ErrorDescription";
import { useMyTransactionState } from "../Transaction";

import { RedemptionAction } from "./RedemptionAction";
import { InfoIcon } from "../InfoIcon";

const mcrPercent = new Percent(MINIMUM_COLLATERAL_RATIO).toString(0);

const select = ({ price, fees, total, xbrlBalance }: StabilioStoreState) => ({
  price,
  fees,
  total,
  xbrlBalance
});

const transactionId = "redemption";

export const RedemptionManager: React.FC = () => {
  const { price, fees, total, xbrlBalance } = useStabilioSelector(select);
  const [xbrlAmount, setXBRLAmount] = useState(Decimal.ZERO);
  const [changePending, setChangePending] = useState(false);
  const editingState = useState<string>();

  const dirty = !xbrlAmount.isZero;
  const ethAmount = xbrlAmount.div(price);
  const redemptionRate = fees.redemptionRate(xbrlAmount.div(total.debt));
  const feePct = new Percent(redemptionRate);
  const ethFee = ethAmount.mul(redemptionRate);
  const maxRedemptionRate = redemptionRate.add(0.001); // TODO slippage tolerance

  const myTransactionState = useMyTransactionState(transactionId);

  useEffect(() => {
    if (
      myTransactionState.type === "waitingForApproval" ||
      myTransactionState.type === "waitingForConfirmation"
    ) {
      setChangePending(true);
    } else if (myTransactionState.type === "failed" || myTransactionState.type === "cancelled") {
      setChangePending(false);
    } else if (myTransactionState.type === "confirmed") {
      setXBRLAmount(Decimal.ZERO);
      setChangePending(false);
    }
  }, [myTransactionState.type, setChangePending, setXBRLAmount]);

  const [canRedeem, description] = total.collateralRatioIsBelowMinimum(price)
    ? [
        false,
        <ErrorDescription>
          Você não pode resgatar colaterais por seus xBRL quando o racional de colateral total for menor que{" "}
          <Amount>{mcrPercent}</Amount>. Por favor, tente novamente mais tarde.
        </ErrorDescription>
      ]
    : xbrlAmount.gt(xbrlBalance)
    ? [
        false,
        <ErrorDescription>
          O valor que você está tentando resgatar excede seu saldo em{" "}
          <Amount>
            {xbrlAmount.sub(xbrlBalance).prettify()} {COIN}
          </Amount>
          .
        </ErrorDescription>
      ]
    : [
        true,
        <ActionDescription>
          Você receberá<Amount>{ethAmount.sub(ethFee).prettify(4)} ETH</Amount> em troca de{" "}
          <Amount>
            {xbrlAmount.prettify()} {COIN}
          </Amount>
          .
        </ActionDescription>
      ];

  return (
    <Card>
      <Heading>
        Resgatar
        {dirty && !changePending && (
          <Button
            variant="titleIcon"
            sx={{ ":enabled:hover": { color: "danger" } }}
            onClick={() => setXBRLAmount(Decimal.ZERO)}
          >
            <Icon name="history" size="lg" />
          </Button>
        )}
      </Heading>

      <Box sx={{ p: [2, 3] }}>
        <EditableRow
          label="Resgate de Colaterais"
          inputId="redeem-xbrl"
          amount={xbrlAmount.prettify()}
          maxAmount={xbrlBalance.toString()}
          maxedOut={xbrlAmount.eq(xbrlBalance)}
          unit={COIN}
          {...{ editingState }}
          editedAmount={xbrlAmount.toString(2)}
          setEditedAmount={amount => setXBRLAmount(Decimal.from(amount))}
        />

        <StaticRow
          label="Taxa de Resgate"
          inputId="redeem-fee"
          amount={ethFee.toString(4)}
          pendingAmount={feePct.toString(2)}
          unit="ETH"
          infoIcon={
            <InfoIcon
              tooltip={
                <Card variant="tooltip" sx={{ minWidth: "240px" }}>
                  A Taxa de Resgate é cobrada como uma porcentagem do Ether resgatado.
                  A Taxa de Resgate depende dos volumes de resgate e é de 0,5% no mínimo.
                </Card>
              }
            />
          }
        />

        {((dirty || !canRedeem) && description) || (
          <ActionDescription>Insira o valor de {COIN} que você deseja depositar para resgatar por ETH.</ActionDescription>
        )}

        <Flex variant="layout.actions">
          <RedemptionAction
            transactionId={transactionId}
            disabled={!dirty || !canRedeem}
            xbrlAmount={xbrlAmount}
            maxRedemptionRate={maxRedemptionRate}
          />
        </Flex>
      </Box>

      {changePending && <LoadingOverlay />}
    </Card>
  );
};
