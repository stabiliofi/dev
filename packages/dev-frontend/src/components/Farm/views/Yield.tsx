import React, { useEffect, useState } from "react";
import { Card, Paragraph, Text } from "theme-ui";
import { Decimal, StabilioStoreState } from "@stabilio/lib-base";
import { useStabilioSelector } from "@stabilio/lib-react";
import { InfoIcon } from "../../InfoIcon";
import { useStabilio } from "../../../hooks/StabilioContext";
import { Badge } from "../../Badge";
import { fetchPrices } from "../context/fetchPrices";

const selector = ({
  remainingXbrlWethLiquidityMiningSTBLReward,
  totalStakedXbrlWethUniTokens
}: StabilioStoreState) => ({
  remainingXbrlWethLiquidityMiningSTBLReward,
  totalStakedXbrlWethUniTokens
});

export const Yield: React.FC = () => {
  const {
    stabilio: {
      connection: { addresses, xbrlWethLiquidityMiningSTBLRewardRate }
    }
  } = useStabilio();

  const { remainingXbrlWethLiquidityMiningSTBLReward, totalStakedXbrlWethUniTokens } = useStabilioSelector(selector);
  const [stblPrice, setStblPrice] = useState<Decimal | undefined>(undefined);
  const [uniLpPrice, setUniLpPrice] = useState<Decimal | undefined>(undefined);
  const hasZeroValue = remainingXbrlWethLiquidityMiningSTBLReward.isZero || totalStakedXbrlWethUniTokens.isZero;
  const stblTokenAddress = addresses["stblToken"];
  const uniTokenAddress = addresses["uniToken"];
  const secondsRemaining = remainingXbrlWethLiquidityMiningSTBLReward.div(xbrlWethLiquidityMiningSTBLRewardRate);
  const daysRemaining = secondsRemaining.div(60 * 60 * 24);

  useEffect(() => {
    (async () => {
      try {
        const { stblPriceUSD, uniLpPriceUSD } = await fetchPrices(stblTokenAddress, uniTokenAddress);
        setStblPrice(stblPriceUSD);
        setUniLpPrice(uniLpPriceUSD);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [stblTokenAddress, uniTokenAddress]);

  if (hasZeroValue || stblPrice === undefined || uniLpPrice === undefined) return null;

  const remainingStblInUSD = remainingXbrlWethLiquidityMiningSTBLReward.mul(stblPrice);
  const totalStakedUniLpInUSD = totalStakedXbrlWethUniTokens.mul(uniLpPrice);
  const yieldPercentage = remainingStblInUSD.div(totalStakedUniLpInUSD).mul(100);

  if (yieldPercentage.isZero) return null;

  return (
    <Badge>
      <Text>
        {daysRemaining?.prettify(0)} rendimento diário de {yieldPercentage.toString(2)}%
      </Text>
      <InfoIcon
        tooltip={
          <Card variant="tooltip" sx={{ minWidth: ["auto", "352px"] }}>
            <Paragraph>
              Uma <Text sx={{ fontWeight: "bold" }}>estimativa</Text> do retorno de STBLs pelos token LP UNI em stake. 
              O período de incentivo dura 8 semanas e o retorno é relativo ao tempo restante.
            </Paragraph>
            <Paragraph sx={{ fontSize: "12px", fontFamily: "monospace", mt: 2 }}>
              ($STBL_REWARDS / $STAKED_UNI_LP) * 100 ={" "}
              <Text sx={{ fontWeight: "bold" }}> Rendimento</Text>
            </Paragraph>
            <Paragraph sx={{ fontSize: "12px", fontFamily: "monospace" }}>
              ($
              {remainingStblInUSD.shorten()} / ${totalStakedUniLpInUSD.shorten()}) * 100 =
              <Text sx={{ fontWeight: "bold" }}> {yieldPercentage.toString(2)}%</Text>
            </Paragraph>
          </Card>
        }
      ></InfoIcon>
    </Badge>
  );
};
