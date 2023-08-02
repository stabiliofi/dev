import React, { useEffect } from "react";

import { Decimal, TroveChange } from "@stabilio/lib-base";
import { PopulatedEthersStabilioTransaction } from "@stabilio/lib-ethers";

import { useStabilio } from "../../hooks/StabilioContext";
import { Warning } from "../Warning";

export type GasEstimationState =
  | { type: "idle" | "inProgress" }
  | { type: "complete"; populatedTx: PopulatedEthersStabilioTransaction };

type ExpensiveTroveChangeWarningParams = {
  troveChange?: Exclude<TroveChange<Decimal>, { type: "invalidCreation" }>;
  maxBorrowingRate: Decimal;
  borrowingFeeDecayToleranceMinutes: number;
  gasEstimationState: GasEstimationState;
  setGasEstimationState: (newState: GasEstimationState) => void;
};

export const ExpensiveTroveChangeWarning: React.FC<ExpensiveTroveChangeWarningParams> = ({
  troveChange,
  maxBorrowingRate,
  borrowingFeeDecayToleranceMinutes,
  gasEstimationState,
  setGasEstimationState
}) => {
  const { stabilio } = useStabilio();

  useEffect(() => {
    if (troveChange && troveChange.type !== "closure") {
      setGasEstimationState({ type: "inProgress" });

      let cancelled = false;

      const timeoutId = setTimeout(async () => {
        const populatedTx = await (troveChange.type === "creation"
          ? stabilio.populate.openTrove(troveChange.params, {
              maxBorrowingRate,
              borrowingFeeDecayToleranceMinutes
            })
          : stabilio.populate.adjustTrove(troveChange.params, {
              maxBorrowingRate,
              borrowingFeeDecayToleranceMinutes
            }));

        if (!cancelled) {
          setGasEstimationState({ type: "complete", populatedTx });
          console.log(
            "Custo estimado de transação: " +
              Decimal.from(`${populatedTx.rawPopulatedTransaction.gasLimit}`).prettify(0)
          );
        }
      }, 333);

      return () => {
        clearTimeout(timeoutId);
        cancelled = true;
      };
    } else {
      setGasEstimationState({ type: "idle" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [troveChange]);

  if (
    troveChange &&
    gasEstimationState.type === "complete" &&
    gasEstimationState.populatedTx.gasHeadroom !== undefined &&
    gasEstimationState.populatedTx.gasHeadroom >= 200000
  ) {
    return troveChange.type === "creation" ? (
      <Warning>
        O custo de abertura de um Depósito nesta faixa de Racional de Collateral é bastante alto. Para baixá-lo,
        escolha um racional proporcional ligeiramente diferente.
      </Warning>
    ) : (
      <Warning>
        O custo de ajustar um Depósito a essa faixa de Racional de Collateral é bastante alto. Para baixá-lo,
        escolha um racional proporcional ligeiramente diferente.
      </Warning>
    );
  }

  return null;
};
