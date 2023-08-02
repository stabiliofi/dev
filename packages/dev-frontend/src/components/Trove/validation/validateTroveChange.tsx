import {
  Decimal,
  XBRL_MINIMUM_DEBT,
  XBRL_MINIMUM_NET_DEBT,
  Trove,
  TroveAdjustmentParams,
  TroveChange,
  Percent,
  MINIMUM_COLLATERAL_RATIO,
  CRITICAL_COLLATERAL_RATIO,
  StabilioStoreState,
  TroveClosureParams,
  TroveCreationParams
} from "@stabilio/lib-base";

import { COIN } from "../../../strings";

import { ActionDescription, Amount } from "../../ActionDescription";
import { ErrorDescription } from "../../ErrorDescription";

const mcrPercent = new Percent(MINIMUM_COLLATERAL_RATIO).toString(0);
const ccrPercent = new Percent(CRITICAL_COLLATERAL_RATIO).toString(0);

type TroveAdjustmentDescriptionParams = {
  params: TroveAdjustmentParams<Decimal>;
};

const TroveChangeDescription: React.FC<TroveAdjustmentDescriptionParams> = ({ params }) => (
  <ActionDescription>
    {params.depositCollateral && params.borrowXBRL ? (
      <>
        Você vai depositar <Amount>{params.depositCollateral.prettify()} ETH</Amount> e receber{" "}
        <Amount>
          {params.borrowXBRL.prettify()} {COIN}
        </Amount>
      </>
    ) : params.repayXBRL && params.withdrawCollateral ? (
      <>
        Você vai pagar{" "}
        <Amount>
          {params.repayXBRL.prettify()} {COIN}
        </Amount>{" "}
        e receber <Amount>{params.withdrawCollateral.prettify()} ETH</Amount>
      </>
    ) : params.depositCollateral && params.repayXBRL ? (
      <>
        Você vai depositar <Amount>{params.depositCollateral.prettify()} ETH</Amount> e pagar{" "}
        <Amount>
          {params.repayXBRL.prettify()} {COIN}
        </Amount>
      </>
    ) : params.borrowXBRL && params.withdrawCollateral ? (
      <>
        Você vai receber <Amount>{params.withdrawCollateral.prettify()} ETH</Amount> e{" "}
        <Amount>
          {params.borrowXBRL.prettify()} {COIN}
        </Amount>
      </>
    ) : params.depositCollateral ? (
      <>
        Você vai depositar <Amount>{params.depositCollateral.prettify()} ETH</Amount>
      </>
    ) : params.withdrawCollateral ? (
      <>
        Você vai receber <Amount>{params.withdrawCollateral.prettify()} ETH</Amount>
      </>
    ) : params.borrowXBRL ? (
      <>
        Você vai receber{" "}
        <Amount>
          {params.borrowXBRL.prettify()} {COIN}
        </Amount>
      </>
    ) : (
      <>
        VocÊ vai pagar{" "}
        <Amount>
          {params.repayXBRL.prettify()} {COIN}
        </Amount>
      </>
    )}
    .
  </ActionDescription>
);

export const selectForTroveChangeValidation = ({
  price,
  total,
  accountBalance,
  xbrlBalance,
  numberOfTroves
}: StabilioStoreState) => ({ price, total, accountBalance, xbrlBalance, numberOfTroves });

type TroveChangeValidationSelectedState = ReturnType<typeof selectForTroveChangeValidation>;

interface TroveChangeValidationContext extends TroveChangeValidationSelectedState {
  originalTrove: Trove;
  resultingTrove: Trove;
  recoveryMode: boolean;
  wouldTriggerRecoveryMode: boolean;
}

