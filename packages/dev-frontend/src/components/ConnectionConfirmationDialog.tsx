import React from "react";
import { Text, Box } from "theme-ui";

import { WaitingDialog } from "./WaitingDialog";

type ConnectionConfirmationDialogProps = {
  title: string;
  icon?: React.ReactNode;
  onCancel: () => void;
};

export const ConnectionConfirmationDialog: React.FC<ConnectionConfirmationDialogProps> = ({
  title,
  icon,
  onCancel,
  children
}) => (
  <WaitingDialog
    title={title}
    icon={icon}
    waitReason={
      <>
        <Text sx={{ fontWeight: "bold" }}>Aguardando confirmação de conexão...</Text>
        <Text>Isso não vai te custar nenhum Ether</Text>
      </>
    }
    cancelLabel="Cancelar conexão"
    onCancel={onCancel}
  >
    <Box sx={{ p: [3, 4] }}>{children}</Box>
  </WaitingDialog>
);
