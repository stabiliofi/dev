import React from "react";
import { Text } from "theme-ui";
import { useStabilio } from "../../../hooks/StabilioContext";
import { LP } from "../../../strings";
import { Transaction } from "../../Transaction";
import { Decimal } from "@stabilio/lib-base";
import { ActionDescription } from "../../ActionDescription";
import { useXbrlStblValidationState } from "../context/useXbrlStblValidationState";

type XbrlStblDescriptionProps = {
  amount: Decimal;
};

const transactionId = "farm-stake";

export const XbrlStblDescription: React.FC<XbrlStblDescriptionProps> = ({ amount }) => {
  const {
    stabilio: { send: stabilio }
  } = useStabilio();
  const { isValid, hasApproved, isWithdrawing, amountChanged } = useXbrlStblValidationState(amount);

  if (!hasApproved) {
    return (
      <ActionDescription>
        <Text>Para fazer stake de seus tokens {LP} STBL/xBRL, você precisa permitir que Stabilio os faça para você</Text>
      </ActionDescription>
    );
  }

  if (!isValid || amountChanged.isZero) {
    return null;
  }

  return (
    <ActionDescription>
      {isWithdrawing && (
        <Transaction id={transactionId} send={stabilio.unstakeXbrlStblUniTokens.bind(stabilio, amountChanged)}>
          <Text>
            Você está retirando o stake de {amountChanged.prettify(4)} {LP} STBL/xBRL
          </Text>
        </Transaction>
      )}
      {!isWithdrawing && (
        <Transaction id={transactionId} send={stabilio.stakeXbrlStblUniTokens.bind(stabilio, amountChanged)}>
          <Text>
            Você está fazendo stake de {amountChanged.prettify(4)} {LP} STBL/xBRL
          </Text>
        </Transaction>
      )}
    </ActionDescription>
  );
};