export const validateTroveChange = (
  originalTrove: Trove,
  adjustedTrove: Trove,
  borrowingRate: Decimal,
  selectedState: TroveChangeValidationSelectedState
): [
  validChange: Exclude<TroveChange<Decimal>, { type: "invalidCreation" }> | undefined,
  description: JSX.Element | undefined
] => {
  const { total, price } = selectedState;
  const change = originalTrove.whatChanged(adjustedTrove, borrowingRate);

  if (!change) {
    return [undefined, undefined];
  }

  // Reapply change to get the exact state the Trove will end up in (which could be slightly
  // different from `edited` due to imprecision).
  const resultingTrove = originalTrove.apply(change, borrowingRate);
  const recoveryMode = total.collateralRatioIsBelowCritical(price);
  const wouldTriggerRecoveryMode = total
    .subtract(originalTrove)
    .add(resultingTrove)
    .collateralRatioIsBelowCritical(price);

  const context: TroveChangeValidationContext = {
    ...selectedState,
    originalTrove,
    resultingTrove,
    recoveryMode,
    wouldTriggerRecoveryMode
  };

  if (change.type === "invalidCreation") {
    // Trying to create a Trove with negative net debt
    return [
      undefined,
      <ErrorDescription>
        A dívida total deve ser pelo menos{" "}
        <Amount>
          {XBRL_MINIMUM_DEBT.toString()} {COIN}
        </Amount>
        .
      </ErrorDescription>
    ];
  }

  const errorDescription =
    change.type === "creation"
      ? validateTroveCreation(change.params, context)
      : change.type === "closure"
      ? validateTroveClosure(change.params, context)
      : validateTroveAdjustment(change.params, context);

  if (errorDescription) {
    return [undefined, errorDescription];
  }

  return [change, <TroveChangeDescription params={change.params} />];
};

const validateTroveCreation = (
  { depositCollateral, borrowXBRL }: TroveCreationParams<Decimal>,
  {
    resultingTrove,
    recoveryMode,
    wouldTriggerRecoveryMode,
    accountBalance,
    price
  }: TroveChangeValidationContext
): JSX.Element | null => {
  if (borrowXBRL.lt(XBRL_MINIMUM_NET_DEBT)) {
    return (
      <ErrorDescription>
        Você deve fazer empréstimo de pelo menos{" "}
        <Amount>
          {XBRL_MINIMUM_NET_DEBT.toString()} {COIN}
        </Amount>
        .
      </ErrorDescription>
    );
  }

  if (recoveryMode) {
    if (!resultingTrove.isOpenableInRecoveryMode(price)) {
      return (
        <ErrorDescription>
          Você não tem permissão para abrir um Depósito com Racional de Colateral menor que <Amount>{ccrPercent}</Amount> 
          durante o Modo de Recuperação. Por favor, aumente o Racional de Colateral do seu Depósito.
        </ErrorDescription>
      );
    }
  } else {
    if (resultingTrove.collateralRatioIsBelowMinimum(price)) {
      return (
        <ErrorDescription>
          Racional de Colateral deve ser pelo menos <Amount>{mcrPercent}</Amount>.
        </ErrorDescription>
      );
    }

    if (wouldTriggerRecoveryMode) {
      return (
        <ErrorDescription>
          Você não tem permissão para abrir um Depósito que faria com que o Racional de Colateral Total caísse
          abaixo de <Amount>{ccrPercent}</Amount>. Por favor, aumente o Racional de Colateral do seu Depósito.
        </ErrorDescription>
      );
    }
  }

  if (depositCollateral.gt(accountBalance)) {
    return (
      <ErrorDescription>
        O valor que você está tentando depositar excede seu saldo em{" "}
        <Amount>{depositCollateral.sub(accountBalance).prettify()} ETH</Amount>.
      </ErrorDescription>
    );
  }

  return null;
};

