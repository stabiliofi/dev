import React from "react";
import { Heading, Box, Card } from "theme-ui";

import {
  Percent,
  Difference,
  Decimalish,
  Decimal,
  Trove,
  StabilioStoreState,
  XBRL_LIQUIDATION_RESERVE
} from "@stabilio/lib-base";
import { useStabilioSelector } from "@stabilio/lib-react";

import { COIN } from "../../strings";

import { StaticRow } from "./Editor";
import { LoadingOverlay } from "../LoadingOverlay";
import { CollateralRatio } from "./CollateralRatio";
import { InfoIcon } from "../InfoIcon";

type TroveEditorProps = {
  original: Trove;
  edited: Trove;
  fee: Decimal;
  borrowingRate: Decimal;
  changePending: boolean;
  dispatch: (
    action: { type: "setCollateral" | "setDebt"; newValue: Decimalish } | { type: "revert" }
  ) => void;
};

const select = ({ price }: StabilioStoreState) => ({ price });

export const TroveEditor: React.FC<TroveEditorProps> = ({
  children,
  original,
  edited,
  fee,
  borrowingRate,
  changePending
}) => {
  const { price } = useStabilioSelector(select);

  const feePct = new Percent(borrowingRate);

  const originalCollateralRatio = !original.isEmpty ? original.collateralRatio(price) : undefined;
  const collateralRatio = !edited.isEmpty ? edited.collateralRatio(price) : undefined;
  const collateralRatioChange = Difference.between(collateralRatio, originalCollateralRatio);

  return (
    <Card>
      <Heading>Depósito</Heading>

      <Box sx={{ p: [2, 3] }}>
        <StaticRow
          label="Colateral"
          inputId="trove-collateral"
          amount={edited.collateral.prettify(4)}
          unit="ETH"
        />

        <StaticRow label="Dívida" inputId="trove-debt" amount={edited.debt.prettify()} unit={COIN} />

        {original.isEmpty && (
          <StaticRow
            label="Reserva de Liquidação"
            inputId="trove-liquidation-reserve"
            amount={`${XBRL_LIQUIDATION_RESERVE}`}
            unit={COIN}
            infoIcon={
              <InfoIcon
                tooltip={
                  <Card variant="tooltip" sx={{ width: "200px" }}>
                   Uma quantia reservada para cobrir os custos de gás do usuário que realizar a liquidação
                  se o seu Depósito precisar ser liquidado. O valor aumenta sua dívida e é reembolsado se 
                  você fechar seu Depósito quitando integralmente sua dívida líquida.
                  </Card>
                }
              />
            }
          />
        )}

        <StaticRow
          label="Taxa de empréstimo"
          inputId="trove-borrowing-fee"
          amount={fee.toString(2)}
          pendingAmount={feePct.toString(2)}
          unit={COIN}
          infoIcon={
            <InfoIcon
              tooltip={
                <Card variant="tooltip" sx={{ width: "240px" }}>
                  Este montante é deduzido do montante emprestado como uma taxa única. Não há
                  taxas recorrentes para empréstimos, que são, portanto, sem juros.
                </Card>
              }
            />
          }
        />

        <CollateralRatio value={collateralRatio} change={collateralRatioChange} />

        {children}
      </Box>

      {changePending && <LoadingOverlay />}
    </Card>
  );
};
