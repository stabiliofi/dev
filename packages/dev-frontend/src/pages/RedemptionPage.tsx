import React from "react";
import { Box, Card, Container, Link, Paragraph } from "theme-ui";
import { SystemStats } from "../components/SystemStats";
import { Redemption } from "../components/Redemption/Redemption";
import { InfoMessage } from "../components/InfoMessage";
import { useStabilio } from "../hooks/StabilioContext";
import { Icon } from "../components/Icon";

const uniLink = (xbrlAddress: string) =>
  `https://app.uniswap.org/#/swap?inputCurrency=${xbrlAddress}&outputCurrency=ETH`;

export const RedemptionPage: React.FC = () => {
  const {
    stabilio: {
      connection: { addresses }
    }
  } = useStabilio();

  return (
    <Container variant="columns">
      <Container variant="left">
        <Card>
          <Box sx={{ p: [2, 3] }}>
            <InfoMessage title="Funcionalidade Bot">
              <Paragraph>
                Espera-se que os resgates sejam realizados por bots quando as oportunidades de arbitragem
                emergir.
              </Paragraph>
              <Paragraph sx={{ mt: 2 }}>
                Na maioria das vezes, você obterá uma taxa melhor para converter xBRL em ETH no{" "}
                <Link href={uniLink(addresses["xbrlToken"])} target="_blank">
                  Uniswap <Icon name="external-link-alt" size="xs" />
                </Link>{" "}
                ou em outras exchanges.
              </Paragraph>
              <Paragraph sx={{ mt: 2 }}>
                <strong>Observação</strong>: O resgate de colateral não é para reembolsar seu empréstimo. Para pagar sua dívida de
                empréstimo. Ajuste seu Depósito no <Link href="#/">Dasboard</Link>.
              </Paragraph>
            </InfoMessage>
          </Box>
        </Card>
        <Redemption />
      </Container>

      <Container variant="right">
        <SystemStats />
      </Container>
    </Container>
  );
};
