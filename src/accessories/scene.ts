import {
  CharacteristicValue,
  CharacteristicSetCallback,
  CharacteristicGetCallback,
} from 'homebridge';
import { getSceneCmd } from '../cmd';
import { serviceRequest, readState } from '../savant';
import { SavantSwitch } from './switch';

export class SavantScene extends SavantSwitch {
  protected setOn(value: CharacteristicValue, callback: CharacteristicSetCallback) {
    this.platform.logger.info(getSceneCmd(this.entity).join(' '));

    serviceRequest(getSceneCmd(this.entity), (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  }

  protected getOn(callback: CharacteristicGetCallback) {
    this.platform.logger.info(this.entity.stateName!);

    readState([this.entity.stateName!], (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result == 0 ? false : true);
      }
    });
  }
}
