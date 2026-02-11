
import React from 'react';
import { 
  FileText, 
  Unlock, 
  Edit3, 
  Users, 
  Clock, 
  Settings, 
  HelpCircle
} from 'lucide-react';
import { TabType } from './types.ts';

export const COLORS = {
  greenDark: '#08201F',
  tealVibrant: '#00867D',
  coral: '#F0554A',
  bege: '#F5F3EF',
  tealLight: '#E0F2F1',
  coralLight: '#FFEBEE',
  successLight: '#E8F5E9',
  infoLight: '#E3F2FD'
};

export const TABS_CONFIG = [
  { type: TabType.VISAO_GERAL, icon: <FileText size={20} /> },
  { type: TabType.ACESSAR, icon: <Unlock size={20} /> },
  // Fixed: Removed non-existent TabType.INCLUIR and TabType.STATUS to align with types.ts and App.tsx logic
  { type: TabType.CRIAR, icon: <Edit3 size={20} /> },
  { type: TabType.DISTRIBUIR, icon: <Users size={20} /> },
  { type: TabType.DESENVOLVER, icon: <Clock size={20} /> },
  { type: TabType.ARQUIVOS, icon: <Settings size={20} /> },
  { type: TabType.FAQ, icon: <HelpCircle size={20} /> },
];
