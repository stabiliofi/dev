import React, { useState } from "react";
import { Heading, Box, Card, Button } from "theme-ui";

import {
  Decimal,
  Decimalish,
  StabilityDeposit,
  StabilioStoreState,
  Difference
} from "@stabilio/lib-base";

import { useStabilioSelector } from "@stabilio/lib-react";

import { COIN, GT } from "../../strings";

import { Icon } from "../Icon";
import { EditableRow, StaticRow } from "../Trove/Editor";
import { LoadingOverlay } from "../LoadingOverlay";
import { InfoIcon } from "../InfoIcon";

const select = ({ xbrlBalance, xbrlInStabilityPool }: StabilioStoreState) => ({
  xbrlBalance,
  xbrlInStabilityPool
});

type StabilityDepositEditorProps = {
  originalDeposit: StabilityDeposit;
  editedXBRL: Decimal;
  changePending: boolean;
  dispatch: (action: { type: "setDeposit"; newValue: Decimalish } | { type: "revert" }) => void;
};

export const StabilityDepositEditor: React.FC<StabilityDepositEditorProps> = ({
  originalDeposit,
  editedXBRL,
  changePending,
  dispatch,
  children
}) => {
  const { xbrlBalance, xbrlInStabilityPool } = useStabilioSelector(select);
  const editingState = useState<string>();

  const edited = !editedXBRL.eq(originalDeposit.currentXBRL);

  const maxAmount = originalDeposit.currentXBRL.add(xbrlBalance);
  const maxedOut = editedXBRL.eq(maxAmount);

  const xbrlInStabilityPoolAfterChange = xbrlInStabilityPool
    .sub(originalDeposit.currentXBRL)
    .add(editedXBRL);

  const originalPoolShare = originalDeposit.currentXBRL.mulDiv(100, xbrlInStabilityPool);
  const newPoolShare = editedXBRL.mulDiv(100, xbrlInStabilityPoolAfterChange);
  const poolShareChange =
    originalDeposit.currentXBRL.nonZero &&
    Difference.between(newPoolShare, originalPoolShare).nonZero;

  return (
    <Card>
      <Heading>
        Fundo de Estabilidade
        {edited && !changePending && (
          <Button
            variant="titleIcon"
            sx={{ ":enabled:hover": { color: "danger" } }}
            onClick={() => dispatch({ type: "revert" })}
          >
            <Icon name="history" size="lg" />
          </Button>
        )}
      </Heading>

      <Box sx={{ p: [2, 3] }}>
        <EditableRow
          label="Depósito"
          inputId="deposit-stbl"
          amount={editedXBRL.prettify()}
          maxAmount={maxAmount.toString()}
          maxedOut={maxedOut}
          unit={COIN}
          {...{ editingState }}
          editedAmount={editedXBRL.toString(2)}
          setEditedAmount={newValue => dispatch({ type: "setDeposit", newValue })}
        />

        {newPoolShare.infinite ? (
          <StaticRow label="Sua proporção no fundo" inputId="deposit-share" amount="N/A" />
        ) : (
          <StaticRow
            label="Sua proporção no fundo"
            inputId="deposit-share"
            amount={newPoolShare.prettify(4)}
            pendingAmount={poolShareChange?.prettify(4).concat("%")}
            pendingColor={poolShareChange?.positive ? "success" : "danger"}
            unit="%"
          />
        )}

        {!originalDeposit.isEmpty && (
          <>
            <StaticRow
              label="Ganhos de liquidações"
              inputId="deposit-gain"
              amount={originalDeposit.collateralGain.prettify(4)}
              color={originalDeposit.collateralGain.nonZero && "success"}
              unit="ETH"
            />

            <StaticRow
              label="Recompensa"
              inputId="deposit-reward"
              amount={originalDeposit.stblReward.prettify()}
              color={originalDeposit.stblReward.nonZero && "success"}
              unit={GT}
              infoIcon={
                <InfoIcon
                  tooltip={
                    <Card variant="tooltip" sx={{ width: "240px" }}>
                      Embora as recompensas de STBL sejam acumuladas a cada minuto, o valor na interface do usuário é atualizado apenas
                      quando um usuário faz transações no Fundo de Estabilidade. Portanto, você pode receber mais
                      recompensas do que é exibido quando você reivindica ou ajusta seu depósito.
                    </Card>
                  }
                />
              }
            />
          </>
        )}
        {children}
      </Box>

      {changePending && <LoadingOverlay />}
    </Card>
  );
};
