export type ConversationShareRole = 'user' | 'agent' | 'notification';

export interface ConversationShareMessage {
  id: string;
  role: ConversationShareRole;
  text: string;
  time: string;
  date: string;
}

export interface ConversationShareSnapshot {
  version: 1;
  id: string;
  createdAt: string;
  messages: ConversationShareMessage[];
  revoked: boolean;
}

const STORAGE_PREFIX = 'alva-demo-conversation-share:';

export function createConversationShareId(): string {
  const random = typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID().replace(/-/g, '')
    : `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;
  return random.slice(0, 20);
}

export function saveConversationShare(snapshot: ConversationShareSnapshot): void {
  localStorage.setItem(`${STORAGE_PREFIX}${snapshot.id}`, JSON.stringify(snapshot));
}

export function readConversationShare(id: string): ConversationShareSnapshot | null {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${id}`);
    if (!raw) return null;
    const snapshot = JSON.parse(raw) as ConversationShareSnapshot;
    if (
      snapshot.version !== 1
      || snapshot.id !== id
      || typeof snapshot.createdAt !== 'string'
      || typeof snapshot.revoked !== 'boolean'
      || !Array.isArray(snapshot.messages)
      || snapshot.messages.length === 0
      || snapshot.messages.length > 10
      || snapshot.messages.some((message) => (
        typeof message?.id !== 'string'
        || !['user', 'agent', 'notification'].includes(message.role)
        || typeof message.text !== 'string'
        || typeof message.time !== 'string'
        || typeof message.date !== 'string'
      ))
    ) return null;
    return snapshot;
  } catch {
    return null;
  }
}

export function revokeConversationShare(id: string): ConversationShareSnapshot | null {
  const snapshot = readConversationShare(id);
  if (!snapshot) return null;
  const revoked = { ...snapshot, revoked: true };
  try {
    saveConversationShare(revoked);
    return revoked;
  } catch {
    return null;
  }
}

export function buildConversationShareUrl(id: string): string {
  const basePath = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
  return `${window.location.origin}${basePath}#share/${id}`;
}