const validateTroveAdjustment = (
  { depositCollateral, withdrawCollateral, borrowXBRL, repayXBRL }: TroveAdjustmentParams<Decimal>,
  {
    originalTrove,
    resultingTrove,
    recoveryMode,
    wouldTriggerRecoveryMode,
    price,
    accountBalance,
    xbrlBalance
  }: TroveChangeValidationContext
): JSX.Element | null => {
  if (recoveryMode) {
    if (withdrawCollateral) {
      return (
        <ErrorDescription>
          Você não tem permissão para sacar o colateral durante o Modo de Recuperação.
        </ErrorDescription>
      );
    }

    if (borrowXBRL) {
      if (resultingTrove.collateralRatioIsBelowCritical(price)) {
        return (
          <ErrorDescription>
            Seu Racional de Colateral deve ser de pelo menos <Amount>{ccrPercent}</Amount> para abrir um depósito para poder realizar 
            empréstimo de xBRL durante o Modo de Recuperação. Por favor, melhore seu Racional de Colateral.
          </ErrorDescription>
        );
      }

      if (resultingTrove.collateralRatio(price).lt(originalTrove.collateralRatio(price))) {
        return (
          <ErrorDescription>
            Você não tem permissão para diminuir seu racional de colateral durante o Modo de Recuperação.
          </ErrorDescription>
        );
      }
    }
  } else {
    if (resultingTrove.collateralRatioIsBelowMinimum(price)) {
      return (
        <ErrorDescription>
          O racional entre a quantidade de colateral e o montante emitido de xBRL deve ser de pelo menos<Amount>{mcrPercent}</Amount>.
        </ErrorDescription>
      );
    }

    if (wouldTriggerRecoveryMode) {
      return (
        <ErrorDescription>
          O ajuste que você está tentando fazer faria com que o Racional de Colateral Total do sistema caísse abaixo de{" "}
           <Amount>{ccrPercent}</Amount>. Por favor, aumente o racional entre a quantidade de colateral e o montante emitido de xBRL do seu Depósito.
        </ErrorDescription>
      );
    }
  }

  if (repayXBRL) {
    if (resultingTrove.debt.lt(XBRL_MINIMUM_DEBT)) {
      return (
        <ErrorDescription>
          A dívida total deve ser de pelo menos{" "}
          <Amount>
            {XBRL_MINIMUM_DEBT.toString()} {COIN}
          </Amount>
          .
        </ErrorDescription>
      );
    }

    if (repayXBRL.gt(xbrlBalance)) {
      return (
        <ErrorDescription>
          O valor que você está tentando pagar excede seu saldo em{" "}
          <Amount>
            {repayXBRL.sub(xbrlBalance).prettify()} {COIN}
          </Amount>
          .
        </ErrorDescription>
      );
    }
  }

  if (depositCollateral?.gt(accountBalance)) {
    return (
      <ErrorDescription>
        O valor que você está tentando depositar excede seu saldo em{" "}
        <Amount>{depositCollateral.sub(accountBalance).prettify()} ETH</Amount>.
      </ErrorDescription>
    );
  }

  return null;
};

const validateTroveClosure = (
  { repayXBRL }: TroveClosureParams<Decimal>,
  {
    recoveryMode,
    wouldTriggerRecoveryMode,
    numberOfTroves,
    xbrlBalance
  }: TroveChangeValidationContext
): JSX.Element | null => {
  if (numberOfTroves === 1) {
    return (
      <ErrorDescription>
        Você não tem permissão para fechar seu Depósito quando não houver outros Depósitos no sistema.
      </ErrorDescription>
    );
  }

  if (recoveryMode) {
    return (
      <ErrorDescription>
        Você não tem permissão para fechar seu Depósito quando não houver outros Depósitos no sistema.
      </ErrorDescription>
    );
  }

  if (repayXBRL?.gt(xbrlBalance)) {
    return (
      <ErrorDescription>
        Você precisa de mais{" "}
        <Amount>
          {repayXBRL.sub(xbrlBalance).prettify()} {COIN}
        </Amount>{" "}
        para fechar seu depósito
      </ErrorDescription>
    );
  }

  if (wouldTriggerRecoveryMode) {
    return (
      <ErrorDescription>
        Você não tem permissão para fechar um Depósito se isso fizer com que o Racional de Colateral Total do sistema diminua e
        caia abaixo de <Amount>{ccrPercent}</Amount>. Por favor, espere até que o Racional de Colateral Total do sistema
        aumente.
      </ErrorDescription>
    );
  }

  return null;
};
