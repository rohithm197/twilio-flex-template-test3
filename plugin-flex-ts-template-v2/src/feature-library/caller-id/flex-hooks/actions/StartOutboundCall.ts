import * as Flex from '@twilio/flex-ui';
import parsePhoneNumber from 'libphonenumber-js';

import { FlexActionEvent, FlexAction } from '../../../../types/feature-loader';
import {
  callerIdList,
  getCallerIdDACHCountry,
  getCallerIdCEBIILCountry,
  getCallerIdCEBICountry,
  getCallerIdPLCountry,
  getCallerIdPLBIZCountry,
  getCallerIdAFCountry,
  getCallerIdBENELUXCountry,
  getCallerIdNordicsCountry,
  getCallerIdTurkeyCountry,
  getTurkeySipUrl,
} from '../../config';

export const actionEvent = FlexActionEvent.before;
export const actionName = FlexAction.StartOutboundCall;

export const actionHook = function applySelectedCallerIdForDialedNumbers(flex: typeof Flex, manager: Flex.Manager) {
  flex.Actions.addListener(`${actionEvent}${actionName}`, async (payload, _abortFunction) => {
    // Fetch logged-in worker details
    const loggedInWorkerLocation = manager.workerClient?.attributes.location;
    const workerTeamName = manager.workerClient?.attributes.team_name;
    const dynamicCallerId = manager.workerClient?.attributes.caller_id;
    const dynamicQueueSid = manager.workerClient?.attributes.caller_queuesid;

    console.log('Worker team name:', workerTeamName);
    console.log('Worker location:', loggedInWorkerLocation);

    const destinationPhoneNumber = parsePhoneNumber(payload.destination);
    let destinationCountryCode = destinationPhoneNumber?.country;

    console.log('Destination phone number:', destinationPhoneNumber?.formatInternational());
    console.log('Destination country code:', destinationCountryCode);
    // const workerLocationPoland = loggedInWorkerLocation?.includes('PL');
    // const workerLocationPLHUB = loggedInWorkerLocation?.includes('PLHUB');
    const workerLocationPoland = loggedInWorkerLocation == 'PL';
    const workerLocationPLHUB = loggedInWorkerLocation == 'PLHUB';
    const workerLocationPLBIZ = loggedInWorkerLocation == 'PLBIZ';
    const workerLocationDACH = loggedInWorkerLocation == 'DACH';
    const workerLocationCEBIIL = loggedInWorkerLocation == 'CEBIIL';
    const workerLocationCEBI = loggedInWorkerLocation == 'CEBI';
    const workerLocationBENELUX = loggedInWorkerLocation == 'BENELUX';
    const workerLocationNordics = loggedInWorkerLocation == 'NORDICS';
    const workerLocationAF =
      loggedInWorkerLocation == 'GH' || loggedInWorkerLocation == 'MA' || loggedInWorkerLocation == 'ZA';

    const callerIdFallback = callerIdList[loggedInWorkerLocation];
    const workerTeamNamePLHUB = workerTeamName === 'EMEA Hub Team';
    const workerTeamNamePLBIZ = workerTeamName === 'PL-iTero-BizOps-UK';
    const workerLocationTurkey = loggedInWorkerLocation == 'TURKEY';

    console.log('Is Worker in PLHUB?', workerLocationPLHUB);
    console.log('Is Worker part of EMEA Hub Team?', workerTeamNamePLHUB);

    if (workerLocationPoland && workerTeamName !== 'EMEA Hub Team') {
      // Logic for Poland-based worker locations
      const callerIdPLCountry = getCallerIdPLCountry();
      let callerIdData = null;

      // Set callerIdData based on team name
      if (workerTeamName === 'PL-Distributor Support') {
        callerIdData = callerIdPLCountry['PlDistributor'];
      } else if (workerTeamName === 'PL-iTero TechSupport') {
        callerIdData = callerIdPLCountry['PLIteroTechSupport'];
      } else if (workerTeamName === 'PL-iTero Onboarding') {
        callerIdData = callerIdPLCountry['PLIteroTechOnboarding'];
      } else if (workerTeamName === 'PL-Treat Team') {
        callerIdData = callerIdPLCountry['PLTreatTeam'];
        destinationCountryCode = 'PL';
      }

      if (callerIdData && destinationCountryCode && callerIdData[destinationCountryCode]) {
        // Assign caller ID and queue SID based on the destination country code
        payload.callerId = callerIdData[destinationCountryCode]?.phoneNumber;
        payload.queueSid = callerIdData[destinationCountryCode]?.queueSid;
        console.log(`Assigned callerId: ${payload.callerId}, queueSid: ${payload.queueSid}`);
      } else {
        // Fallback to default callerId if no match is found
        payload.callerId = callerIdFallback?.phoneNumber || dynamicCallerId;
        payload.queueSid = callerIdFallback?.queueSid || dynamicQueueSid;
        console.log('Falling back to default callerId and queueSid.');
      }
    } else if (workerLocationDACH) {
      // Logic for DACH-based worker locations
      const callerIdDACHCountry = getCallerIdDACHCountry();
      let callerIdDACHData = null;

      // Set callerIdData based on team name
      if (workerTeamName === 'DACH-Treat Team') {
        callerIdDACHData = callerIdDACHCountry['DACHTreatTeam'];
      } else if (
        workerTeamName === 'DACH-iTero Tech Support' ||
        workerTeamName === 'DACH-iTero Onboarding' ||
        workerTeamName === 'DACH-iTero TechSupport onboarding'
      ) {
        callerIdDACHData = callerIdDACHCountry['DACHiTeroTechSupport'];
      } else if (workerTeamName === 'DACH-Invisalign CS' || workerTeamName === 'DACH-Invisalign Sales Support') {
        callerIdDACHData = callerIdDACHCountry['DACHInvisalignCS'];
      } else if (workerTeamName === 'DACH-Clinical Commercial') {
        callerIdDACHData = callerIdDACHCountry['DACHClinicalCommercial'];
      } else if (workerTeamName === 'DACH-Credit Collections') {
        callerIdDACHData = callerIdDACHCountry['DACHCreditCollections'];
      }

      if (callerIdDACHData && destinationCountryCode && callerIdDACHData[destinationCountryCode]) {
        // Assign caller ID and queue SID based on the destination country code
        payload.callerId = callerIdDACHData[destinationCountryCode]?.phoneNumber;
        payload.queueSid = callerIdDACHData[destinationCountryCode]?.queueSid;
        console.log(`DACH Assigned callerId: ${payload.callerId}, queueSid: ${payload.queueSid}`);
      } else {
        // Fallback to DACH location
        const DefaultDACHLocation = callerIdList['CH']; // Default fallback to Switzerland location
        payload.callerId = DefaultDACHLocation?.phoneNumber || dynamicCallerId;
        payload.queueSid = DefaultDACHLocation?.queueSid || dynamicQueueSid;
        console.log(
          ` FROM DACH Assigned fallback callerId and queueSid for CH location: ${payload.callerId}, queueSid: ${payload.queueSid}`,
        );
      }
    } else if (workerLocationCEBIIL) {
      const callerIdCEBIIsraelCountry = getCallerIdCEBIILCountry();
      let callerIdCEBIData = null;

      if (workerTeamName === 'CEBI-IL-Customer Support') {
        callerIdCEBIData = callerIdCEBIIsraelCountry['CEBIILCustomerSupport'];
      } else if (workerTeamName === 'CEBI-IL-Tech Support') {
        callerIdCEBIData = callerIdCEBIIsraelCountry['CEBIILTechSupport'];
      }

      if (callerIdCEBIData && destinationCountryCode && callerIdCEBIData[destinationCountryCode]) {
        payload.callerId = callerIdCEBIData[destinationCountryCode].phoneNumber;
        payload.queueSid = callerIdCEBIData[destinationCountryCode].queueSid;
        console.log(`CEBI assigned callerId: ${payload.callerId}, queueSid: ${payload.queueSid}`);
        return;
      }

      const defaultCEBI = callerIdList['IL'];
      payload.callerId = defaultCEBI?.phoneNumber || dynamicCallerId;
      payload.queueSid = defaultCEBI?.queueSid || dynamicQueueSid;
      console.log(`CEBI fallback to IL: ${payload.callerId}, ${payload.queueSid}`);
      return;
    } else if (workerLocationCEBI) {
      const callerIdCEBICountry = getCallerIdCEBICountry();
      let callerIdCEBIData = null;

      if (workerTeamName === 'CEBI-Customer Support') {
        callerIdCEBIData = callerIdCEBICountry['CEBICustomerSupport'];
      } else if (workerTeamName === 'CEBI-Clinical Commercial') {
        callerIdCEBIData = callerIdCEBICountry['CEBIClinicalCommercial'];
      } else if (workerTeamName === 'CEBI-Treat Team') {
        callerIdCEBIData = callerIdCEBICountry['CEBITreatTeam'];
      } else if (workerTeamName === 'CEBI-iTero Tech Support') {
        callerIdCEBIData = callerIdCEBICountry['CEBIiTeroTechSupport'];
      } else if (workerTeamName === 'CEBI-iTero Onboarding') {
        callerIdCEBIData = callerIdCEBICountry['CEBIiTeroOnbooarding'];
      }

      if (callerIdCEBIData && destinationCountryCode && callerIdCEBIData[destinationCountryCode]) {
        payload.callerId = callerIdCEBIData[destinationCountryCode].phoneNumber;
        payload.queueSid = callerIdCEBIData[destinationCountryCode].queueSid;
        console.log(`CEBI assigned callerId: ${payload.callerId}, queueSid: ${payload.queueSid}`);
        return;
      }

      const defaultCEBI = callerIdList['PL']; //
      payload.callerId = defaultCEBI?.phoneNumber || dynamicCallerId;
      payload.queueSid = defaultCEBI?.queueSid || dynamicQueueSid;
      console.log(`CEBI fallback to PL: ${payload.callerId}, ${payload.queueSid}`);
      return;
    } else if (workerLocationAF) {
      const callerIdAFCountry = getCallerIdAFCountry();
      let callerIdAFData = null;

      if (workerTeamName === 'AFRICA-GH-Customer Support') {
        callerIdAFData = callerIdAFCountry['AFRICAGHCustomerSupport'];
      } else if (workerTeamName === 'AFRICA-GH-Tech Support') {
        callerIdAFData = callerIdAFCountry['AFRICAGHTechSupport'];
      } else if (workerTeamName === 'AFRICA-SSA-Clinical Commercial') {
        callerIdAFData = callerIdAFCountry['AFRICASSAClinicalCommercial'];
      } else if (workerTeamName === 'AFRICA-ZA-ISR') {
        callerIdAFData = callerIdAFCountry['AFRICAZAISR'];
      } else if (workerTeamName === 'AFRICA-GH-ISR') {
        callerIdAFData = callerIdAFCountry['AFRICAGHISR'];
      } else if (workerTeamName === 'AFRICA-MA-Customer Support') {
        callerIdAFData = callerIdAFCountry['AFRICAMACustomerSupport'];
      } else if (workerTeamName === 'AFRICA-MA-Clinical Commercial') {
        callerIdAFData = callerIdAFCountry['AFRICAMAClinicalCommercial'];
      } else if (workerTeamName === 'AFRICA-MA-ISR') {
        callerIdAFData = callerIdAFCountry['AFRICAMAISR'];
      }

      if (callerIdAFData && destinationCountryCode && callerIdAFData[destinationCountryCode]) {
        payload.callerId = callerIdAFData[destinationCountryCode].phoneNumber;
        payload.queueSid = callerIdAFData[destinationCountryCode].queueSid;
        console.log(`Africa assigned callerId: ${payload.callerId}, queueSid: ${payload.queueSid}`);
        return;
      }

      const defaultAfrica = callerIdList['GH'];
      payload.callerId = defaultAfrica?.phoneNumber || dynamicCallerId;
      payload.queueSid = defaultAfrica?.queueSid || dynamicQueueSid;
      console.log(`Africa fallback to GH: ${payload.callerId}, ${payload.queueSid}`);
      return;
    } else if (workerLocationBENELUX) {
      const callerIdBENELUXCountry = getCallerIdBENELUXCountry();
      let callerIdBENELUXData = null;

      if (workerTeamName === 'BENELUX-Customer Support') {
        callerIdBENELUXData = callerIdBENELUXCountry['BeneluxCustomerSupport'];
      } else if (workerTeamName === 'BENELUX-Tech Support') {
        callerIdBENELUXData = callerIdBENELUXCountry['BeneluxTechSupport'];
      } else if (workerTeamName === 'BENELUX-Clinical Commercial') {
        callerIdBENELUXData = callerIdBENELUXCountry['BeneluxClinicalCommercial'];
      } else if (workerTeamName === 'BENELUX-CS-Sales Support') {
        callerIdBENELUXData = callerIdBENELUXCountry['BeneluxCSSalesSupport'];
      }

      if (callerIdBENELUXData && destinationCountryCode && callerIdBENELUXData[destinationCountryCode]) {
        payload.callerId = callerIdBENELUXData[destinationCountryCode].phoneNumber;
        payload.queueSid = callerIdBENELUXData[destinationCountryCode].queueSid;
        console.log(`BENELUX assigned callerId: ${payload.callerId}, queueSid: ${payload.queueSid}`);
        return;
      }

      const defaultBENELUX = callerIdList['NL']; // Default fallback to NL location
      payload.callerId = defaultBENELUX?.phoneNumber || dynamicCallerId;
      payload.queueSid = defaultBENELUX?.queueSid || dynamicQueueSid;
      console.log(`BENELUX fallback to NL: ${payload.callerId}, ${payload.queueSid}`);
      return;
    } else if (workerLocationNordics) {
      const callerIdNordicsCountry = getCallerIdNordicsCountry();
      let callerIdNordicsData = null;

      if (workerTeamName === 'NORDICS-Customer Support') {
        callerIdNordicsData = callerIdNordicsCountry['NordicsCustomerSupport'];
      } else if (workerTeamName === 'NORDICS-Tech Support') {
        callerIdNordicsData = callerIdNordicsCountry['NordicsTechSupport'];
      } else if (workerTeamName === 'NORDICS-Clinical Commercial') {
        callerIdNordicsData = callerIdNordicsCountry['NordicsClinical'];
      }

      if (callerIdNordicsData && destinationCountryCode && callerIdNordicsData[destinationCountryCode]) {
        payload.callerId = callerIdNordicsData[destinationCountryCode].phoneNumber;
        payload.queueSid = callerIdNordicsData[destinationCountryCode].queueSid;
        console.log(`NORDICS assigned callerId: ${payload.callerId}, queueSid: ${payload.queueSid}`);
        return;
      }

      const defaultNORDICS = callerIdList['DK']; // Default fallback to Denmark
      payload.callerId = defaultNORDICS?.phoneNumber || dynamicCallerId;
      payload.queueSid = defaultNORDICS?.queueSid || dynamicQueueSid;
      console.log(`NORDICS fallback to DK: ${payload.callerId}, ${payload.queueSid}`);
      return;
    } else if (workerLocationPLBIZ && workerTeamNamePLBIZ) {
      const callerIdPLBIZCountry = getCallerIdPLBIZCountry();
      let callerIdPLBIZData = null;

      if (workerTeamName === 'PL-iTero-BizOps-UK') {
        callerIdPLBIZData = callerIdPLBIZCountry['PLBIZ'];
      }

      if (callerIdPLBIZData && destinationCountryCode && callerIdPLBIZData[destinationCountryCode]) {
        payload.callerId = callerIdPLBIZData[destinationCountryCode].phoneNumber;
        payload.queueSid = callerIdPLBIZData[destinationCountryCode].queueSid;
        console.log(`PLBiz assigned callerId: ${payload.callerId}, queueSid: ${payload.queueSid}`);
        return;
      }

      const defaultPLBIZ = callerIdPLBIZCountry?.PLBIZ?.UK;
      payload.callerId = defaultPLBIZ?.phoneNumber || dynamicCallerId;
      payload.queueSid = defaultPLBIZ?.queueSid || dynamicQueueSid;
      console.log(`PLBIZ fallback to UK: ${payload.callerId}, ${payload.queueSid}`);
      return;
    } else if (workerLocationTurkey) {
      const callerIdTurkeyCountry = getCallerIdTurkeyCountry();
      let callerIdTurkeyData = null;

      if (workerTeamName === 'TURKEY-Customer Support') {
        callerIdTurkeyData = callerIdTurkeyCountry['TurkeyCustomerSupport'];
      } else if (workerTeamName === 'TURKEY-iTero Tech Support') {
        callerIdTurkeyData = callerIdTurkeyCountry['TurkeyTechSupport'];
      } else if (workerTeamName === 'TURKEY-Clinical Commercial') {
        callerIdTurkeyData = callerIdTurkeyCountry['TurkeyClinicalCommercial'];
      } else if (workerTeamName === 'TURKEY-iTero Training') {
        callerIdTurkeyData = callerIdTurkeyCountry['TurkeyIteroTraining'];
      }
      //+902126363636
      if (callerIdTurkeyData?.TR) {
        payload.callerId = callerIdTurkeyData.TR.phoneNumber;
        payload.queueSid = callerIdTurkeyData.TR.queueSid;
        console.log(`TURKEY assigned callerId: ${payload.callerId}, queueSid: ${payload.queueSid}`);
        payload.destination = `sip:${payload.destination}@37288-turkeyproduction.de1.trunks.avoxi.com?X-AlignTech=!3vb7734nvB`;
        console.log('================ TURKEY ROUTING ================');

        console.log('[TURKEY] SIP destination:', payload.destination);
        console.log('[TURKEY] Caller ID:', payload.callerId);
        console.log('[TURKEY] Queue SID:', payload.queueSid);
        console.log('================================================');

        console.log('[TURKEY] Using TwiML App routing', payload.destination);
        return;
      }

      const defaultTURKEY = callerIdList['TR'];
      payload.callerId = defaultTURKEY?.phoneNumber || dynamicCallerId;
      payload.queueSid = defaultTURKEY?.queueSid || dynamicQueueSid;
      console.log(`TURKEY fallback to TR: ${payload.callerId}, ${payload.queueSid}`);
      return;
    } else {
      // Logic PolandHUB-based worker locations
      if (workerLocationPLHUB && workerTeamNamePLHUB) {
        let callerIdData = null;
        // Only allow calls to UK, Spain (ES), or Portugal (PT)
        if (
          destinationCountryCode === 'GB' ||
          destinationCountryCode === 'ES' ||
          destinationCountryCode === 'PT' ||
          destinationCountryCode === 'AT' ||
          destinationCountryCode === 'DE' ||
          destinationCountryCode === 'CH'
        ) {
          console.log(`Destination country PLHUB code is valid: ${destinationCountryCode}`);

          let countryKey =
            destinationCountryCode === 'GB'
              ? 'UK'
              : destinationCountryCode === 'ES' || destinationCountryCode === 'PT'
              ? 'IB'
              : destinationCountryCode;
          // Fetch callerIdData based on the country key from callerIdList
          callerIdData = callerIdList;
          if (!callerIdData) {
            console.error(`No callerIdData found for countryKey: ${countryKey}`);
            return; // Exit or handle gracefully
          }

          if (callerIdData && countryKey) {
            const countryData = callerIdData[countryKey];
            payload.callerId = countryData.phoneNumber;
            payload.queueSid = countryData.queueSid;
            console.log(
              `Assigned callerId PLHUB for ${countryKey}: ${payload.callerId}, queueSid: ${payload.queueSid}`,
            );
          }
        } else {
          // Handle case for other country codes which care not listed from destination country code(IN,US,CAD etc.)
          console.log(
            `Destination country code ${destinationCountryCode} is not in the allowed PLHUB list. Assigning PL location.`,
          );
          // Fallback to PL location
          const DefaultPLLocation = callerIdList['PL']; // Default fallback to Poland location
          payload.callerId = DefaultPLLocation?.phoneNumber || dynamicCallerId;
          payload.queueSid = DefaultPLLocation?.queueSid || dynamicQueueSid;
          console.log(
            ` FROM PLHUB Assigned fallback callerId and queueSid for PL location: ${payload.callerId}, queueSid: ${payload.queueSid}`,
          );
        }
      } else {
        // For all other  regions
        if (dynamicCallerId && dynamicQueueSid) {
          payload.callerId = dynamicCallerId; // Override the caller ID in the payload
          payload.queueSid = dynamicQueueSid; // Override the QueueSid in the payload
          console.log('Using dynamic callerId and queueSid:', dynamicCallerId, dynamicQueueSid); // Log dynamic callerId and queueSid
        } else {
          if (callerIdFallback) {
            payload.callerId = callerIdFallback?.phoneNumber; // Fallback callerId from callerIdList
            payload.queueSid = callerIdFallback?.queueSid; // Fallback queueSid from callerIdList
            console.log('No dynamic callerId/queueSid found. Falling back to callerIdList');
            console.log(
              `Fallback callerId: ${callerIdFallback?.phoneNumber}, fallback queueSid: ${callerIdFallback?.queueSid}`,
            );
          } else {
            if (callerIdList) {
              const polandData = callerIdList['IB'];
              payload.callerId = polandData?.phoneNumber;
              payload.queueSid = polandData?.queueSid;
              console.log(
                `Caller ID region fallback to default-IB: ${payload.callerId}, queueSid: ${payload.queueSid}`,
              );
            }
          }
        }
      }
    }
  });
};
