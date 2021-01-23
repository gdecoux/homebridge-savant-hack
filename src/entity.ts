export interface SavantEntity {
  id: number;
  zoneID: number;
  name: string;
  addresses: string;
  entityType: 'Dimmer' | 'Scene' | 'Switch';
  pressCommand?: string;
  holdCommand?: string;
  releaseCommand?: string;
  togglePressCommand?: string;
  toggleHoldCommand?: string;
  toggleReleaseCommand?: string;
  dimmerCommand?: string;
  fadeTime?: string;
  delayTime?: string;
  stateName?: string;
  lightsArOn?: number;
  roomLightsControl?: string;
  orderValue?: number;
  isSceneable?: number;
}