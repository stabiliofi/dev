import {
  Decimal,
  StabilioStoreState,
  StabilityDeposit,
  StabilityDepositChange
} from "@stabilio/lib-base";

import { COIN } from "../../../strings";
import { Amount } from "../../ActionDescription";
import { ErrorDescription } from "../../ErrorDescription";
import { StabilityActionDescription } from "../StabilityActionDescription";

export const selectForStabilityDepositChangeValidation = ({
  trove,
  xbrlBalance,
  ownFrontend,
  haveUndercollateralizedTroves
}: StabilioStoreState) => ({
  trove,
  xbrlBalance,
  haveOwnFrontend: ownFrontend.status === "registered",
  haveUndercollateralizedTroves
});

type StabilityDepositChangeValidationContext = ReturnType<
  typeof selectForStabilityDepositChangeValidation
>;

export const validateStabilityDepositChange = (
  originalDeposit: StabilityDeposit,
  editedXBRL: Decimal,
  {
    xbrlBalance,
    haveOwnFrontend,
    haveUndercollateralizedTroves
  }: StabilityDepositChangeValidationContext
): [
  validChange: StabilityDepositChange<Decimal> | undefined,
  description: JSX.Element | undefined
] => {
  const change = originalDeposit.whatChanged(editedXBRL);

  if (haveOwnFrontend) {
    return [
      undefined,
      <ErrorDescription>
        Você não pode depositar usando um endereço de carteira registrado como operador de frontend.
      </ErrorDescription>
    ];
  }

  if (!change) {
    return [undefined, undefined];
  }

  if (change.depositXBRL?.gt(xbrlBalance)) {
    return [
      undefined,
      <ErrorDescription>
        O valor que você está tentando depositar excede seu saldo em{" "}
        <Amount>
          {change.depositXBRL.sub(xbrlBalance).prettify()} {COIN}
        </Amount>
        .
      </ErrorDescription>
    ];
  }

  if (change.withdrawXBRL && haveUndercollateralizedTroves) {
    return [
      undefined,
      <ErrorDescription>
        Você não pode sacar xBRL do seu Depósito de Estabilidade quando houver
        Depósitos subcolateralizados (Abaixo do racional mínimo de colateral determinado). 
        Liquide esses Depósitos ou tente novamente mais tarde.
      </ErrorDescription>
    ];
  }

  return [change, <StabilityActionDescription originalDeposit={originalDeposit} change={change} />];
};
