import React, { useEffect, useReducer } from "react";
import { useWeb3React } from "@web3-react/core";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { Button, Text, Flex, Link, Box } from "theme-ui";

import { injectedConnector } from "../connectors/injectedConnector";
import { useAuthorizedConnection } from "../hooks/useAuthorizedConnection";

import { RetryDialog } from "./RetryDialog";
import { ConnectionConfirmationDialog } from "./ConnectionConfirmationDialog";
import { MetaMaskIcon } from "./MetaMaskIcon";
import { Icon } from "./Icon";
import { Modal } from "./Modal";

interface MaybeHasMetaMask {
  ethereum?: {
    isMetaMask?: boolean;
  };
}

type ConnectionState =
  | { type: "inactive" }
  | {
      type: "activating" | "active" | "rejectedByUser" | "alreadyPending" | "failed";
      connector: AbstractConnector;
    };

type ConnectionAction =
  | { type: "startActivating"; connector: AbstractConnector }
  | { type: "fail"; error: Error }
  | { type: "finishActivating" | "retry" | "cancel" | "deactivate" };

const connectionReducer: React.Reducer<ConnectionState, ConnectionAction> = (state, action) => {
  switch (action.type) {
    case "startActivating":
      return {
        type: "activating",
        connector: action.connector
      };
    case "finishActivating":
      return {
        type: "active",
        connector: state.type === "inactive" ? injectedConnector : state.connector
      };
    case "fail":
      if (state.type !== "inactive") {
        return {
          type: action.error.message.match(/user rejected/i)
            ? "rejectedByUser"
            : action.error.message.match(/already pending/i)
            ? "alreadyPending"
            : "failed",
          connector: state.connector
        };
      }
      break;
    case "retry":
      if (state.type !== "inactive") {
        return {
          type: "activating",
          connector: state.connector
        };
      }
      break;
    case "cancel":
      return {
        type: "inactive"
      };
    case "deactivate":
      return {
        type: "inactive"
      };
  }

  console.warn("Ignoring connectionReducer action:");
  console.log(action);
  console.log("  in state:");
  console.log(state);

  return state;
};

const detectMetaMask = () => (window as MaybeHasMetaMask).ethereum?.isMetaMask ?? false;

type WalletConnectorProps = {
  loader?: React.ReactNode;
};

export const WalletConnector: React.FC<WalletConnectorProps> = ({ children, loader }) => {
  const { activate, deactivate, active, error } = useWeb3React<unknown>();
  const triedAuthorizedConnection = useAuthorizedConnection();
  const [connectionState, dispatch] = useReducer(connectionReducer, { type: "inactive" });
  const isMetaMask = detectMetaMask();

  useEffect(() => {
    if (error) {
      dispatch({ type: "fail", error });
      deactivate();
    }
  }, [error, deactivate]);

  useEffect(() => {
    if (active) {
      dispatch({ type: "finishActivating" });
    } else {
      dispatch({ type: "deactivate" });
    }
  }, [active]);

  if (!triedAuthorizedConnection) {
    return <>{loader}</>;
  }

  if (connectionState.type === "active") {
    return <>{children}</>;
  }

  return (
    <>
      <Flex sx={{ height: "100vh", justifyContent: "center", alignItems: "center" }}>
        <Button
          onClick={() => {
            dispatch({ type: "startActivating", connector: injectedConnector });
            activate(injectedConnector);
          }}
        >
          {isMetaMask ? (
            <>
              <MetaMaskIcon />
              <Box sx={{ ml: 2 }}>Conectar com Metamask</Box>
            </>
          ) : (
            <>
              <Box sx={{ ml: 2 }}>Conectar carteira</Box>
            </>
          )}
        </Button>
      </Flex>

      {connectionState.type === "failed" && (
        <Modal>
          <RetryDialog
            title={isMetaMask ? "Falha ao conectar ao MetaMask" : "Falha ao conectar a carteira"}
            onCancel={() => dispatch({ type: "cancel" })}
            onRetry={() => {
              dispatch({ type: "retry" });
              activate(connectionState.connector);
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              Pode ser necessário instalar o MetaMask ou usar um navegador diferente.
            </Box>
            <Link sx={{ lineHeight: 3 }} href="https://metamask.io/download.html" target="_blank">
              Aprenda mais <Icon size="xs" name="external-link-alt" />
            </Link>
          </RetryDialog>
        </Modal>
      )}

      {connectionState.type === "activating" && (
        <Modal>
          <ConnectionConfirmationDialog
            title={
              isMetaMask ? "Confirme a conexão no MetaMask" : "Confirme a conexão em sua carteira"
            }
            icon={isMetaMask ? <MetaMaskIcon /> : <Icon name="wallet" size="lg" />}
            onCancel={() => dispatch({ type: "cancel" })}
          >
            <Text sx={{ textAlign: "center" }}>
            Confirme a solicitação que acabou de aparecer.
              {isMetaMask ? (
                <> Se você não conseguir ver uma solicitação, abra sua extensão MetaMask por meio de seu navegador.</>
              ) : (
                <> Se você não conseguir ver uma solicitação, talvez seja necessário abrir sua carteira.</>
              )}
            </Text>
          </ConnectionConfirmationDialog>
        </Modal>
      )}

      {connectionState.type === "rejectedByUser" && (
        <Modal>
          <RetryDialog
            title="Cancelar conexão?"
            onCancel={() => dispatch({ type: "cancel" })}
            onRetry={() => {
              dispatch({ type: "retry" });
              activate(connectionState.connector);
            }}
          >
            <Text>Para usar o Stabilio, você precisa conectar sua conta Ethereum.</Text>
          </RetryDialog>
        </Modal>
      )}

      {connectionState.type === "alreadyPending" && (
        <Modal>
          <RetryDialog
            title="Conexão já solicitada"
            onCancel={() => dispatch({ type: "cancel" })}
            onRetry={() => {
              dispatch({ type: "retry" });
              activate(connectionState.connector);
            }}
          >
            <Text>Verifique sua carteira e aceite a solicitação de conexão antes de tentar novamente.</Text>
          </RetryDialog>
        </Modal>
      )}
    </>
  );
};
