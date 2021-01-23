import { SavantEntity } from './entity';

const DEFAULT_ZONE = 'Grant';
const DEFAULT_SOURCE_COMPONENT = 'Lighting Controller';
const DEFAULT_SOURCE_LOGICAL_COMPONENT = 'Lighting_controller';
const DEFAULT_SERVICE_VARIANT = 1;
const DEFAULT_SERVICE_TYPE = 'SVC_ENV_LIGHTING';

export function getSwitchCmd({ addresses }: SavantEntity) {
  const args = addresses.split(',');
  const addressArgs: string[] = [];

  for (let i = 0; i < args.length; i++) {
    addressArgs[i] = 'Address' + (i + 1);
    addressArgs[i + 1] = args[addresses[i]] || '';
  }

  return [
    DEFAULT_ZONE,
    DEFAULT_SOURCE_COMPONENT,
    DEFAULT_SOURCE_LOGICAL_COMPONENT,
    DEFAULT_SERVICE_VARIANT.toString(),
    DEFAULT_SERVICE_TYPE,
    'ButtonPressAndRelease',
    ...addressArgs,
  ];
}

export function getDimmerCmd({ addresses }: SavantEntity, value: number) {
  const args = addresses.split(',');
  const addressArgs: string[] = [];

  for (let i = 0; i < args.length; i++) {
    addressArgs[i] = 'Address' + (i + 1);
    addressArgs[i + 1] = args[addresses[i]] || '';
  }

  return [
    DEFAULT_ZONE,
    DEFAULT_SOURCE_COMPONENT,
    DEFAULT_SOURCE_LOGICAL_COMPONENT,
    DEFAULT_SERVICE_VARIANT.toString(),
    DEFAULT_SERVICE_TYPE,
    'DimmerSet',
    ...addressArgs,
    'DimmerLevel',
    value.toString(),
  ];
}
