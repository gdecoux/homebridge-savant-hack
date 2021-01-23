import { PlatformConfig } from 'homebridge';
import { SavantEntity } from './entity';

type Config = {
  entities?: SavantEntity[];
};

export type SavantPlatformConfig = PlatformConfig & Config;
