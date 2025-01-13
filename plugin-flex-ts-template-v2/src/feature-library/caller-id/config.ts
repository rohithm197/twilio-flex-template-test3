import { getFeatureFlags } from '../../utils/configuration';
import CallerIdConfig from './types/ServiceConfiguration';

const { enabled = false, include_outgoing_only_numbers = true } =
  (getFeatureFlags()?.features?.caller_id as CallerIdConfig) || {};

const callerIdList = getFeatureFlags()?.common.callerIddata;
console.log('callerIdList--', JSON.stringify(callerIdList));

const callerIdPLCountry = getFeatureFlags()?.common.callerIdPLCountry;
console.log({ callerIdPLCountry, common: getFeatureFlags() });

export const isFeatureEnabled = () => {
  return enabled;
};

export const isOutgoingOnlyNumbersEnabled = () => {
  return include_outgoing_only_numbers;
};

export const getCommonFeatureDetails = () => {
  return getFeatureFlags().common || {};
};

export const getCallerIdPLCountry = () => {
  return getFeatureFlags()?.common?.callerIdPLCountry || {};
};

export { callerIdList };
