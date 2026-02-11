
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Users, Briefcase, ArrowRight, ExternalLink,
  ChevronRight, Info, Download, Share2, History, Zap, Check,
  Monitor, Search, Plus, FileText, X, ChevronDown,
  AlertTriangle, MoreHorizontal, FolderOpen, Upload, Layers, Clock, 
  MousePointer2, CheckSquare, FileType, ListChecks, HelpCircle, Save
} from 'lucide-react';
import { TabType } from './types.ts';
import { TABS_CONFIG } from './constants.tsx';
import StepCard from './components/StepCard.tsx';
import InfoBox from './components/InfoBox.tsx';
import GSGALogo from './components/Logo.tsx';

// --- COMPONENTES DE SIMULAÇÃO DE INTERFACE (NOMES ÚNICOS) ---

const UI_Header_Mock = ({ title }: { title: string }) => (
  <div className="bg-[#2c2c2c] text-white p-2 px-4 text-[9px] font-black uppercase flex justify-between items-center">
    <span>{title}</span>
    <div className="flex gap-2">
      <div className="w-2 h-2 rounded-full bg-red-500"></div>
      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
      <div className="w-2 h-2 rounded-full bg-green-500"></div>
    </div>
  </div>
);

const UI_LegalOne_Search = () => (
  <div className="h-full bg-white flex flex-col border">
    <div className="bg-gray-100 p-2 border-b text-[8px] font-bold text-gray-400">Home > Serviços > Pesquisa</div>
    <div className="p-4 space-y-4">
      <div className="space-y-1">
        <label className="text-[7px] font-black uppercase text-gray-400">Código do Serviço / Pasta</label>
        <div className="flex gap-2">
          <input readOnly value="0009126" className="flex-grow border-2 border-[#00867D]/30 p-2 text-[10px] font-bold text-[#00867D] bg-teal-50" />
          <button className="bg-[#08201F] text-white px-4 py-1 rounded text-[8px] font-black uppercase">Pesquisar</button>
        </div>
      </div>
      <div className="border rounded overflow-hidden">
        <table className="w-full text-[8px]">
          <tr className="bg-gray-50 border-b"><th className="p-2 text-left">Status</th><th className="p-2 text-left">Pasta</th><th className="p-2 text-right">Ação</th></tr>
          <tr><td className="p-2"><span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span></td><td className="p-2 font-bold">Serv-0009126</td><td className="p-2 text-right"><span className="text-[#00867D] font-black">Ver</span></td></tr>
        </table>
      </div>
    </div>
  </div>
);

const UI_HighQ_Form = ({ onAction }: { onAction: (m: string) => void }) => (
  <div className="h-full bg-white flex flex-col">
    <UI_Header_Mock title="GSGA - Nova Solicitação" />
    <div className="p-4 space-y-3 overflow-y-auto">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[7px] font-black text-gray-400">CLIENTE</label>
          <input readOnly value="IBEMA COMPANHIA BRASILEIRA" className="w-full border p-2 text-[9px] font-bold" />
        </div>
        <div className="space-y-1">
          <label className="text-[7px] font-black text-gray-400">TIPO DEMANDA</label>
          <div className="border p-2 text-[9px] font-bold flex justify-between items-center">Societário <ChevronDown size={12}/></div>
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-[7px] font-black text-gray-400">LINK PASTA (Sincronização Pág. 8)</label>
        <button 
          onClick={() => onAction("Abrindo Seletor de Pastas... Use CTRL+F para filtrar por código!")}
          className="w-full bg-black text-white p-2 text-[9px] font-black uppercase tracking-widest"
        >
          Selecionar Pastas
        </button>
      </div>
      <div className="pt-4 border-t flex justify-end">
        <button onClick={() => onAction("Solicitação enviada para a Fila de Distribuição!")} className="bg-[#00867D] text-white px-6 py-2 rounded text-[9px] font-black uppercase">Enviar</button>
      </div>
    </div>
  </div>
);

