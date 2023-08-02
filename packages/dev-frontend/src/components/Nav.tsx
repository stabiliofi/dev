import { Flex, Box } from "theme-ui";
import { Link } from "./Link";

export const Nav: React.FC = () => {
  return (
    <Box as="nav" sx={{ display: ["none", "flex"], alignItems: "center", flex: 1 }}>
      <Flex sx={{ gap: 3 }}>
        <Link to="/">Dashboard</Link>
        <Link to="/farm">Fundos de Liquidez</Link>
      </Flex>
      <Flex sx={{ justifyContent: "flex-end", mr: 3, flex: 1, gap: 3 }}>
        <Link to="/risky-troves">
          Depósitos Arriscados
        </Link>
        <Link to="/redemption">
          Resgate de Colateral
        </Link>
      </Flex>
    </Box>
  );
};
