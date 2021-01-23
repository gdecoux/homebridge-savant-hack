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
    private readonly platform: SavantPlatform,
    private readonly accessory: PlatformAccessory,
    private readonly entity: SavantEntity,
  ) {
    this.service =
      this.accessory.getService(this.platform.Service.Lightbulb) ||
      this.accessory.addService(this.platform.Service.Lightbulb);

    this.service
      .getCharacteristic(this.platform.Characteristic.On)
      .on('set', this.setOn.bind(this))
      .on('get', this.getOn.bind(this));
  }

  private setOn(value: CharacteristicValue, callback: CharacteristicSetCallback) {
    serviceRequest(getSwitchCmd(this.entity), (err) => {
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
}
