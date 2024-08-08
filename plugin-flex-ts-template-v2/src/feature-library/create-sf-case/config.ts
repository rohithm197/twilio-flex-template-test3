import { getFeatureFlags } from '../../utils/configuration';
import CreateSfCaseConfig from './types/ServiceConfiguration';

const { enabled = false } = (getFeatureFlags()?.features?.create_sf_case as CreateSfCaseConfig) || {};

export const isFeatureEnabled = () => {
  return enabled;
};
