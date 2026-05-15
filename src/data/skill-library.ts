/**
 * [INPUT]: NewChat mock (PRIMARY/OTHERS/COMMUNITY templates)
 * [OUTPUT]: 统一 SkillEntry 数据源，分三组：mine / alva / kol
 * [POS]: SkillPickerPopover 共用数据层
 */

import {
  PRIMARY_TEMPLATES,
  OTHERS_TEMPLATES,
  COMMUNITY_TEMPLATES,
  type NewChatTemplate,
  type CommunitySkillTemplate,
} from './new-chat-mock';

export type SkillCategory = 'mine' | 'alva' | 'kol';

export interface SkillEntry {
  id: string;
  name: string;
  description: string;
  category: SkillCategory;
  creator: string;
  /** true → render Avatar(creator); false → render CdnIcon(icon) */
  kol?: boolean;
  icon?: string;
  tags?: string[];
  updatedAt?: string;
}

function toSkill(t: NewChatTemplate, forced?: SkillCategory): SkillEntry {
  const category: SkillCategory = forced ?? (t.creator === 'Alva' ? 'alva' : 'kol');
  return {
    id: t.id,
    name: t.label,
    description: t.description,
    category,
    creator: t.creator,
    kol: t.kol,
    icon: t.icon,
    tags: (t as CommunitySkillTemplate).tags,
    updatedAt: (t as CommunitySkillTemplate).updatedAt,
  };
}

/** mock 当前登录用户自己的 skill */
export const MY_SKILLS: SkillEntry[] = [
  {
    id: 'my-crypto-alerts',
    name: 'My Crypto Alerts',
    description: 'Custom price alert system for BTC, ETH, and selected altcoins with on-chain signals.',
    category: 'mine',
    creator: 'YGGYLL',
    kol: true,
    tags: ['Alerts', 'On-chain'],
    updatedAt: '2d ago',
  },
  {
    id: 'my-dram-monitor',
    name: 'DRAM Price Monitor',
    description: 'Track DRAM spot prices and supply chain signals for semiconductor sector analysis.',
    category: 'mine',
    creator: 'YGGYLL',
    kol: true,
    tags: ['Semis', 'Supply Chain'],
    updatedAt: '5d ago',
  },
];

const FROM_MOCK: SkillEntry[] = [
  ...PRIMARY_TEMPLATES.map((t) => toSkill(t)),
  ...OTHERS_TEMPLATES.map((t) => toSkill(t)),
  ...COMMUNITY_TEMPLATES.map((t) => toSkill(t, 'kol')),
];

/** 全库：mine + alva + kol */
export const SKILL_LIBRARY: SkillEntry[] = [...MY_SKILLS, ...FROM_MOCK];

export function groupSkills(list: SkillEntry[]): Record<SkillCategory, SkillEntry[]> {
  const groups: Record<SkillCategory, SkillEntry[]> = { mine: [], alva: [], kol: [] };
  for (const s of list) groups[s.category].push(s);
  return groups;
}

export const CATEGORY_LABELS: Record<SkillCategory, string> = {
  mine: 'My Skills',
  alva: 'Alva Built-in',
  kol: 'KOL Skills',
};
