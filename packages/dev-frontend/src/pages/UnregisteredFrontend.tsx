import { Box, Flex, Heading, Paragraph } from "theme-ui";

import { shortenAddress } from "../utils/shortenAddress";
import { Icon } from "../components/Icon";
import { useStabilio } from "../hooks/StabilioContext";

export const UnregisteredFrontend: React.FC = () => {
  const {
    config: { frontendTag }
  } = useStabilio();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",

        m: 3,
        p: 3,
        maxWidth: "500px",

        border: 1,
        borderRadius: "8px",
        borderColor: "warning",
        boxShadow: 2
      }}
    >
      <Flex sx={{ alignItems: "center", mx: 3, mb: 2 }}>
        <Icon name="exclamation-triangle" size="2x" />
        <Heading sx={{ ml: 3, fontSize: "18px" }}>Frontend ainda não registrado</Heading>
      </Flex>

      <Paragraph sx={{ fontSize: 2 }}>
        Se você for o operador deste frontend, selecione <b>{shortenAddress(frontendTag)}</b>{" "}
        em sua carteira para prosseguir com o registro.
      </Paragraph>
    </Box>
  );
};
