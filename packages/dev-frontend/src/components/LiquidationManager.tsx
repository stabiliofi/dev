import React, { useState } from "react";
import { Card, Box, Heading, Flex, Button, Label, Input } from "theme-ui";

import { useStabilio } from "../hooks/StabilioContext";

import { Icon } from "./Icon";
import { Transaction } from "./Transaction";

export const LiquidationManager: React.FC = () => {
  const {
    stabilio: { send: stabilio }
  } = useStabilio();
  const [numberOfTrovesToLiquidate, setNumberOfTrovesToLiquidate] = useState("90");

  return (
    <Card>
      <Heading>Liquidate</Heading>

      <Box sx={{ p: [2, 3] }}>
        <Flex sx={{ alignItems: "stretch" }}>
          <Label>Up to</Label>

          <Input
            type="number"
            min="1"
            step="1"
            value={numberOfTrovesToLiquidate}
            onChange={e => setNumberOfTrovesToLiquidate(e.target.value)}
          />

          <Label>Troves</Label>

          <Flex sx={{ ml: 2, alignItems: "center" }}>
            <Transaction
              id="batch-liquidate"
              tooltip="Liquidate"
              tooltipPlacement="bottom"
              send={overrides => {
                if (!numberOfTrovesToLiquidate) {
                  throw new Error("Invalid number");
                }
                return stabilio.liquidateUpTo(parseInt(numberOfTrovesToLiquidate, 10), overrides);
              }}
            >
              <Button variant="dangerIcon">
                <Icon name="trash" size="lg" />
              </Button>
            </Transaction>
          </Flex>
        </Flex>
      </Box>
    </Card>
  );
};
