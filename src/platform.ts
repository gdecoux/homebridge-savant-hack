import {
  API,
  Logger,
  Service,
  Characteristic,
  DynamicPlatformPlugin,
  PlatformAccessory,
} from 'homebridge';
import { SavantDimmer, SavantScene, SavantSwitch } from './accessories';
import { SavantPlatformConfig } from './config';
import { SavantEntity } from './entity';
import { PLATFORM_NAME, PLUGIN_NAME } from './settings';

export class SavantPlatform implements DynamicPlatformPlugin {
  public readonly Service: typeof Service = this.api.hap.Service;
  public readonly Characteristic: typeof Characteristic = this.api.hap.Characteristic;

  public readonly accessories: Map<string, PlatformAccessory> = new Map();

  constructor(
    public readonly logger: Logger,
    public readonly config: SavantPlatformConfig,
    public readonly api: API,
  ) {
    this.logger.debug('Finished initializing platform:', this.config.name);

    this.api.on('didFinishLaunching', () => {
      this.logger.debug('Executed didFinishLaunching callback');
      // run the method to discover / register your devices as accessories
      this.registerDevices();
    });
  }

  configureAccessory(accessory: PlatformAccessory): void {
    this.logger.info('Loading accessory from cache:', accessory.displayName);

    this.accessories.set(accessory.UUID, accessory);
  }

  registerDevices() {
    if (!this.config.entities) {
      this.logger.info('No entities in config');
      return;
    }

    for (const entity of this.config.entities) {
      const uuid = this.api.hap.uuid.generate(entity.name);
      const existingAccessory = this.accessories.get(uuid);

      if (existingAccessory) {
        this.logger.info('Restoring existing accessory from cache:', existingAccessory.displayName);
        this.api.updatePlatformAccessories([existingAccessory]);
      } else {
        const accessory = new this.api.platformAccessory(entity.name, uuid);
        this.api.registerPlatformAccessories(PLUGIN_NAME, PLUGIN_NAME, [accessory]);
        this.accessories.set(accessory.UUID, accessory);
      }

      this.addAccessory(entity);
    }
  }

  private addAccessory(entity: SavantEntity) {
    const uuid = this.api.hap.uuid.generate(entity.name);
    const accessory = this.accessories.get(uuid);

    switch (entity.entityType) {
      case 'Dimmer':
        new SavantDimmer(this, accessory!, entity);
        break;
      case 'Scene':
        new SavantScene(this, accessory!, entity);
        break;
      case 'Switch':
        new SavantSwitch(this, accessory!, entity);
        break;
      default:
        break;
    }
  }
}