const UI_Queue_Manager = ({ onAction }: { onAction: (m: string) => void }) => (
  <div className="h-full bg-white flex flex-col">
    <div className="bg-[#08201F] text-white p-2 px-4 flex gap-4 text-[8px] font-black uppercase">
      <span className="opacity-40">Home</span>
      <span className="opacity-40">Documentos</span>
      <span className="border-b border-[#00867D] pb-1">Fila</span>
    </div>
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-[10px] font-black uppercase">Distribuição de Demanda</h4>
        <button className="bg-black text-white px-3 py-1 rounded text-[8px] font-bold">+ Adicionar</button>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-50 p-2 border-b flex justify-between items-center">
          <span className="text-[8px] font-black">IBEMA - M&A SOCIETÁRIO</span>
          <button 
            onClick={() => onAction("Pág 11: Editando Responsáveis, Revisores e Gestores...")}
            className="text-[8px] font-black text-[#00867D] border border-[#00867D] px-2 py-0.5 rounded"
          >
            EDITAR
          </button>
        </div>
        <div className="p-3 bg-teal-50/20 text-[8px] space-y-2">
          <div className="flex justify-between"><span>Responsável:</span> <span className="font-bold">Pendente</span></div>
          <div className="flex justify-between"><span>Revisor:</span> <span className="font-bold">Pendente</span></div>
        </div>
      </div>
    </div>
  </div>
);

