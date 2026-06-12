/**
 * [INPUT]: 无
 * [OUTPUT]: Agent Channel 的共享类型与 tone 色板常量
 * [POS]: agent-channel 数据层的类型根 — 各数据/组件文件均从此导入
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

/* ========== 基础枚举 ========== */

/** demo 的语义色 tone（与 theme.css 的 --main-m* 值不同，因此用 TS 常量而非 CSS var） */
export type Tone = 'teal' | 'blue' | 'orange' | 'green' | 'red' | 'amber';

export type ConceptId = 'A' | 'R' | 'K';
export type TabId = 'chat' | 'tasks' | 'memory' | 'alerts' | 'files';

/* ========== tone 色板（源自 demo planc 1846-1847 行） ========== */

export const TONE_BG: Record<Tone, string> = {
  teal: 'rgba(73,163,166,0.12)',
  blue: 'rgba(87,119,200,0.12)',
  orange: 'rgba(217,122,58,0.13)',
  green: 'rgba(45,143,97,0.12)',
  red: 'rgba(224,83,87,0.12)',
  amber: 'rgba(184,134,47,0.13)',
};

export const TONE_FG: Record<Tone, string> = {
  teal: '#49A3A6',
  blue: '#5777c8',
  orange: '#d97a3a',
  green: '#2d8f61',
  red: '#e05357',
  amber: '#b8862f',
};

/* ========== Skill（SkillHub 展示数据，源自 demo planc 1164-1391 行） ========== */

export type SkillKind = 'automation' | 'playbook';
export type TaskType = 'Research' | 'Automation' | 'Playbook';

export interface PreviewChart { label: string; value: string; points: number[] }
export interface PreviewRow { t: string; v: string; c: string; up: boolean }
export interface PreviewMatch { t: string; note: string; tag: string }

/** gallery 项 — playbook 形态用 s/points/tickers/stat，automation 形态用 rule/every/sample */
export interface SkillGalleryItem {
  t: string;
  s?: string; tone?: Tone; points?: number[]; tickers?: string[]; stat?: string;
  rule?: string; every?: string; sample?: string;
}

/** 推荐订阅项（一键 subscribe 列表） */
export interface SkillSub {
  t: string; creator: string; subscribers: string;
  tone?: Tone; points?: number[]; meta?: string; stat?: string;
  every?: string; desc?: string;
}

/** 实时预览卡（轮播）— playbook 用 chart/rows/stats，automation 用 rule/lastRun/matches/push */
export interface SkillPreviewItem {
  t: string; creator: string; subscribers: string; tone: Tone; cadence: string;
  meta?: string; every?: string; fresh?: boolean;
  chart?: PreviewChart; rows?: PreviewRow[]; stats?: [string, string][];
  rule?: string; lastRun?: string; matches?: PreviewMatch[]; push?: string;
}

export interface Skill {
  id: string; label: string; icon: string; tone: Tone; creator: string; kind: SkillKind;
  blurb: string; prompt: string; prompts: string[];
  gallery: SkillGalleryItem[];
  subs?: SkillSub[];
  previews?: SkillPreviewItem[];
}

/* ========== 实体选择（EntityPicker / 自动化模板共用） ========== */

export interface PickableEntity {
  name: string;
  handle: string;
  focus?: string;
  stat?: string;
}

/* ========== Alerts（带推送的自动化）与 Files（生成的文件） ========== */

export interface AutomationCustom {
  mode: 'template' | 'instruction';
  tpl: string;
  entities: string[];
  prompt: string;
  instruction: string;
  deliver: string;
}

export interface Automation {
  id: string;
  name: string;
  status: 'active' | 'paused';
  lastRun: string;
  runEvery: string;
  runs: number;
  usedBy: [string, string][];
  custom?: AutomationCustom;
}

export interface ArtifactFile {
  kind: string;
  tone: Tone;
  t: string;
  b: string;
  badge: string;
  badgeKind: '' | 'green' | 'amber';
}

/* ========== 后台任务（Tasks tab 的子代理会话） ========== */

export type TaskKind = 'Playbook' | 'Automation' | 'Research' | 'Backtest' | 'Monitor';
export type TaskStatus = 'running' | 'needs-input' | 'done' | 'queued';

export interface TaskStep { t: string; done?: boolean; now?: boolean }

export interface Task {
  id: string;
  type: TaskKind;
  tone: Tone;
  title: string;
  status: TaskStatus;
  meta: string;
  steps?: TaskStep[];
  /** needs-input 态的提问 */
  ask?: string;
  /** done 态的产物文件名 */
  output?: string;
}

export interface TaskThreadMsg { role: 'user' | 'agent'; text: string }

/* ========== 聊天消息（ExtraThread 的追加消息流） ========== */

/** subpush 卡片可来自预览卡或订阅项 — 取两者的结构交集 */
export type SubpushItem = {
  t: string; tone?: Tone; cadence?: string; meta?: string; every?: string; fresh?: boolean;
  push?: string; rows?: PreviewRow[]; chart?: PreviewChart;
};

export type Reply =
  | { kind: 'answer'; paras: string[] }
  | { kind: 'task'; taskType: TaskType; tone: Tone; title: string; sub?: string; steps?: string[]; status?: 'done'; doneNote?: string }
  | { kind: 'building'; title: string; sub: string }
  | { kind: 'imrec' }
  | { kind: 'subpush'; item: SubpushItem; skillKind: SkillKind };

export interface ExtraMsg {
  id: number;
  role: 'user' | 'typing' | 'agent';
  text?: string;
  reply?: Reply;
  /** 标记为推送消息（带 pushed badge 与卡片边框） */
  push?: boolean;
}

/* ========== 频道元信息 ========== */

export interface ConceptMeta {
  id: ConceptId;
  label: string;
  /** chat stage 内容列的最大宽度（px） */
  width: number;
}

export interface ImMeta {
  id: 'telegram' | 'discord' | 'whatsapp' | 'slack';
  label: string;
  icon: string;
  handle: string;
  sub: string;
}

export type ImId = ImMeta['id'];
