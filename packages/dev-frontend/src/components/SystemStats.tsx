import React from "react";
import { Card, Heading, Link, Box, Text } from "theme-ui";
import { AddressZero } from "@ethersproject/constants";
import { Decimal, Percent, StabilioStoreState } from "@stabilio/lib-base";
import { useStabilioSelector } from "@stabilio/lib-react";

import { useStabilio } from "../hooks/StabilioContext";
import { COIN, GT } from "../strings";
import { Statistic } from "./Statistic";

const selectBalances = ({ accountBalance, xbrlBalance, stblBalance }: StabilioStoreState) => ({
  accountBalance,
  xbrlBalance,
  stblBalance
});

const Balances: React.FC = () => {
  const { accountBalance, xbrlBalance, stblBalance } = useStabilioSelector(selectBalances);

  return (
    <Box sx={{ mb: 3 }}>
      <Heading>Saldos da minha conta</Heading>
      <Statistic name="ETH"> {accountBalance.prettify(4)}</Statistic>
      <Statistic name={COIN}> {xbrlBalance.prettify()}</Statistic>
      <Statistic name={GT}>{stblBalance.prettify()}</Statistic>
    </Box>
  );
};

const GitHubCommit: React.FC<{ children?: string }> = ({ children }) =>
  children?.match(/[0-9a-f]{40}/) ? (
    <Link href={`https://github.com/stabiliofi/dev/commit/${children}`}>{children.substr(0, 7)}</Link>
  ) : (
    <>unknown</>
  );

type SystemStatsProps = {
  variant?: string;
  showBalances?: boolean;
};

const select = ({
  numberOfTroves,
  price,
  total,
  xbrlInStabilityPool,
  borrowingRate,
  redemptionRate,
  totalStakedSTBL,
  frontend
}: StabilioStoreState) => ({
  numberOfTroves,
  price,
  total,
  xbrlInStabilityPool,
  borrowingRate,
  redemptionRate,
  totalStakedSTBL,
  kickbackRate: frontend.status === "registered" ? frontend.kickbackRate : null
});

export const SystemStats: React.FC<SystemStatsProps> = ({ variant = "info", showBalances }) => {
  const {
    stabilio: {
      connection: { version: contractsVersion, deploymentDate, frontendTag }
    }
  } = useStabilio();

  const {
    numberOfTroves,
    price,
    xbrlInStabilityPool,
    total,
    borrowingRate,
    totalStakedSTBL,
    kickbackRate
  } = useStabilioSelector(select);

  const xbrlInStabilityPoolPct =
    total.debt.nonZero && new Percent(xbrlInStabilityPool.div(total.debt));
  const totalCollateralRatioPct = new Percent(total.collateralRatio(price));
  const borrowingFeePct = new Percent(borrowingRate);
  const kickbackRatePct = frontendTag === AddressZero ? "100" : kickbackRate?.mul(100).prettify();

  return (
    <Card {...{ variant }}>
      {showBalances && <Balances />}

      <Heading>Estatísticas do Stabilio</Heading>

      <Heading as="h2" sx={{ mt: 3, fontWeight: "body" }}>
        Protocolo
      </Heading>

      <Statistic
        name="Taxa de Empréstimo"
        tooltip="A Taxa de Empréstimo é uma taxa única cobrada como uma porcentagem do valor emprestado (em xBRL) e faz parte da dívida do Depósito. A taxa varia entre 0,5% e 5%, dependendo dos volumes de resgate de colateral por xBRL."
      >
        {borrowingFeePct.toString(2)}
      </Statistic>

      <Statistic
        name="Valor Total Agregado"
        tooltip="O Valor Total Agregado no Protocolo (TVL em inglês) é o valor total de Ether bloqueado como garantia no sistema, dado em ETH e BRL."
      >
        {total.collateral.shorten()} <Text sx={{ fontSize: 1 }}>&nbsp;ETH</Text>
        <Text sx={{ fontSize: 1 }}>
          &nbsp;(${Decimal.from(total.collateral.mul(price)).shorten()})
        </Text>
      </Statistic>
      <Statistic name="Depósitos" tooltip="O número total de Depósitos ativos no sistema.">
        {Decimal.from(numberOfTroves).prettify(0)}
      </Statistic>
      <Statistic name="fornecimento de xBRL" tooltip="O xBRL total emitido pelo Protocolo Stabilio.">
        {total.debt.shorten()}
      </Statistic>
      {xbrlInStabilityPoolPct && (
        <Statistic
          name="Fundo de Estabilidade"
          tooltip="O xBRL total atualmente mantido no Fundo de Estabilidade, expresso como um valor e uma fração do fornecimento de xBRL.
        "
        >
          {xbrlInStabilityPool.shorten()}
          <Text sx={{ fontSize: 1 }}>&nbsp;({xbrlInStabilityPoolPct.toString(1)}) xBRLs</Text>
        </Statistic>
      )}
      <Statistic
        name="STBL em Stake"
        tooltip="O valor total de STBL em Stake para obter receita do protocolo em taxas."
      >
        {totalStakedSTBL.shorten()}
      </Statistic>
      <Statistic
        name="Racional de Colateral Total"
        tooltip="O racional em proporção do valor em Reais entre todo o Colateral em ETH depositado no sistema no preço atual de ETH:BRL e toda a dívida do sistema em xBRL (Todos os xBRLs emitidos)."
      >
        {totalCollateralRatioPct.prettify()}
      </Statistic>
      <Statistic
        name="Modo de Recuperação"
        tooltip="O Modo de Recuperação é ativado quando o Racional de Colateral Total (TCR em inglês) cai abaixo de 150%. Quando ativo, seu Depósito pode ser liquidado se seu racional de colateral (Proporção entre o montante de colateral depositado - ETH:BRL e xBRL emitidos) estiver abaixo do TCR. A quantidade de colateral máxima que você pode perder com a liquidação é limitada a 110% da dívida do seu Depósito. As operações também são restritas, o que afetaria negativamente o TCR."
      >
        {total.collateralRatioIsBelowCritical(price) ? <Box color="danger">Yes</Box> : "No"}
      </Statistic>
      {}

      <Heading as="h2" sx={{ mt: 3, fontWeight: "body" }}>
        Frontend
      </Heading>
      {kickbackRatePct && (
        <Statistic
          name="Taxa Kickback"
          tooltip="Uma taxa entre 0 e 100% definida pelo Operador de Frontend que determina a fração do STBL que será paga de retorno aos usuários, a diferença sera paga como comissão aos Provedores de estabilidade usando o frontend - Ou seja se a taxa Kickback for 90%, significa que os usuários que utilizarem este frontend receberá 90%, enquanto o provedor os restantes 10%"
        >
          {kickbackRatePct}%
        </Statistic>
      )}

      <Box sx={{ mt: 3, opacity: 0.66 }}>
        <Box sx={{ fontSize: 0 }}>
          Versão dos Contratos: <GitHubCommit>{contractsVersion}</GitHubCommit>
        </Box>
        <Box sx={{ fontSize: 0 }}>Implantado: {deploymentDate.toLocaleString()}</Box>
        <Box sx={{ fontSize: 0 }}>
          Versão de Frontend:{" "}
          {process.env.NODE_ENV === "development" ? (
            "development"
          ) : (
            <GitHubCommit>{process.env.REACT_APP_VERSION}</GitHubCommit>
          )}
        </Box>
      </Box>
    </Card>
  );
};
