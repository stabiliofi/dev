import React from "react";

import { Decimal, StabilityDeposit, StabilityDepositChange } from "@stabilio/lib-base";

import { COIN, GT } from "../../strings";
import { ActionDescription, Amount } from "../ActionDescription";

type StabilityActionDescriptionProps = {
  originalDeposit: StabilityDeposit;
  change: StabilityDepositChange<Decimal>;
};

export const StabilityActionDescription: React.FC<StabilityActionDescriptionProps> = ({
  originalDeposit,
  change
}) => {
  const collateralGain = originalDeposit.collateralGain.nonZero?.prettify(4).concat(" ETH");
  const stblReward = originalDeposit.stblReward.nonZero?.prettify().concat(" ", GT);

  return (
    <ActionDescription>
      {change.depositXBRL ? (
        <>
          Você está depositando{" "}
          <Amount>
            {change.depositXBRL.prettify()} {COIN}
          </Amount>{" "}
          no Fundo de Estabilidade
        </>
      ) : (
        <>
          Você está sacando{" "}
          <Amount>
            {change.withdrawXBRL.prettify()} {COIN}
          </Amount>{" "}
          para sua carteira
        </>
      )}
      {(collateralGain || stblReward) && (
        <>
          {" "}
          e reivindicando pelo menos{" "}
          {collateralGain && stblReward ? (
            <>
              <Amount>{collateralGain}</Amount> e <Amount>{stblReward}</Amount>
            </>
          ) : (
            <Amount>{collateralGain ?? stblReward}</Amount>
          )}
        </>
      )}
      .
    </ActionDescription>
  );
};
