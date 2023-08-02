import React from "react";
import { Container, Card, Box, Paragraph } from "theme-ui";
import { SystemStats } from "../components/SystemStats";
import { LiquidationManager } from "../components/LiquidationManager";
import { RiskyTroves } from "../components/RiskyTroves";
import { InfoMessage } from "../components/InfoMessage";

export const RiskyTrovesPage: React.FC = () => (
  <Container variant="columns">
    <Container variant="left">
      <Card>
        <Box sx={{ p: [2, 3] }}>
          <InfoMessage title="Funcionalidade Bot">
          <Paragraph>Espera-se que a liquidação seja realizada por bots.</Paragraph>
            <Paragraph>
              No início, você pode liquidar Troves manualmente, mas à medida que o sistema amadurece, isso
              será menos provável.
            </Paragraph>
          </InfoMessage>
        </Box>
      </Card>
      <LiquidationManager />
    </Container>

    <Container variant="right">
      <SystemStats />
    </Container>
    <RiskyTroves pageSize={10} />
  </Container>
);
