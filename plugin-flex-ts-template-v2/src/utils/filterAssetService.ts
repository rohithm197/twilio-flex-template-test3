import ApiService from '../utils/serverless/ApiService';
import { getAssetServerlessDomain, isFeatureEnabled } from '../../../../../config';

class FilterAssetService extends ApiService {
  assetServerlessDomain;

  constructor() {
    super();
    this.assetServerlessDomain = getAssetServerlessDomain();

    if (isFeatureEnabled() && !this.assetServerlessDomain) {
      console.error('asset_serverless_domain is not set in flex config');
    }
  }

  getConfigAsset = async () => {
    const encodedParams = {
      Token: encodeURIComponent(this.manager.user.token),
    };

    return this.fetchJsonWithReject(`https://${this.assetServerlessDomain}/queues.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: this.buildBody(encodedParams),
    });
  };
}

export default new FilterAssetService();