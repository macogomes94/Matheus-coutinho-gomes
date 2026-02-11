
import React, { useState } from 'react';
import { ChevronRight, ArrowRight, Monitor } from 'lucide-react';
import { Step } from '../types.ts';

interface StepCardProps {
  step: Step;
  visualContent?: React.ReactNode;
}

const StepCard: React.FC<StepCardProps> = ({ step, visualContent }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`group mb-8 rounded-[2.5rem] transition-all duration-700 overflow-hidden ${
        isExpanded ? 'shadow-2xl ring-2 ring-[#00867D]/10 bg-white' : 'shadow-sm hover:shadow-xl bg-white/80'
      } relative border border-transparent hover:border-gray-200`}
    >
      <div className={`absolute left-0 top-0 bottom-0 w-2 transition-colors duration-500 ${
        step.alert ? 'bg-[#F0554A]' : (isExpanded ? 'bg-[#00867D]' : 'bg-gray-100 group-hover:bg-[#00867D]/20')
      }`} />

      <div className="p-8 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Texto de Instrução */}
          <div className="flex-grow space-y-6 max-w-xl">
            <div className="flex items-center gap-5">
              <div 
                className={`flex-shrink-0 w-16 h-16 rounded-[1.5rem] flex items-center justify-center font-black text-xl text-white shadow-xl transform transition-transform duration-500 group-hover:rotate-6 ${
                  step.alert ? 'bg-gradient-to-br from-[#F0554A] to-[#D32F2F]' : 'bg-gradient-to-br from-[#00867D] to-[#08201F]'
                }`}
              >
                {step.number}
              </div>
              <div>
                <h3 className={`text-2xl font-black tracking-tight leading-tight mb-1 ${step.alert ? 'text-[#F0554A]' : 'text-[#08201F]'}`}>
                  {step.title}
                </h3>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">{step.description}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              {step.visual.split('→').map((part, i, arr) => (
                <React.Fragment key={i}>
                  <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                    step.alert 
                      ? 'bg-[#F0554A]/5 text-[#F0554A] border border-[#F0554A]/10' 
                      : 'bg-[#F5F3EF] text-gray-500 border border-transparent group-hover:border-[#00867D]/20 group-hover:text-[#00867D]'
                  }`}>
                    {part.trim()}
                  </span>
                  {i < arr.length - 1 && <ArrowRight size={12} className="text-gray-300" />}
                </React.Fragment>
              ))}
            </div>

            {isExpanded && (
              <div className="animate-slide-up text-[#08201F]/70 leading-relaxed text-sm font-medium pt-4 border-t border-gray-100">
                {step.details}
              </div>
            )}
          </div>

          {/* Interface Simulada */}
          {visualContent && (
            <div className={`w-full lg:w-[540px] transform transition-all duration-700 ${isExpanded ? 'scale-105' : 'opacity-80 scale-100 group-hover:opacity-100'}`}>
              <div className="bg-[#08201F] rounded-[2rem] p-1 shadow-2xl overflow-hidden border border-white/10 ring-8 ring-gray-50">
                <div className="flex items-center justify-between p-3 px-5 bg-white/5 border-b border-white/5">
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#F0554A]/40"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00867D]/40"></div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-[8px] text-white/30 font-mono tracking-tighter">
                    <Monitor size={10} /> HIGHQ GSGA INTERFACE
                  </div>
                </div>
                <div className="bg-white min-h-[220px] relative overflow-hidden transition-all duration-500">
                  {visualContent}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="absolute right-8 top-10 text-gray-200 transition-all duration-500 group-hover:text-[#00867D]">
        <div className={`p-3 rounded-full border border-gray-100 bg-white shadow-sm ${isExpanded ? 'rotate-90 bg-[#00867D] text-white border-transparent' : ''}`}>
           <ChevronRight size={20} />
        </div>
      </div>
    </div>
  );
};

export default StepCard;
