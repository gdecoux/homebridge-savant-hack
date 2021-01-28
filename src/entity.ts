export interface SavantEntity {
  id: number;
  zoneID: number;
  name: string;
  addresses: string;
  entityType: 'Dimmer' | 'Scene' | 'Switch';
  stateName: string;
  pressCommand?: string;
  holdCommand?: string;
  releaseCommand?: string;
  togglePressCommand?: string;
  toggleHoldCommand?: string;
  toggleReleaseCommand?: string;
  dimmerCommand?: string;
  fadeTime?: string;
  delayTime?: string;
  lightsArOn?: number;
  roomLightsControl?: string;
  orderValue?: number;
  isSceneable?: number;
}
