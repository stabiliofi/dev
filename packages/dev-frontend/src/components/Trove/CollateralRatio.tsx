import React from "react";
import { Flex, Box, Card } from "theme-ui";

import { CRITICAL_COLLATERAL_RATIO, Decimal, Difference, Percent } from "@stabilio/lib-base";

import { Icon } from "../Icon";

import { StaticRow } from "./Editor";
import { InfoIcon } from "../InfoIcon";
import { ActionDescription } from "../ActionDescription";

type CollateralRatioProps = {
  value?: Decimal;
  change?: Difference;
};

export const CollateralRatio: React.FC<CollateralRatioProps> = ({ value, change }) => {
  const collateralRatioPct = new Percent(value ?? { toString: () => "N/A" });
  const changePct = change && new Percent(change);
  return (
    <>
      <Flex>
        <Box sx={{ mt: [2, 0], ml: 3, mr: -2, fontSize: "24px" }}>
          <Icon name="heartbeat" />
        </Box>

        <StaticRow
          label="Racional de colateral"
          inputId="trove-collateral-ratio"
          amount={collateralRatioPct.prettify()}
          color={
            value?.gt(CRITICAL_COLLATERAL_RATIO)
              ? "success"
              : value?.gt(1.2)
              ? "warning"
              : value?.lte(1.2)
              ? "danger"
              : "muted"
          }
          pendingAmount={
            change?.positive?.absoluteValue?.gt(10)
              ? "++"
              : change?.negative?.absoluteValue?.gt(10)
              ? "--"
              : changePct?.nonZeroish(2)?.prettify()
          }
          pendingColor={change?.positive ? "success" : "danger"}
          infoIcon={
            <InfoIcon
              tooltip={
                <Card variant="tooltip" sx={{ width: "220px" }}>
                  O racional de proporção entre o valor em Reais do colateral e a dívida (em xBRL) que você está
                  depositando. Enquanto o racional (proporção) entre a quantidade de colateral depositado e o montande 
                  de xBRL emitidos for de 110% durante o Modo Normal de operação, recomenda-se manter o racional de 
                  colateral sempre acima de 150% para evitar liquidação quanto o sistema entrar em Modo de Rrecuperação. 
                  Um racional de colateral (proporção) acima de 200% ou 250% é recomendada para se ter uma segurança adicional.
                </Card>
              }
            />
          }
        />
      </Flex>
      {value?.lt(1.5) && (
        <ActionDescription>
          Manter seu Racional de Colateral acima de 150% pode ajudar a evitar a liquidação quando o sistema entrar no Modo de Recuperação.
        </ActionDescription>
      )}
    </>
  );
};
