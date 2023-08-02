import { useState } from "react";
import { Card, Heading, Box, Flex, Input, Label, Paragraph, Button, Spinner } from "theme-ui";

import { Decimal } from "@stabilio/lib-base";

import { shortenAddress } from "../utils/shortenAddress";
import { useStabilio } from "../hooks/StabilioContext";
import { Transaction, useMyTransactionState } from "../components/Transaction";
import { Icon } from "../components/Icon";

type FrontendRegistrationActionProps = {
  kickbackRate: Decimal;
};

const FrontendRegistrationAction: React.FC<FrontendRegistrationActionProps> = ({ kickbackRate }) => {
  const {
    stabilio: { send: stabilio }
  } = useStabilio();

  const myTransactionId = "register-frontend";
  const myTransactionState = useMyTransactionState(myTransactionId);

  return myTransactionState.type === "waitingForApproval" ? (
    <Button disabled>
      <Spinner sx={{ mr: 2, color: "white" }} size="20px" />
      Aguardando sua aprovação
    </Button>
  ) : myTransactionState.type !== "waitingForConfirmation" &&
    myTransactionState.type !== "confirmed" ? (
    <Transaction id={myTransactionId} send={stabilio.registerFrontend.bind(stabilio, kickbackRate)}>
      <Button>Registrar</Button>
    </Transaction>
  ) : null;
};

export const FrontendRegistration: React.FC = () => {
  const { account } = useStabilio();

  const [kickbackRate, setKickbackRate] = useState(Decimal.from(0.8));
  const [cut, setCut] = useState(Decimal.from(0.2));
  const [kickbackRateString, setKickbackRateString] = useState("80");

  return (
    <>
      <Card>
        <Heading>Escolha uma taxa Kickback</Heading>

        <Box sx={{ p: [2, 3] }}>
          <Flex>
            <Label>Taxa Kickback</Label>
            <Label variant="unit">%</Label>

            <Input
              sx={{ maxWidth: "200px" }}
              type="number"
              step="any"
              value={kickbackRateString}
              onChange={e => {
                setKickbackRateString(e.target.value);
                try {
                  const newKickbackRate = Decimal.from(e.target.value || 0).div(100);
                  const newCut = Decimal.ONE.sub(newKickbackRate);

                  setKickbackRate(newKickbackRate);
                  setCut(newCut);
                } catch {}
              }}
              onBlur={() => {
                setKickbackRateString(kickbackRate.mul(100).toString());
              }}
            />
          </Flex>
        </Box>
      </Card>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",

          m: 3,
          mt: [3, null, 4],
          mb: 4,
          p: 3,
          maxWidth: "450px",

          border: 1,
          borderRadius: "8px",
          borderColor: "danger",
          boxShadow: 2
        }}
      >
        <Flex sx={{ alignItems: "center", mx: 3, fontSize: 4 }}>
          <Icon name="hand-paper" />
          <Heading sx={{ ml: 3, fontSize: "18px" }}>Antes de prosseguir</Heading>
        </Flex>

        <Paragraph sx={{ fontSize: 1, mt: 3 }}>
          Você está prestes a registrar <b>{shortenAddress(account)}</b> para receber{" "}
           <b>{cut.mul(100).toString()}%</b> das recompensas de STBL ganhas através deste frontend.
        </Paragraph>

        <Paragraph sx={{ fontSize: 1, mt: 3, fontWeight: "bold" }}>
          Você não poderá alterar a taxa KickBack para este endereço posteriormente.
        </Paragraph>

        <Paragraph sx={{ fontSize: 1, mt: 3 }}>
          Se quiser usar uma taxa Kickback diferente no futuro, você precisará repetir isso
          registro com um endereço diferente.
        </Paragraph>
      </Box>

      <FrontendRegistrationAction {...{ kickbackRate }} />
    </>
  );
};
