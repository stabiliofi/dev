import React, { useCallback } from "react";
import { Card, Heading, Box, Flex, Button } from "theme-ui";
import { InfoMessage } from "../InfoMessage";
import { useTroveView } from "./context/TroveViewContext";

export const NoTrove: React.FC = props => {
  const { dispatchEvent } = useTroveView();

  const handleOpenTrove = useCallback(() => {
    dispatchEvent("OPEN_TROVE_PRESSED");
  }, [dispatchEvent]);

  return (
    <Card>
      <Heading>Depósito</Heading>
      <Box sx={{ p: [2, 3] }}>
        <InfoMessage title="Você ainda não obteve nenhum xBRL emprestado.">
          Você pode obter xBRL emprestado abrindo um Depósito.
        </InfoMessage>

        <Flex variant="layout.actions">
          <Button onClick={handleOpenTrove}>Abrir Depósito</Button>
        </Flex>
      </Box>
    </Card>
  );
};
