import React from "react";
import { Card, Heading, Box, Flex } from "theme-ui";
import { StabilioStoreState } from "@stabilio/lib-base";
import { useStabilioSelector } from "@stabilio/lib-react";
import { InfoMessage } from "../../../InfoMessage";
import { UnstakeAndClaim } from "../UnstakeAndClaim";
import { RemainingSTBL } from "../RemainingSTBL";
import { StaticRow } from "../../../Trove/Editor";
import { GT, LP } from "../../../../strings";

const selector = ({ xbrlWethLiquidityMiningStake, xbrlWethLiquidityMiningSTBLReward }: StabilioStoreState) => ({
  xbrlWethLiquidityMiningStake,
  xbrlWethLiquidityMiningSTBLReward
});

export const Disabled: React.FC = () => {
  const { xbrlWethLiquidityMiningStake, xbrlWethLiquidityMiningSTBLReward } = useStabilioSelector(selector);
  const hasStake = !xbrlWethLiquidityMiningStake.isZero;

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
        <InfoMessage title="Liquidity farming period has finished">
          <Flex>There are no more STBL rewards left to farm</Flex>
        </InfoMessage>
        {hasStake && (
          <>
            <Box sx={{ border: 1, pt: 3, borderRadius: 3 }}>
              <StaticRow
                label="Stake"
                inputId="farm-deposit"
                amount={xbrlWethLiquidityMiningStake.prettify(4)}
                unit={LP}
              />
              <StaticRow
                label="Reward"
                inputId="farm-reward"
                amount={xbrlWethLiquidityMiningSTBLReward.prettify(4)}
                color={xbrlWethLiquidityMiningSTBLReward.nonZero && "success"}
                unit={GT}
              />
            </Box>
            <UnstakeAndClaim />
          </>
        )}
      </Box>
    </Card>
  );
};
