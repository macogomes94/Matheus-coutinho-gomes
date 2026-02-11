
import React from 'react';
import { Target, ClipboardList, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';
import { COLORS } from '../constants.tsx';

interface InfoBoxProps {
  title: string;
  variant: 'info' | 'workflow' | 'attention' | 'success';
  children: React.ReactNode;
}

const InfoBox: React.FC<InfoBoxProps> = ({ title, variant, children }) => {
  const getStyles = () => {
    switch (variant) {
      case 'info':
        return { 
          bg: 'from-[#E0F2F1] to-white', 
          accent: '#00867D', 
          icon: <Target className="text-[#00867D]" size={28} />,
          label: 'Insight'
        };
      case 'workflow':
        return { 
          bg: 'from-[#F5F3EF] to-white', 
          accent: '#08201F', 
          icon: <ClipboardList className="text-[#08201F]" size={28} />,
          label: 'Processo'
        };
      case 'attention':
        return { 
          bg: 'from-[#FFEBEE] to-white', 
          accent: '#F0554A', 
          icon: <AlertTriangle className="text-[#F0554A]" size={28} />,
          label: 'Crítico'
        };
      case 'success':
        return { 
          bg: 'from-[#E8F5E9] to-white', 
          accent: '#2E7D32', 
          icon: <CheckCircle className="text-[#2E7D32]" size={28} />,
          label: 'Concluído'
        };
      default:
        return { bg: 'from-gray-50 to-white', accent: '#000', icon: <Lightbulb size={28} />, label: 'Dica' };
    }
  };

  const styles = getStyles();

  return (
    <div 
      className={`p-8 rounded-[2rem] border border-white shadow-xl bg-gradient-to-br ${styles.bg} mb-10 transition-all duration-300 hover:scale-[1.01]`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-2xl shadow-sm">
            {styles.icon}
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 mb-1" style={{ color: styles.accent }}>{styles.label}</p>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#08201F]">
              {title}
            </h2>
          </div>
        </div>
      </div>
      <div className="space-y-3 font-medium text-[#08201F]/80">
        {children}
      </div>
    </div>
  );
};

export default InfoBox;
