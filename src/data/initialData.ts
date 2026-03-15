import { Task, Memory, Achievement, TimelineEvent } from '../types';

export const initialTasks: Task[] = [
  { id: 't1', title: 'Ir para igreja (semanal)', category: 'ESPIRITUAL & BEM-ESTAR', status: 'Planejado' },
  { id: 't2', title: 'Rezar diariamente', category: 'ESPIRITUAL & BEM-ESTAR', status: 'Em Progresso' },
  { id: 't3', title: 'Jejum de dopamina / meditação (2x por semana)', category: 'ESPIRITUAL & BEM-ESTAR', status: 'Planejado' },
  { id: 't4', title: 'Momento de gratidão juntos aos domingos', category: 'ESPIRITUAL & BEM-ESTAR', status: 'Planejado' },
  { id: 't5', title: 'Começar a correr juntos (3x por semana)', category: 'SAÚDE & ATIVIDADE FÍSICA', status: 'Planejado' },
  { id: 't6', title: 'Alongamento juntos após atividade', category: 'SAÚDE & ATIVIDADE FÍSICA', status: 'Planejado' },
  { id: 't7', title: 'Ir ao Muve Indoor / parque de trampolim (1x por mês)', category: 'SAÚDE & ATIVIDADE FÍSICA', status: 'Planejado' },
  { id: 't8', title: 'Ir em um luau', category: 'LAZER & EXPERIÊNCIAS', status: 'Planejado' },
  { id: 't9', title: 'Fazer picnic', category: 'LAZER & EXPERIÊNCIAS', status: 'Planejado' },
  { id: 't10', title: 'Ver nascer ou pôr do sol', category: 'LAZER & EXPERIÊNCIAS', status: 'Planejado' },
  { id: 't11', title: 'Ir ao Floripa Comedy Club', category: 'LAZER & EXPERIÊNCIAS', status: 'Planejado' },
  { id: 't12', title: 'Ir ao Hard Rock Cafe', category: 'LAZER & EXPERIÊNCIAS', status: 'Planejado' },
  { id: 't13', title: 'Ir à Ironberg', category: 'LAZER & EXPERIÊNCIAS', status: 'Planejado' },
  { id: 't14', title: 'Ir em parque aquático', category: 'LAZER & EXPERIÊNCIAS', status: 'Planejado' },
  { id: 't15', title: 'Fim de semana em hotel / chalé / spa', category: 'LAZER & EXPERIÊNCIAS', status: 'Planejado' },
  { id: 't16', title: 'Aniversário de namoro 04/03', category: 'DATAS & CELEBRAÇÕES', status: 'Planejado' },
  { id: 't17', title: 'Comemorar dia do casal todo mês', category: 'DATAS & CELEBRAÇÕES', status: 'Em Progresso' },
  { id: 't18', title: 'Surpresa simples (flor / chocolate / carta)', category: 'DATAS & CELEBRAÇÕES', status: 'Planejado' },
  { id: 't19', title: 'Postar foto surpresa', category: 'DATAS & CELEBRAÇÕES', status: 'Planejado' },
  { id: 't20', title: 'Economizar dinheiro todo mês', category: 'FINANÇAS & FUTURO', status: 'Em Progresso' },
  { id: 't21', title: 'Criar fundo para viagens', category: 'FINANÇAS & FUTURO', status: 'Planejado' },
  { id: 't22', title: 'Revisar finanças do casal mensalmente', category: 'FINANÇAS & FUTURO', status: 'Planejado' },
  { id: 't23', title: 'Dizer bom dia e boa noite', category: 'COMUNICAÇÃO & CONEXÃO', status: 'Em Progresso' },
  { id: 't24', title: 'Dizer "eu te amo" todos os dias', category: 'COMUNICAÇÃO & CONEXÃO', status: 'Em Progresso' },
  { id: 't25', title: 'Momento de abraço / cafuné / carinho', category: 'COMUNICAÇÃO & CONEXÃO', status: 'Em Progresso' },
  { id: 't26', title: 'Contar como foi o dia', category: 'COMUNICAÇÃO & CONEXÃO', status: 'Em Progresso' },
  { id: 't27', title: 'Conversar quando algo incomodar', category: 'COMUNICAÇÃO & CONEXÃO', status: 'Em Progresso' },
  { id: 't28', title: 'Ter empatia', category: 'COMUNICAÇÃO & CONEXÃO', status: 'Em Progresso' },
  { id: 't29', title: 'Escolher destino', category: 'PLANEJAMENTO DE VIAGEM', status: 'Planejado' },
  { id: 't30', title: 'Definir orçamento', category: 'PLANEJAMENTO DE VIAGEM', status: 'Planejado' },
  { id: 't31', title: 'Reservar hospedagem', category: 'PLANEJAMENTO DE VIAGEM', status: 'Planejado' },
  { id: 't32', title: 'Planejar roteiro', category: 'PLANEJAMENTO DE VIAGEM', status: 'Planejado' },
];

export const initialMemories: Memory[] = [
  {
    id: 'm1',
    photoUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop',
    title: 'Nosso Primeiro Encontro',
    description: 'O dia em que tudo começou.',
    date: '2023-03-04'
  },
  {
    id: 'm2',
    photoUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop',
    title: 'Viagem para a Praia',
    description: 'Fim de semana inesquecível de sol e mar.',
    date: '2023-11-15'
  }
];

export const initialAchievements: Achievement[] = [
  { id: 'a1', title: '1 Ano de Namoro', description: 'Completamos nosso primeiro ano juntos!', date: '2024-03-04', icon: 'Heart' },
  { id: 'a2', title: 'Primeira Viagem', description: 'Nossa primeira viagem de avião juntos.', date: '2023-11-15', icon: 'Plane' },
  { id: 'a3', title: 'Fundo de Viagem Iniciado', description: 'Começamos a poupar para nosso futuro.', date: '2024-01-10', icon: 'PiggyBank' },
];

export const initialTimeline: TimelineEvent[] = [
  { id: 'tl1', title: 'O Início', description: 'Nosso primeiro beijo e o começo de tudo.', date: '2023-03-04', type: 'milestone' },
  { id: 'tl2', title: 'Pedido de Namoro', description: 'Oficializamos nossa relação com um jantar especial.', date: '2023-04-10', type: 'date' },
  { id: 'tl3', title: 'Primeira Viagem', description: 'Fomos para a praia no feriado.', date: '2023-11-15', type: 'trip' },
];
