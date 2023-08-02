import { Box, Card, Heading, Paragraph, Text } from "theme-ui";

import { InfoMessage } from "../InfoMessage";
import { Icon } from "../Icon";

type DisabledRedemptionProps = {
  disabledDays: number;
  unlockDate: Date;
};

export const DisabledRedemption: React.FC<DisabledRedemptionProps> = ({
  disabledDays,
  unlockDate
}) => (
  <Card>
    <Heading>Regaste de Colaterais</Heading>

    <Box sx={{ p: [2, 3] }}>
      <InfoMessage
        title="O resgate de colaterais ainda não está habilitado."
        icon={
          <Box sx={{ color: "warning" }}>
            <Icon name="exclamation-triangle" />
          </Box>
        }
      >
        <Paragraph>
          O resgate de colaterais pelos seus xBRL está desativado nos primeiros {disabledDays} dias após o lançamento.
        </Paragraph>

        <Paragraph sx={{ mt: 3 }}>
          Será desbloqueado em{" "}
          <Text sx={{ fontWeight: "medium" }}>{unlockDate.toLocaleString()}</Text>.
        </Paragraph>
      </InfoMessage>
    </Box>
  </Card>
);
