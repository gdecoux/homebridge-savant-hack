/* eslint-disable @typescript-eslint/no-explicit-any */
import child_process from 'child_process';

const clipath = '/Users/RPM/Applications/RacePointMedia/sclibridge';

export function readState(
  args: string[],
  cb: (error?: Error | null | undefined, value?: any) => void,
) {
  const child = child_process.spawn(clipath, ['readstate', ...args]);
  let outString = '';

  child.on('error', (error) => cb(error));

  child.stdout.on('data', (data) => {
    outString += String(data);
  });

  child.on('exit', () => {
    if (cb) {
      cb(null, outString);
    }
  });
}

export function serviceRequest(
  args: string[],
  cb: (error?: Error | null | undefined, value?: any) => void,
) {
  const child = child_process.spawn(clipath, ['servicerequest', ...args]);
  let outString = '';

  child.on('error', (error) => cb(error));

  child.stdout.on('data', (data) => {
    outString += String(data);
  });

  child.on('exit', () => {
    if (cb) {
      cb(null, outString);
    }
  });
}
