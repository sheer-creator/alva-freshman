import { useEffect, useState, useCallback } from 'react';

export type AgentPlatform = 'telegram' | 'discord';

const PLATFORMS_KEY = 'agentPlatforms';
const ACTIVE_KEY = 'agentActivePlatform';
const LEGACY_PLATFORM_KEY = 'agentPlatform';
const LEGACY_CONNECTED_KEY = 'agentConnected';
const EVENT = 'agent-connected-change';

const ALL: readonly AgentPlatform[] = ['telegram', 'discord'];

type State = { platforms: AgentPlatform[]; active: AgentPlatform | null };

function read(): State {
  try {
    let platforms: AgentPlatform[] = [];
    const raw = localStorage.getItem(PLATFORMS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        platforms = parsed.filter((p): p is AgentPlatform => ALL.includes(p));
      }
    } else {
      const legacy = localStorage.getItem(LEGACY_PLATFORM_KEY);
      if (legacy === 'telegram' || legacy === 'discord') platforms = [legacy];
      else if (localStorage.getItem(LEGACY_CONNECTED_KEY) === '1') platforms = ['telegram'];
    }
    const stored = localStorage.getItem(ACTIVE_KEY) as AgentPlatform | null;
    const active: AgentPlatform | null =
      stored && platforms.includes(stored) ? stored : (platforms[0] ?? null);
    return { platforms, active };
  } catch { return { platforms: [], active: null }; }
}

function write(platforms: AgentPlatform[], active: AgentPlatform | null) {
  try {
    if (platforms.length > 0) localStorage.setItem(PLATFORMS_KEY, JSON.stringify(platforms));
    else localStorage.removeItem(PLATFORMS_KEY);
    if (active) localStorage.setItem(ACTIVE_KEY, active);
    else localStorage.removeItem(ACTIVE_KEY);
    localStorage.removeItem(LEGACY_PLATFORM_KEY);
    localStorage.removeItem(LEGACY_CONNECTED_KEY);
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

export function useAgentPlatforms(): {
  platforms: AgentPlatform[];
  active: AgentPlatform | null;
  has: (p: AgentPlatform) => boolean;
  connect: (p: AgentPlatform) => void;
  disconnect: (p: AgentPlatform) => void;
  toggle: (p: AgentPlatform) => void;
  setActive: (p: AgentPlatform) => void;
  set: (platforms: AgentPlatform[], active?: AgentPlatform | null) => void;
} {
  const [state, setLocal] = useState<State>(read);

  useEffect(() => {
    const onChange = () => setLocal(read());
    window.addEventListener(EVENT, onChange);
    window.addEventListener('storage', onChange);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener('storage', onChange);
    };
  }, []);

  const connect = useCallback((p: AgentPlatform) => {
    const cur = read();
    if (cur.platforms.includes(p)) { write(cur.platforms, p); return; }
    write([...cur.platforms, p], cur.active ?? p);
  }, []);

  const disconnect = useCallback((p: AgentPlatform) => {
    const cur = read();
    if (!cur.platforms.includes(p)) return;
    const nextPlatforms = cur.platforms.filter(x => x !== p);
    const nextActive = cur.active === p ? (nextPlatforms[0] ?? null) : cur.active;
    write(nextPlatforms, nextActive);
  }, []);

  const toggle = useCallback((p: AgentPlatform) => {
    const cur = read();
    if (cur.platforms.includes(p)) {
      const nextPlatforms = cur.platforms.filter(x => x !== p);
      const nextActive = cur.active === p ? (nextPlatforms[0] ?? null) : cur.active;
      write(nextPlatforms, nextActive);
    } else {
      write([...cur.platforms, p], cur.active ?? p);
    }
  }, []);

  const setActive = useCallback((p: AgentPlatform) => {
    const cur = read();
    if (cur.platforms.includes(p)) write(cur.platforms, p);
  }, []);

  const set = useCallback((platforms: AgentPlatform[], active?: AgentPlatform | null) => {
    const pick = active !== undefined ? active : (platforms[0] ?? null);
    const resolved = pick && platforms.includes(pick) ? pick : (platforms[0] ?? null);
    write(platforms, resolved);
  }, []);

  const has = useCallback((p: AgentPlatform) => state.platforms.includes(p), [state]);

  return {
    platforms: state.platforms,
    active: state.active,
    has,
    connect,
    disconnect,
    toggle,
    setActive,
    set,
  };
}

export function useAgentConnected(): [boolean, (value: boolean) => void] {
  const { platforms, set } = useAgentPlatforms();
  const setConnected = useCallback((value: boolean) => {
    set(value ? ['telegram'] : [], value ? 'telegram' : null);
  }, [set]);
  return [platforms.length > 0, setConnected];
}
