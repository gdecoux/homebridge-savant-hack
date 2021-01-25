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
