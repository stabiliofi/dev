import { Card, Heading, Box, Flex, Button } from "theme-ui";

import { GT } from "../../strings";

import { InfoMessage } from "../InfoMessage";
import { useStakingView } from "./context/StakingViewContext";

export const NoStake: React.FC = () => {
  const { dispatch } = useStakingView();

  return (
    <Card>
      <Heading>Staking de STBL</Heading>
      <Box sx={{ p: [2, 3] }}>
        <InfoMessage title={`Você ainda não fez stake de ${GT}.`}>
          Faça stake de {GT} para ganhar uma parte das taxas de empréstimo e resgate.
        </InfoMessage>

        <Flex variant="layout.actions">
          <Button onClick={() => dispatch({ type: "startAdjusting" })}>Fazer Stake</Button>
        </Flex>
      </Box>
    </Card>
  );
};
