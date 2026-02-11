
import { ReactNode } from 'react';

export enum TabType {
  VISAO_GERAL = 'Visão Geral',
  ACESSAR = '1. Acesso',
  CRIAR = '2. Solicitação',
  DISTRIBUIR = '3. Distribuição',
  DESENVOLVER = '4. Execução',
  ARQUIVOS = '5. Documentos',
  FAQ = 'Dúvidas e Regras'
}

export interface Step {
  number: number;
  title: string;
  description: string;
  visual: string;
  details?: ReactNode;
  alert?: boolean;
  proTip?: string;
}

export interface QueueDefinition {
  name: string;
  description: string;
  icon: ReactNode;
}
