/* eslint-disable eqeqeq */
import {
  CharacteristicGetCallback,
  CharacteristicSetCallback,
  CharacteristicValue,
  PlatformAccessory,
  Service,
} from 'homebridge';
import { getDimmerCmd } from '../cmd';
import { SavantEntity } from '../entity';
import { SavantPlatform } from '../platform';
import { readState, serviceRequest } from '../savant';

export class SavantDimmer {
  private service: Service;

  constructor(
    private readonly platform: SavantPlatform,
    private readonly accessory: PlatformAccessory,
    private readonly entity: SavantEntity,
  ) {
    this.service =
      this.accessory.getService(this.platform.Service.Lightbulb) ||
      this.accessory.addService(this.platform.Service.Lightbulb);

    this.service.getCharacteristic(this.platform.Characteristic.Manufacturer) ||
      this.service.addCharacteristic(this.platform.Characteristic.Manufacturer);

    this.service.setCharacteristic(this.platform.Characteristic.Manufacturer, this.entity.zoneID);

    this.service
      .getCharacteristic(this.platform.Characteristic.On)
      .on('set', this.setOn.bind(this))
      .on('get', this.getOn.bind(this));

    this.service
      .getCharacteristic(this.platform.Characteristic.Brightness)
      .on('set', this.setBrightness.bind(this))
      .on('get', this.getBrightness.bind(this));
  }

  private setOn(value: CharacteristicValue, callback: CharacteristicSetCallback) {
    serviceRequest(getDimmerCmd(this.entity, value ? 100 : 0), (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  }

  private getOn(callback: CharacteristicGetCallback) {
    readState([this.entity.stateName!], (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result == 0 ? false : true);
      }
    });
  }

  private setBrightness(value: CharacteristicValue, callback: CharacteristicSetCallback) {
    serviceRequest(getDimmerCmd(this.entity, value as number), (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  }

  private getBrightness(callback: CharacteristicGetCallback) {
    readState([this.entity.stateName!], (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, Number(result));
      }
    });
  }
}
