import React, { useCallback } from "react";
import { Card, Heading, Box, Flex, Button, Link, Paragraph } from "theme-ui";
import { useStabilio } from "../../../../hooks/StabilioContext";
import { Icon } from "../../../Icon";
import { InfoMessage } from "../../../InfoMessage";
import { useFarmView } from "../../context/FarmViewContext";
import { RemainingSTBL } from "../RemainingSTBL";
import { Yield } from "../Yield";

const uniLink = (xbrlAddress: string) => `https://app.uniswap.org/#/add/v2/ETH/${xbrlAddress}`;

export const Inactive: React.FC = () => {
  const { dispatchEvent } = useFarmView();

  const {
    stabilio: {
      connection: { addresses }
    }
  } = useStabilio();

  const handleStakePressed = useCallback(() => {
    dispatchEvent("STAKE_PRESSED");
  }, [dispatchEvent]);

  return (
    <Card>
      <Flex sx={{ justifyContent: "space-between", width: "100%", px: [2, 3], pt: 3, pb: 2 }}>
        <Heading sx={{ fontSize: 16  }}>
          ETH/xBRL LP no Uniswap
        </Heading>
        <Flex sx={{ justifyContent: "flex-end" }}>
          <RemainingSTBL />
        </Flex>
      </Flex>
      <Box sx={{ p: [2, 3] }}>
        <InfoMessage title="Você não está recebendo STBL.">
          <Paragraph>Você pode receber STBL fazendo stake de seus tokens Uniswap ETH/xBRL LP.</Paragraph>

          <Paragraph sx={{ mt: 2 }}>
          Você pode obter tokens LP adicionando liquidez ao{" "}
            <Link href={uniLink(addresses["xbrlToken"])} target="_blank">
              Fundo de liquidez ETH/xBRL no Uniswap. <Icon name="external-link-alt" size="xs" />
            </Link>
          </Paragraph>
        </InfoMessage>

        <Flex variant="layout.actions">
          <Flex sx={{ justifyContent: "flex-start", alignItems: "center", flex: 1 }}>
            <Yield />
          </Flex>
          <Button onClick={handleStakePressed}>Fazer Stake</Button>
        </Flex>
      </Box>
    </Card>
  );
};
