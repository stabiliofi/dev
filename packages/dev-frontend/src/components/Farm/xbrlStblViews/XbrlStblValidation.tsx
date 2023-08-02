import React from "react";
import { Decimal } from "@stabilio/lib-base";
import { LP } from "../../../strings";
import { ErrorDescription } from "../../ErrorDescription";
import { useXbrlStblValidationState } from "../context/useXbrlStblValidationState";

type ValidationProps = {
  amount: Decimal;
};

export const XbrlStblValidation: React.FC<ValidationProps> = ({ amount }) => {
  const { isValid, hasApproved, hasEnoughUniToken } = useXbrlStblValidationState(amount);

  if (isValid) {
    return null;
  }

  if (!hasApproved) {
    return <ErrorDescription>Você não aprovou o suficiente {LP}</ErrorDescription>;
  }

  if (!hasEnoughUniToken) {
    return <ErrorDescription>Você não tem o suficiente {LP}</ErrorDescription>;
  }

  return null;
};
