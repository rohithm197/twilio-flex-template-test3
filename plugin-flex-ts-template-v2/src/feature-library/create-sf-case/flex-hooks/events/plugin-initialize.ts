import * as Flex from '@twilio/flex-ui';
import { isSalesForce } from '../../utils/salesforce';
import { loadScript } from '../../utils/load-script'
import { FlexEvent } from '../../../../types/feature-loader';
//import TaskRouterService from '../../../../utils/serverless/TaskRouter/TaskRouterService';
//TaskRouterService.updateTaskAttributes(taskSid, newAttribute);

//const sfdcBaseUrl = window.location.ancestorOrigins[0]

export const eventName = FlexEvent.pluginsInitialized;//FlexEvent.taskAccepted;
export const eventHook = async function initializeSalesforceOpenCtiscript(
  flex: typeof Flex,
  manager: Flex.Manager,
  //task: Flex.ITask,
) {
  // your code here
  const sfdcBaseUrl = window.location.ancestorOrigins[0]
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
await loadScript(sfApiUrl)
if (!(window as any).sforce) {
    console.log('Saleforce cannot be found')
    return
} else {
    //console.log('Adding salesforce listener..')
    //(window as any).sforce.opencti.onClickToDial({ listener: sfClicklistener })
}
    
}