import type { Googletag, GptMultiSize } from "@/types/gpt";

export type PendingGptSlot = {
  elementId: string;
  adUnitPath: string;
  sizes: GptMultiSize;
};

const pending = new Map<string, PendingGptSlot>();
let flushScheduled = false;
let servicesEnabled = false;

function ensureGptStub() {
  if (!window.googletag) {
    window.googletag = { cmd: [] } as unknown as Googletag;
  }
}

function runFlush(snapshot: Map<string, PendingGptSlot>) {
  if (typeof window === "undefined" || snapshot.size === 0) {
    return;
  }

  ensureGptStub();
  const googletag = window.googletag!;

  googletag.cmd.push(() => {
    snapshot.forEach((def) => {
      googletag.defineSlot(def.adUnitPath, def.sizes, def.elementId)?.addService(googletag.pubads());
    });

    if (!servicesEnabled) {
      googletag.pubads().collapseEmptyDivs();
      googletag.enableServices();
      servicesEnabled = true;
    }

    snapshot.forEach((def) => {
      googletag.display(def.elementId);
    });
  });
}

function scheduleFlush() {
  if (flushScheduled) {
    return;
  }
  flushScheduled = true;
  queueMicrotask(() => {
    flushScheduled = false;
    if (pending.size === 0) {
      return;
    }
    const snapshot = new Map(pending);
    pending.clear();
    runFlush(snapshot);
  });
}

/** Register a slot; definitions are flushed in a microtask batch so enableServices runs after all defineSlot calls. */
export function registerGptSlot(def: PendingGptSlot) {
  if (typeof window === "undefined") {
    return;
  }
  ensureGptStub();
  pending.set(def.elementId, def);
  scheduleFlush();
}

/** Remove a slot before the next flush (e.g. React Strict Mode unmount). */
export function unregisterGptSlot(elementId: string) {
  pending.delete(elementId);
}
