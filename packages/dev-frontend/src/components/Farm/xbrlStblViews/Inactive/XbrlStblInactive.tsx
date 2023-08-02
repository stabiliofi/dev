import React, { useCallback } from "react";
import { Card, Heading, Box, Flex, Button, Link, Paragraph } from "theme-ui";
import { useStabilio } from "../../../../hooks/StabilioContext";
import { Icon } from "../../../Icon";
import { InfoMessage } from "../../../InfoMessage";
import { useXbrlStblFarmView } from "../../context/XbrlStblFarmViewContext";
import { XbrlStblRemainingSTBL } from "../XbrlStblRemainingSTBL";
import { XbrlStblYield } from "../XbrlStblYield";

const uniLink = (stblAddress: string, xbrlAddress: string) => `https://app.uniswap.org/#/add/v2/${stblAddress}/${xbrlAddress}`;

export const XbrlStblInactive: React.FC = () => {
  const { dispatchEvent } = useXbrlStblFarmView();

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
          STBL/xBRL LP no Uniswap
        </Heading>
        <Flex sx={{ justifyContent: "flex-end" }}>
          <XbrlStblRemainingSTBL />
        </Flex>
      </Flex>
      <Box sx={{ p: [2, 3] }}>
        <InfoMessage title="Você não está recebendo STBL.">
          <Paragraph>Você pode receber STBL fazendo stake de seus tokens Uniswap ETH/xBRL LP.</Paragraph>

          <Paragraph sx={{ mt: 2 }}>
          Você pode obter tokens LP adicionando liquidez ao{" "}
            <Link href={uniLink(addresses["stblToken"], addresses["xbrlToken"])} target="_blank">
              Fundo de liquidez STBL/xBRL no Uniswap. <Icon name="external-link-alt" size="xs" />
            </Link>
          </Paragraph>
        </InfoMessage>

        <Flex variant="layout.actions">
          <Flex sx={{ justifyContent: "flex-start", alignItems: "center", flex: 1 }}>
            <XbrlStblYield />
          </Flex>
          <Button onClick={handleStakePressed}>Fazer Stake</Button>
        </Flex>
      </Box>
    </Card>
  );
};
