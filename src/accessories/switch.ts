/* eslint-disable eqeqeq */
import {
  CharacteristicGetCallback,
  CharacteristicSetCallback,
  CharacteristicValue,
  PlatformAccessory,
  Service,
} from 'homebridge';
import { getSwitchCmd } from '../cmd';
import { SavantEntity } from '../entity';
import { SavantPlatform } from '../platform';
import { readState, serviceRequest } from '../savant';

export class SavantSwitch {
  private service: Service;

  constructor(
    protected readonly platform: SavantPlatform,
    protected readonly accessory: PlatformAccessory,
    protected readonly entity: SavantEntity,
  ) {
    this.service =
      this.accessory.getService(this.platform.Service.Switch) ||
      this.accessory.addService(this.platform.Service.Switch);

    this.service.getCharacteristic(this.platform.Characteristic.Manufacturer) ||
      this.service.addCharacteristic(this.platform.Characteristic.Manufacturer);

    this.service.setCharacteristic(this.platform.Characteristic.Manufacturer, this.entity.zoneID);

    this.service
      .getCharacteristic(this.platform.Characteristic.On)
      .on('set', this.setOn.bind(this))
      .on('get', this.getOn.bind(this));
  }

  protected setOn(value: CharacteristicValue, callback: CharacteristicSetCallback) {
    this.platform.logger.info(getSwitchCmd(this.entity, value as boolean).join(' '));

    serviceRequest(getSwitchCmd(this.entity, value as boolean), (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  }

  protected getOn(callback: CharacteristicGetCallback) {
    readState([this.entity.stateName!], (err, result) => {
      if (err) {
        callback(err);
      } else {
        this.platform.logger.info(this.entity.stateName!, result, result == 0 ? false : true);
        const value = Number(result);
        let bool: boolean;
        if (value === 0) {
          bool = false;
        } else if (value === 1 || value > 0) {
          bool = true;
        } else {
          this.platform.logger.error('INVALID getOn: ', result);
          bool = false;
        }

        callback(null, bool);
      }
    });
  }
}
