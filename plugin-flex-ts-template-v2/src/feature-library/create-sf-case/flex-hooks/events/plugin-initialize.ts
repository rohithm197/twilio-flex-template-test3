import * as Flex from '@twilio/flex-ui';
import { isSalesForce } from '../../utils/salesforce';
import { loadScript } from '../../utils/load-script'
import { FlexEvent } from '../../../../types/feature-loader';
//import TaskRouterService from '../../../../utils/serverless/TaskRouter/TaskRouterService';
//TaskRouterService.updateTaskAttributes(taskSid, newAttribute);

export const eventName = FlexEvent.pluginsInitialized;//FlexEvent.taskAccepted;
export const eventHook = async function initializeSalesforceOpenCtiscript(
  flex: typeof Flex,
  manager: Flex.Manager,
  //task: Flex.ITask,
) {
  // your code here
  console.log('create-sf-case initialize called');
  const sfdcBaseUrl = window.location.ancestorOrigins[0]
  console.log('create-sf-case initialize called - sfdcBaseUrl'+sfdcBaseUrl);

  flex.AgentDesktopView.defaultProps.showPanel2 = false;//To remove CRM Block in the Flex UI
  
if (!isSalesForce(sfdcBaseUrl)) {
    console.log(
    'Not initializing Salesforce since this instance has been launched independently...'
    )
    return
}
/*let salesforcepayload
var sfClicklistener = function (payload) {
    console.log('salesforce payload data onclick is ' + payload)
    salesforcepayload = payload
}*/
const sfApiUrl = `${sfdcBaseUrl}/support/api/53.0/lightning/opencti_min.js`
console.log('create-sf-case initialize called - sfApiUrl'+sfApiUrl);
await loadScript(sfApiUrl)
if (!(window as any).sforce) {
    console.log('Saleforce cannot be found')
    return
} else {
    //console.log('Adding salesforce listener..')
    //(window as any).sforce.opencti.onClickToDial({ listener: sfClicklistener })
}
    
}