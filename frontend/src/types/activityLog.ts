export type EntradaLog = {
  id: string;
  acao: "criou" | "editou" | "deletou";
  nomeImpressora: string;
  dataHora: Date;
};