const UI_File_Actions = ({ onAction }: { onAction: (m: string) => void }) => (
  <div className="h-full bg-white flex flex-col">
    <div className="p-3 border-b flex justify-between items-center bg-gray-50">
      <div className="flex gap-2">
        <div className="px-2 py-1 bg-black text-white text-[7px] font-black rounded">CARREGAR</div>
        <div className="px-2 py-1 border text-[7px] font-black rounded">NOVO</div>
      </div>
    </div>
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between p-3 border rounded-xl hover:bg-teal-50 transition-colors group">
        <div className="flex items-center gap-3">
          <FileText size={18} className="text-blue-500" />
          <div className="flex flex-col">
            <span className="text-[9px] font-black">Contrato_Social_v2.docx</span>
            <span className="text-[7px] text-gray-400 italic">Modificado por Ivan Hasse</span>
          </div>
        </div>
        <button onClick={() => onAction("Pág 16: Menu de ações aberto!")} className="p-1 hover:bg-gray-200 rounded-lg">
          <MoreHorizontal size={14} />
        </button>
      </div>
      {/* Alerta de Word pág 18-19 */}
      <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex gap-3">
        <Monitor size={16} className="text-amber-600 shrink-0" />
        <p className="text-[8px] font-medium text-amber-800">
          <strong>Atenção (Pág 18):</strong> No Word Desktop, você DEVE salvar e fechar para que o HighQ receba a atualização.
        </p>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.VISAO_GERAL);
  const [isScrolled, setIsScrolled] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const notify = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 5000);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case TabType.VISAO_GERAL:
        return (
          <div className="animate-slide-up space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <InfoBox title="Fluxo Operacional (Pág. 13)" variant="workflow">
                <div className="space-y-6 pt-4">
                  {[
                    { t: "Legal One", d: "Ponto de partida para busca de serviços e pastas." },
                    { t: "Site HIGHQ", d: "Onde ocorre a mágica documental e a gestão de filas." },
                    { t: "Formulário de Demanda", d: "Cadastro técnico da atividade (Sincronizado via API)." },
                    { t: "Esteira de Trabalho", d: "Movimentação entre Desenvolvedor, Revisor e Gestor." },
                    { t: "Gestão de Arquivos", d: "Edição, Versão (Redline) e Auditoria." }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4 group cursor-help" onClick={() => notify(`Manual GSGA: ${step.t}`)}>
                      <div className="w-10 h-10 rounded-full bg-[#00867D]/10 text-[#00867D] flex items-center justify-center font-black shrink-0 group-hover:bg-[#00867D] group-hover:text-white transition-all">
                        {i+1}
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-[#08201F] uppercase tracking-wider">{step.t}</h4>
                        <p className="text-xs text-gray-400 font-medium">{step.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </InfoBox>

              <div className="space-y-8">
                <InfoBox title="Definição de Filas (Pág. 12)" variant="info">
                  <div className="grid grid-cols-1 gap-4 mt-4">
                    {[
                      { n: "Distribuição", d: "Atividades que aguardam alocação de equipe pelo gestor." },
                      { n: "Desenvolvimento", d: "Fila individual do advogado para execução técnica." },
                      { n: "Revisão", d: "Aguardando validação do revisor técnico ou gestor." },
                      { n: "Concluídas", d: "Histórico de demandas finalizadas com sucesso." }
                    ].map((q, i) => (
                      <div key={i} className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-[#00867D]"></div>
                        <div>
                          <p className="text-[10px] font-black text-[#00867D] uppercase">{q.n}</p>
                          <p className="text-xs text-gray-500 font-medium">{q.d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </InfoBox>
              </div>
            </div>
          </div>
        );

      case TabType.ACESSAR:
        return (
          <div className="animate-slide-up">
            <StepCard 
              step={{
                number: 1,
                title: "Busca de Serviço no Legal One",
                description: "Manual pág. 3 - Acesso Inicial",
                visual: "🔍 Menu Serviços → Pesquisa Simples → Código 0009126",
                details: "Para localizar a pasta correta, utilize sempre o código numérico. O sistema permite Pesquisa Avançada com múltiplos filtros se necessário.",
                proTip: "Pág 3: Ao clicar no número do serviço, o botão 'Abrir no HighQ' aparecerá na aba HIGHQ."
              }} 
              visualContent={<UI_LegalOne_Search />}
            />
          </div>
        );

      case TabType.CRIAR:
        return (
          <div className="animate-slide-up space-y-12">
            <StepCard 
              step={{
                number: 2,
                title: "Formulário de Demanda",
                description: "Manual págs. 5 a 7 - Cadastro",
                visual: "📋 Solicitações → Nova Solicitação → Preencher Dados",
                details: "O formulário é preenchido automaticamente via API. Você deve validar o Nome do Cliente e o Tipo de Demanda.",
                proTip: "Pág 7: O nome do cliente deve ser IDÊNTICO ao do Legal One."
              }} 
              visualContent={<UI_HighQ_Form onAction={notify} />}
            />
            <InfoBox title="Atalho de Produtividade (Pág. 8)" variant="success">
              <div className="flex gap-6 items-center">
                <div className="bg-black text-white p-6 rounded-3xl font-black text-2xl shadow-xl">CTRL + F</div>
                <p className="text-sm font-medium leading-relaxed">
                  Na tela de <strong>Selecionar Pastas</strong>, expanda toda a árvore e use este atalho para encontrar o número do serviço rapidamente entre centenas de pastas.
                </p>
              </div>
            </InfoBox>
          </div>
        );

      case TabType.DISTRIBUIR:
        return (
          <div className="animate-slide-up">
            <StepCard 
              step={{
                number: 3,
                title: "Alocação de Equipe",
                description: "Manual págs. 10 a 11 - Gestão",
                visual: "👥 Menu Fila → Distribuição → Editar Demanda",
                details: "Nesta etapa o Gestor define quem será o Desenvolvedor (execução) e o Revisor (conferência técnica).",
                proTip: "Pág 11: Após alocar, você deve marcar 'Distribuição realizada' para a atividade sair da fila de pendentes."
              }} 
              visualContent={<UI_Queue_Manager onAction={notify} />}
            />
          </div>
        );

      case TabType.DESENVOLVER:
        return (
          <div className="animate-slide-up">
            <StepCard 
              step={{
                number: 4,
                title: "Execução da Atividade",
                description: "Manual pág. 13 e 14 - Operação",
                visual: "📂 Fila Desenvolvimento → Link da Pasta → Abrir",
                details: "Ao clicar no 'Link da Pasta', o HighQ abre o ambiente de arquivos específico daquele serviço. Para mudar o status, dê dois cliques na coluna Status.",
                proTip: "Pág 14: Use o duplo clique para agilizar a movimentação entre fases (ex: Aguardando Revisão)."
              }} 
              visualContent={<UI_File_Actions onAction={notify} />}
            />
          </div>
        );

      case TabType.ARQUIVOS:
        return (
          <div className="animate-slide-up space-y-12">
            <StepCard 
              step={{
                number: 5,
                title: "Trabalhando com Documentos",
                description: "Manual págs. 16 a 21 - Auditoria e Edição",
                visual: "⋮ Menu do Arquivo → Baixar | Versões | Redline",
                details: "O menu lateral permite ver o 'Version Histórico' (Pág 21), onde você pode comparar duas versões e gerar um diferencial.",
                proTip: "Pág 20: O Redline é uma linha vermelha que mostra exatamente o que mudou entre as versões."
              }} 
              visualContent={<UI_File_Actions onAction={notify} />}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-white border border-gray-100 rounded-[3rem] shadow-xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><Monitor size={100}/></div>
                 <h4 className="text-[#08201F] font-black text-xl mb-4 uppercase">Word Desktop (Pág 18)</h4>
                 <ul className="text-sm font-medium text-gray-500 space-y-3">
                   <li className="flex gap-2"><Check size={16} className="text-[#00867D]"/> Abre o aplicativo nativo no PC</li>
                   <li className="flex gap-2"><Check size={16} className="text-[#00867D]"/> Apenas um usuário por vez</li>
                   <li className="flex gap-2 font-black text-[#F0554A] italic"><AlertTriangle size={16}/> DEVE salvar e fechar para sincronizar</li>
                 </ul>
              </div>
              <div className="p-8 bg-white border border-gray-100 rounded-[3rem] shadow-xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><Save size={100}/></div>
                 <h4 className="text-[#08201F] font-black text-xl mb-4 uppercase">Word Web (Pág 19)</h4>
                 <ul className="text-sm font-medium text-gray-500 space-y-3">
                   <li className="flex gap-2"><Check size={16} className="text-[#00867D]"/> Edição simultânea por vários usuários</li>
                   <li className="flex gap-2"><Check size={16} className="text-[#00867D]"/> Salvamento automático em tempo real</li>
                   <li className="flex gap-2 font-black text-[#00867D]"><Zap size={16}/> Sincronização imediata com HIGHQ</li>
                 </ul>
              </div>
            </div>
          </div>
        );

      case TabType.FAQ:
        return (
          <div className="animate-slide-up grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { q: "O que acontece após 4 horas sem salvar?", a: "Pág 18: O HIGHQ possui um tempo limite de inatividade. O documento será fechado com o último salvamento.", i: <Clock/> },
              { q: "O que é Redline / Cópia Marcada?", a: "Pág 20: É o diferencial visual entre duas versões, gerado automaticamente para mostrar alterações.", i: <Layers/> },
              { q: "Qual o limite de upload?", a: "Pág 16: É possível carregar múltiplos arquivos simultaneamente através do botão 'Carregar'.", i: <Upload/> },
              { q: "Posso criar arquivos novos direto no HighQ?", a: "Pág 16: Sim, através do botão 'Novo' você cria documentos Word, Excel ou PPT sem sair da plataforma.", i: <FileType/> }
            ].map((item, idx) => (
              <div key={idx} className="p-10 bg-white rounded-[3rem] border border-gray-50 shadow-sm hover:shadow-2xl transition-all cursor-default">
                <div className="w-14 h-14 bg-teal-50 text-[#00867D] rounded-2xl flex items-center justify-center mb-6">{item.i}</div>
                <h4 className="text-lg font-black text-[#08201F] mb-3">{item.q}</h4>
                <p className="text-sm text-gray-400 font-medium leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F3EF]">
      {/* Header Fixo */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-700 ${
        isScrolled ? 'bg-[#08201F]/98 backdrop-blur-2xl py-3 shadow-2xl' : 'bg-[#08201F] py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button onClick={() => setActiveTab(TabType.VISAO_GERAL)} className="flex items-center gap-6 group">
             <GSGALogo className="h-10 md:h-12" variant="light" />
             <div className="hidden lg:block h-10 w-[1px] bg-white/10 mx-2"></div>
             <div className="hidden lg:block">
                <h2 className="text-xs font-black text-[#00867D] tracking-widest uppercase mb-1">HighQ Operation Manual</h2>
                <p className="text-[9px] text-white/30 font-bold uppercase tracking-[0.2em]">Versão 1.0 • Fev 2026</p>
             </div>
          </button>
          <div className="flex gap-4">
             <button className="hidden sm:block px-6 py-2 border border-white/10 rounded-full text-[10px] text-white/50 font-black uppercase tracking-widest hover:border-[#00867D] hover:text-white transition-all">
                Manual Completo (21 Pág)
             </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-48 pb-20 bg-[#08201F] rounded-b-[5rem] relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-[#00867D] rounded-full blur-[150px]"></div>
         </div>
         <div className="max-w-7xl mx-auto px-6 relative z-10 text-center lg:text-left">
            <h1 className="text-5xl lg:text-8xl font-black text-white leading-none tracking-tighter mb-8">
               Domine a <br/> <span className="text-[#00867D]">Esteira HighQ.</span>
            </h1>
            <p className="text-white/40 text-lg lg:text-xl font-medium max-w-2xl leading-relaxed">
               Guia didático interativo para advogados e gestores do Gaia Silva Gaede. 
               Extraído das 21 páginas de instruções operacionais.
            </p>
         </div>
      </section>

      {/* Navegação por Módulos */}
      <div className="max-w-7xl mx-auto px-6 -mt-10 mb-20 relative z-30">
        <nav className="glass-card p-4 rounded-[3rem] shadow-3xl flex items-center gap-2 overflow-x-auto no-scrollbar border border-white/40">
          {TABS_CONFIG.map((tab) => (
            <button
              key={tab.type}
              onClick={() => setActiveTab(tab.type)}
              className={`flex items-center gap-4 px-8 py-5 rounded-[2rem] text-[10px] font-black tracking-widest uppercase transition-all duration-500 whitespace-nowrap ${
                activeTab === tab.type 
                  ? 'bg-[#00867D] text-white shadow-2xl scale-105 -translate-y-1' 
                  : 'text-gray-400 hover:text-[#08201F] hover:bg-white/60 active:scale-95'
              }`}
            >
              {tab.icon}
              {tab.type}
            </button>
          ))}
        </nav>
      </div>

      <main className="max-w-7xl mx-auto px-6 pb-40 min-h-[600px]">
        {renderContent()}
      </main>

      <footer className="bg-[#08201F] text-white py-20 rounded-t-[5rem] text-center border-t border-white/5">
         <GSGALogo className="h-10 mb-8" variant="light" />
         <p className="opacity-20 text-[9px] font-black tracking-[0.6em] uppercase">© 2026 Gaia Silva Gaede Advogados • Estratégia Digital</p>
      </footer>

      {toast && (
        <div className="fixed bottom-10 right-10 z-[100] animate-slide-up">
          <div className="bg-[#08201F] text-white px-8 py-5 rounded-3xl shadow-3xl border border-[#00867D] flex items-center gap-5">
             <div className="w-10 h-10 bg-[#00867D] rounded-2xl flex items-center justify-center shadow-lg"><Info size={20}/></div>
             <p className="text-xs font-black uppercase tracking-widest leading-relaxed">{toast}</p>
             <button onClick={() => setToast(null)} className="ml-4 hover:rotate-90 transition-transform"><X size={18}/></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
