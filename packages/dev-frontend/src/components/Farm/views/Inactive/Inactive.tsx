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
          ETH/xBRL Uniswap LP
        </Heading>
        <Flex sx={{ justifyContent: "flex-end" }}>
          <RemainingSTBL />
        </Flex>
      </Flex>
      <Box sx={{ p: [2, 3] }}>
        <InfoMessage title="You aren't farming STBL.">
          <Paragraph>You can farm STBL by staking your Uniswap ETH/xBRL LP tokens.</Paragraph>

          <Paragraph sx={{ mt: 2 }}>
            You can obtain LP tokens by adding liquidity to the{" "}
            <Link href={uniLink(addresses["xbrlToken"])} target="_blank">
              ETH/xBRL pool on Uniswap. <Icon name="external-link-alt" size="xs" />
            </Link>
          </Paragraph>
        </InfoMessage>

        <Flex variant="layout.actions">
          <Flex sx={{ justifyContent: "flex-start", alignItems: "center", flex: 1 }}>
            <Yield />
          </Flex>
          <Button onClick={handleStakePressed}>Stake</Button>
        </Flex>
      </Box>
    </Card>
  );
};
