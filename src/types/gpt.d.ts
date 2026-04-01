/** Minimal typings for GPT loaded from https://securepubads.g.doubleclick.net/tag/js/gpt.js */

export type GptSize = [number, number];

export type GptMultiSize = GptSize[];

export interface GoogletagSlot {
  addService(service: unknown): GoogletagSlot;
}

export interface GoogletagPubAdsService {
  collapseEmptyDivs(): void;
}

export interface Googletag {
  cmd: {
    push(callback: () => void): void;
  };
  defineSlot(adUnitPath: string, size: GptMultiSize | GptSize, divId: string): GoogletagSlot | null;
  pubads(): GoogletagPubAdsService;
  enableServices(): void;
  display(divId: string): void;
}

declare global {
  interface Window {
    googletag?: Googletag;
  }
}

export {};
