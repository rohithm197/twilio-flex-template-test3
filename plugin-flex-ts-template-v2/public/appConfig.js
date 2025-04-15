var appConfig = {
  pluginService: {
    enabled: true,
    url: '/plugins',
  },
  insights: {
    analyticsUrl: 'http://localhost:8081',
  },
  ytica: false,
  logLevel: 'info',
  showSupervisorDesktopView: true,
  custom_data: {
    serverless_functions_protocol: 'http',
    serverless_functions_port: '3001',
    serverless_functions_domain: 'localhost',
    common: {
      log_level: 'debug',
      audit_log_ttl: 1209600,
      teams: [],
      teamList: {
        IB: [
          'IB-Invisalign CS',
          'IB-iTero CS',
          'IB-Invisalign Sales Support',
          'IB-Treat Team',
          'IB-Tech Support',
          'IB-Clinical Commercial',
        ],
        UK: [
          'UK-Invisalign CS',
          'UK-iTero CS',
          'UK-Tech Support',
          'UK-iTero Onboarding',
          'UK-iTero Training',
          'UK-Clinical Support',
          'UK-Treat',
          'UK-Credit & Collections',
          'UK-ISRs',
        ],
        PL: [
          'PL-Invisalign CS',
          'PL-iTero CS',
          'PL-Tech Support',
          'PL-iTero Onboarding',
          'PL-iTero Training',
          'PL-Clinical Support',
          'PL-Treat',
          'PL-Credit & Collections',
          'PL-ISRs',
          'PL-iTero Tech Support',
          'PL-iTero Onboarding',
          'PL-Distributor Support',
        ],
        PLHUB: [
          'EMEA Hub Team',
          'IB-Invisalign CS',
          'IB-iTero CS',
          'IB-Invisalign Sales Support',
          'IB-Treat Team',
          'IB-Tech Support',
          'IB-Clinical Commercial',
          'UK-Invisalign CS',
          'UK-iTero CS',
          'UK-Tech Support',
          'UK-iTero Onboarding',
          'UK-iTero Training',
          'UK-Clinical Support',
          'UK-Treat',
          'UK-Credit & Collections',
          'UK-ISRs',
        ],
        DACH: [
          'DACH-Invisalign CS',
          'DACH-iTero CS(front)',
          'DACH-iTero Tech Support(Back)',
          'DACH-iTero Onboarding',
          'DACH-iTero Training',
          'DACH-Invisalign Sales Support',
          'DACH-iTero Sales Support',
          'DACH-Clinical Commercial',
          'DACH-Treat',
          'DACH-IPP',
          'DACH-Credit Collections',
          'DACH-ISR',
        ],
      },
      queuesList: {
        UK: ['UKI-CS-Invisalign', 'UKI-CS-iTero', 'UKI-TechSupport-iTero', 'UKI-CS-Outbound', 'UKI-Onboarding-iTero'],
        PL: [
          'PL-CS-Invisalign',
          'PL-CS-iTero',
          'PL-Treat-Hotline',
          'PL-TechSupport-iTero',
          'PL-Onboarding-iTero',
          'PL-DistributorSupport-Outbound',
          'PL-Treat-Outbound',
        ],
        FR: [
          'FR-Invisalign',
          'FR-iTero',
          'FR-Tech Support',
          'FR-iTero Onboarding',
          'FR-iTero Training',
          'FR-Clinical Support',
          'FR-Treat',
          'FR-Credit & Collections',
          'FR-ISRs',
        ],
        IB: [
          'IB-CS-Invisalign-Primary-ES',
          'IB-CS-iTero-Primary-ES',
          'IB-CS-iTero-Secondary-ES',
          'IB-CS-Invisalign-Primary-PT',
          'IB-CS-Invisalign-Secondary-PT',
          'IB-CS-iTero-Primary-PT',
          'IB-CS-iTero-Secondary-PT',
          'IB-CreditCollections',
          'IB-Treat-Outbound',
          'IB-TechSupport-iTero',
          'IB-CS-Invisalign-Secondary-ES',
          'IB-Onboarding-iTero',
          'IB-Treat-Hotline',
          'IB-SalesSupport-iTero-ES',
          'IB-SalesSupport-Invisalign-ES',
          'IB-SalesSupport-iTero-PT',
          'IB-SalesSupport-Invisalign-PT',
          'IB-ClinicalCommercial-Outbound',
        ],
        PLHUB: [
          'IB-CS-iTero-Primary-ES',
          'IB-CS-iTero-Secondary-ES',
          'IB-CS-iTero-Primary-PT',
          'IB-CS-iTero-Secondary-PT',
          'UKI-CS-iTero',

          'UKI-TechSupport-iTero',
          'IB-CS-Outbound',
          'UKI-CS-Outbound',
          'IB-TechSupport-iTero',
          'IB-CS-Invisalign-Primary-ES',
          'IB-CS-iTero-Primary-ES',
          'IB-CS-iTero-Secondary-ES',
          'IB-CS-Invisalign-Primary-PT',
          'IB-CS-Invisalign-Secondary-PT',
          'IB-CS-iTero-Primary-PT',
          'IB-CS-iTero-Secondary-PT',
          'IB-CreditCollections',
          'IB-Treat-Outbound',
          'IB-TechSupport-iTero',
          'IB-CS-Invisalign-Secondary-ES',
          'IB-Onboarding-iTero',
          'IB-Treat-Hotline',
          'IB-ClinicalCommercial-Outbound',
          'IB-SalesSupport-iTero-ES',
          'IB-SalesSupport-Invisalign-ES',
          'IB-SalesSupport-iTero-PT',
          'IB-SalesSupport-Invisalign-PT',
          'UKI-CS-Invisalign',
          'UKI-CS-iTero',
          'UKI-TechSupport-iTero',
          'UKI-CS-Outbound',
        ],
        DACH: [
          'DACH-CS-Outbound',
          'DACH-Treat-Outbound',
          'DACH-CS-Invisalign-German',
          'DACH-CS-Invisalign-French',
          'DACH-CS-iTero-German',
          'DACH-CS-iTero-French',
          'DACH-Treat-Hotline',
          'DACH-Invisalign Sales Support',
          'DACH-Invisalign Sales Support DSO',
          'DACH-Credit Collections',
          'DACH-iTero-TechSupport',
          'DACH-iTero-Onboarding',
        ],
      },
      callerIddata: {
        PL: {
          phoneNumber: '+48732070515',
          queueName: 'PL-CS-Invisalign',
          queueSid: 'WQf4224c250a8ee9735db0f05694744718',
          country_code: 'PL',
        },
        IB: {
          phoneNumber: '+34911671923',
          queueName: 'IB-CS-Outbound',
          queueSid: 'WQd64b82aa23f9654c1a81682eccf745f3',
          country_code: 'ES',
        },
        UK: {
          phoneNumber: '+447883283812',
          queueName: 'UKI-CS-Invisalign',
          queueSid: 'WQ7f0cfbe115999b33c42c91dd8c417eac',
          country_code: 'GB',
        },
      },
      callerIdPLCountry: {
        PlDistributor: {
          NL: {
            phoneNumber: '+318003510027',
            queueName: 'PL-DistributorSupport-Outbound',
            queueSid: 'WQ408df40a0c92d105a18cf86d51cd695f',
            country_code: 'NL',
          },
          SE: {
            phoneNumber: '+4620881600',
            queueName: 'PL-DistributorSupport-Outbound',
            queueSid: 'WQ408df40a0c92d105a18cf86d51cd695f',
            country_code: 'SE',
          },
          DK: {
            phoneNumber: '+4580820210',
            queueName: 'PL-DistributorSupport-Outbound',
            queueSid: 'WQ408df40a0c92d105a18cf86d51cd695f',
            country_code: 'DK',
          },
          FI: {
            phoneNumber: '+358800552070',
            queueName: 'PL-DistributorSupport-Outbound',
            queueSid: 'WQ408df40a0c92d105a18cf86d51cd695f',
            country_code: 'FI',
          },
          GB: {
            phoneNumber: '+448001017037',
            queueName: 'PL-DistributorSupport-Outbound',
            queueSid: 'WQ408df40a0c92d105a18cf86d51cd695f',
            country_code: 'GB',
          },
          PL: {
            phoneNumber: '+48717166016',
            queueName: 'PL-DistributorSupport-Outbound',
            queueSid: 'WQ408df40a0c92d105a18cf86d51cd695f',
            country_code: 'PL',
          },
          SI: {
            phoneNumber: '+38680755700',
            queueName: 'PL-DistributorSupport-Outbound',
            queueSid: 'WQ408df40a0c92d105a18cf86d51cd695f',
            country_code: 'SI',
          },
          NO: {
            phoneNumber: '+4780022673',
            queueName: 'PL-DistributorSupport-Outbound',
            queueSid: 'WQ408df40a0c92d105a18cf86d51cd695f',
            country_code: 'NO',
          },
          RS: {
            phoneNumber: '+381800300163',
            queueName: 'PL-DistributorSupport-Outbound',
            queueSid: 'WQ408df40a0c92d105a18cf86d51cd695f',
            country_code: 'RS',
          },
          KE: {
            phoneNumber: '+254207640139',
            queueName: 'PL-DistributorSupport-Outbound',
            queueSid: 'WQ408df40a0c92d105a18cf86d51cd695f',
            country_code: 'KE',
          },
          TN: {
            phoneNumber: '+21631365940',
            queueName: 'PL-DistributorSupport-Outbound',
            queueSid: 'WQ408df40a0c92d105a18cf86d51cd695f',
            country_code: 'TN',
          },
          DZ: {
            phoneNumber: '+213982404628',
            queueName: 'PL-DistributorSupport-Outbound',
            queueSid: 'WQ408df40a0c92d105a18cf86d51cd695f',
            country_code: 'DZ',
          },
          NG: {
            phoneNumber: '+23413438880',
            queueName: 'PL-DistributorSupport-Outbound',
            queueSid: 'WQ408df40a0c92d105a18cf86d51cd695f',
            country_code: 'NG',
          },
          RU: {
            phoneNumber: '+78006000472',
            queueName: 'PL-DistributorSupport-Outbound',
            queueSid: 'WQ408df40a0c92d105a18cf86d51cd695f',
            country_code: 'RU',
          },
        },

        PLIteroTechSupport: {
          HR: {
            phoneNumber: '+385800200553',
            queueName: 'PL-TechSupport-iTero',
            queueSid: 'WQa0d1f980e53400842842510b0b7c9bc6',
            country_code: 'HR',
          },
          CZ: {
            phoneNumber: '+420800022564',
            queueName: 'PL-TechSupport-iTero',
            queueSid: 'WQa0d1f980e53400842842510b0b7c9bc6',
            country_code: 'CZ',
          },
          EE: {
            phoneNumber: '+3728000353005',
            queueName: 'PL-TechSupport-iTero',
            queueSid: 'WQa0d1f980e53400842842510b0b7c9bc6',
            country_code: 'EE',
          },
          HU: {
            phoneNumber: '+3680088144',
            queueName: 'PL-TechSupport-iTero',
            queueSid: 'WQa0d1f980e53400842842510b0b7c9bc6',
            country_code: 'HU',
          },
          LT: {
            phoneNumber: '+37080000365',
            queueName: 'PL-TechSupport-iTero',
            queueSid: 'WQa0d1f980e53400842842510b0b7c9bc6',
            country_code: 'LT',
          },
          SK: {
            phoneNumber: '+421800601044',
            queueName: 'PL-TechSupport-iTero',
            queueSid: 'WQa0d1f980e53400842842510b0b7c9bc6',
            country_code: 'SK',
          },
          SI: {
            phoneNumber: '+38617774115',
            queueName: 'PL-TechSupport-iTero',
            queueSid: 'WQa0d1f980e53400842842510b0b7c9bc6',
            country_code: 'SI',
          },
          RO: {
            phoneNumber: '+40800630067',
            queueName: 'PL-TechSupport-iTero',
            queueSid: 'WQa0d1f980e53400842842510b0b7c9bc6',
            country_code: 'RO',
          },
          RS: {
            phoneNumber: '+381800300135',
            queueName: 'PL-TechSupport-iTero',
            queueSid: 'WQa0d1f980e53400842842510b0b7c9bc6',
            country_code: 'RS',
          },
          DK: {
            phoneNumber: '+4580820033',
            queueName: 'PL-TechSupport-iTero',
            queueSid: 'WQa0d1f980e53400842842510b0b7c9bc6',
            country_code: 'DK',
          },
          FI: {
            phoneNumber: '+358800550148',
            queueName: 'PL-TechSupport-iTero',
            queueSid: 'WQa0d1f980e53400842842510b0b7c9bc6',
            country_code: 'FI',
          },
          NO: {
            phoneNumber: '+4780012172',
            queueName: 'PL-TechSupport-iTero',
            queueSid: 'WQa0d1f980e53400842842510b0b7c9bc6',
            country_code: 'NO',
          },
          SE: {
            phoneNumber: '+4620889227',
            queueName: 'PL-TechSupport-iTero',
            queueSid: 'WQa0d1f980e53400842842510b0b7c9bc6',
            country_code: 'SE',
          },
          IS: {
            phoneNumber: '+3548007643',
            queueName: 'PL-TechSupport-iTero',
            queueSid: 'WQa0d1f980e53400842842510b0b7c9bc6',
            country_code: 'IS',
          },
        },
        PLIteroTechOnboarding: {
          HR: {
            phoneNumber: '+385800200553',
            queueName: 'PL-Onboarding-iTero',
            queueSid: 'WQdbb2c9b47750893e07e7d98477e07518',
            country_code: 'HR',
          },
          CZ: {
            phoneNumber: '+420800022564',
            queueName: 'PL-Onboarding-iTero',
            queueSid: 'WQdbb2c9b47750893e07e7d98477e07518',
            country_code: 'CZ',
          },
          EE: {
            phoneNumber: '+3728000353005',
            queueName: 'PL-Onboarding-iTero',
            queueSid: 'WQdbb2c9b47750893e07e7d98477e07518',
            country_code: 'EE',
          },
          HU: {
            phoneNumber: '+3680088144',
            queueName: 'PL-Onboarding-iTero',
            queueSid: 'WQdbb2c9b47750893e07e7d98477e07518',
            country_code: 'HU',
          },
          LT: {
            phoneNumber: '+37080000365',
            queueName: 'PL-Onboarding-iTero',
            queueSid: 'WQdbb2c9b47750893e07e7d98477e07518',
            country_code: 'LT',
          },
          SK: {
            phoneNumber: '+421800601044',
            queueName: 'PL-Onboarding-iTero',
            queueSid: 'WQdbb2c9b47750893e07e7d98477e07518',
            country_code: 'SK',
          },
          SI: {
            phoneNumber: '+38617774115',
            queueName: 'PL-Onboarding-iTero',
            queueSid: 'WQdbb2c9b47750893e07e7d98477e07518',
            country_code: 'SI',
          },
          RO: {
            phoneNumber: '+40800630067',
            queueName: 'PL-Onboarding-iTero',
            queueSid: 'WQdbb2c9b47750893e07e7d98477e07518',
            country_code: 'RO',
          },
          RS: {
            phoneNumber: '+381800300135',
            queueName: 'PL-Onboarding-iTero',
            queueSid: 'WQdbb2c9b47750893e07e7d98477e07518',
            country_code: 'RS',
          },
          DK: {
            phoneNumber: '+4580820033',
            queueName: 'PL-Onboarding-iTero',
            queueSid: 'WQdbb2c9b47750893e07e7d98477e07518',
            country_code: 'DK',
          },
          FI: {
            phoneNumber: '+358800550148',
            queueName: 'PL-Onboarding-iTero',
            queueSid: 'WQdbb2c9b47750893e07e7d98477e07518',
            country_code: 'FI',
          },
          NO: {
            phoneNumber: '+4780012172',
            queueName: 'PL-Onboarding-iTero',
            queueSid: 'WQdbb2c9b47750893e07e7d98477e07518',
            country_code: 'NO',
          },
          SE: {
            phoneNumber: '+4620889227',
            queueName: 'PL-Onboarding-iTero',
            queueSid: 'WQdbb2c9b47750893e07e7d98477e07518',
            country_code: 'SE',
          },
          IS: {
            phoneNumber: '+3548007643',
            queueName: 'PL-Onboarding-iTero',
            queueSid: 'WQdbb2c9b47750893e07e7d98477e07518',
            country_code: 'IS',
          },
        },
      },
      departments: [
        'General Management',
        'Marketing',
        'Operations',
        'Finance',
        'Sales',
        'Human Resources',
        'Purchasing',
        'Customer Service',
        'Recruiting',
      ],
    },
    features: {
      embedded_insights_dashboards: {
        enabled: true,
        workspace_uri: '/gdc/workspaces/cfwqkednqj571z1wa1aaxwh9nt6pz9l6',
        dashboards: [
          {
            title: 'IM-Abandoned Comparison',
            dashboard_uri: 'gdc/md/cfwqkednqj571z1wa1aaxwh9nt6pz9l6/obj/2121257',
          },
          {
            title: 'IM-Volume Comparison',
            dashboard_uri: '/gdc/md/cfwqkednqj571z1wa1aaxwh9nt6pz9l6/obj/2100794',
          },
          {
            title: 'IM-Trends',
            dashboard_uri: '/gdc/md/cfwqkednqj571z1wa1aaxwh9nt6pz9l6/obj/2121396',
          },
          {
            title: 'IM-RAW',
            dashboard_uri: '/gdc/md/cfwqkednqj571z1wa1aaxwh9nt6pz9l6/obj/2121256',
          },
          {
            title: 'IM-EMEA Dashboard WFM',
            dashboard_uri: '/gdc/md/cfwqkednqj571z1wa1aaxwh9nt6pz9l6/obj/2163115',
          },
        ],
        analytics_base_url: 'https://analytics.ytica.com/dashboard.html',
      },
      activity_skill_filter: {
        enabled: true,
        rules: {
          'On a Task': {
            required_skill: 'system_activities',
            sort_order: 0,
          },
          'On a Task, No ACD': {
            required_skill: 'system_activities',
            sort_order: 0,
          },
          'Wrap Up': {
            required_skill: 'system_activities',
            sort_order: 0,
          },
          'Wrap Up, No ACD': {
            required_skill: 'system_activities',
            sort_order: 0,
          },
          'Extended Wrap Up': {
            required_skill: 'system_activities',
            sort_order: 0,
          },
          Offline: {
            required_skill: null,
            sort_order: 100,
          },
        },
        filter_teams_view: true,
      },
      callback_and_voicemail: {
        enabled: true,
        allow_requeue: true,
        max_attempts: 3,
        auto_select_task: true,
      },
      caller_id: {
        enabled: true,
        include_outgoing_only_numbers: true,
      },
      conversation_transfer: {
        enabled: true,
        cold_transfer: true,
        multi_participant: true,
      },
      chat_to_video_escalation: {
        enabled: false,
      },
      conference: {
        enabled: true,
        hold_workaround: false,
      },
      enhanced_crm_container: {
        enabled: true,
        url: '{{serverless.url}}/features/enhanced-crm-container/index.html?line1={{task.from}}&line2={{task.direction}}',
        should_display_url_when_no_tasks: true,
        display_url_when_no_tasks: '{{serverless.url}}/features/enhanced-crm-container/index.html',
        enable_url_tab: true,
        url_tab_title: 'Web Page',
      },
      internal_call: {
        enabled: true,
      },
      scrollable_activities: {
        enabled: true,
      },
      supervisor_barge_coach: {
        enabled: true,
        agent_coaching_panel: true,
        supervisor_monitor_panel: true,
        agent_assistance: true,
        supervisor_alert_toggle: true,
      },
      omni_channel_capacity_management: {
        enabled: false,
        channel: 'chat',
        default_max_capacity: 2,
      },
      device_manager: {
        enabled: false,
        input_select: false,
      },
      dual_channel_recording: {
        enabled: true,
        channel: 'worker',
        exclude_attributes: [{ key: 'ivr', value: 0 }],
        exclude_queues: [],
        recording_location_list: ['uk', 'us', 'it'],
      },
      pause_recording: {
        enabled: true,
        include_silence: false,
        indicator_banner: false,
        indicator_permanent: true,
        enable_location_list: ['uk', 'us', 'in'],
      },
      activity_reservation_handler: {
        enabled: false,
        system_activity_names: {
          available: 'Available',
          onATask: 'On a Task',
          onATaskNoAcd: 'On a Task, No ACD',
          wrapup: 'Wrap Up',
          wrapupNoAcd: 'Wrap Up, No ACD',
          extendedWrapup: 'Extended Wrap Up',
        },
      },
      teams_view_filters: {
        enabled: true,
        log_filters: true,
        applied_filters: {
          activities: true,
          email: false,
          location: true,
          department: false,
          queue_no_worker_data: true,
          queue_worker_data: false,
          team: true,
          agent_skills: false,
        },
      },
      supervisor_capacity: {
        enabled: true,
      },
      schedule_manager: {
        enabled: true,
        serverless_domain: 'schedule-manager-5057-dev.twil.io',
      },
      multi_call: {
        enabled: false,
      },
      hang_up_by: {
        enabled: true,
      },
      chat_transfer: {
        enabled: false,
      },
      agent_automation: {
        enabled: true,
        configuration: [
          {
            channel: 'voice',
            auto_accept: true,
            auto_select: false,
            auto_wrapup: true,
            required_attributes: [],
            required_worker_attributes: [],
            wrapup_time: 90000,
            allow_extended_wrapup: false,
            extended_wrapup_time: 0,
            default_outcome: 'Automatically completed',
          },
          {
            channel: 'chat',
            auto_accept: false,
            auto_select: true,
            auto_wrapup: true,
            required_attributes: [],
            required_worker_attributes: [],
            wrapup_time: 30000,
            allow_extended_wrapup: false,
            extended_wrapup_time: 0,
            default_outcome: 'Automatically completed',
          },
        ],
      },
      supervisor_complete_reservation: {
        enabled: true,
        outcome: 'Completed by supervisor',
      },
      canned_responses: {
        enabled: true,
        location: 'MessageInputActions',
      },
      keyboard_shortcuts: {
        enabled: true,
      },
      custom_hold_music: {
        enabled: false,
        url: '',
      },
      custom_transfer_directory: {
        enabled: true,
        worker: {
          enabled: true,
          show_only_available_workers: true,
        },
        queue: {
          enabled: true,
          show_only_queues_with_available_workers: false,
          show_real_time_data: true,
          enforce_queue_filter_from_worker_object: true,
          enforce_global_exclude_filter: false,
          global_exclude_filter: '',
        },
        external_directory: {
          enabled: true,
          skipPhoneNumberValidation: false,
          directory: [
            {
              cold_transfer_enabled: true,
              warm_transfer_enabled: true,
              label: 'Sample Entry',
              number: '+10000000000',
            },
          ],
        },
      },
      dispositions: {
        enabled: true,
        enable_notes: true,
        global: {
          require_disposition: false,
          dispositions: ['Resolved', 'Not Resolved', 'Follow-up Required', 'Escalation', 'Wrong Department'],
          text_attributes: [],
          select_attributes: [],
        },
        per_queue: {
          exampleQueueName: {
            require_disposition: true,
            dispositions: ['Promotional Sale', 'Renewal'],
            text_attributes: [],
            select_attributes: [],
          },
        },
      },
      emoji_picker: {
        enabled: true,
      },
      attribute_viewer: {
        enabled: true,
        enabled_for_agents: false,
      },
      admin_ui: {
        enabled: true,
        enable_audit_logging: true,
      },
      localization: {
        enabled: false,
        show_menu: true,
      },
      park_interaction: {
        enabled: true,
        show_list: false,
      },
      teams_view_enhancements: {
        enabled: true,
        highlight_handle_time: true,
        handle_time_warning_threshold: 180,
        handle_time_exceeded_threshold: 300,
        display_task_queue_name: true,
        columns: {
          calls: true,
          other_tasks: true,
          team: false,
          department: false,
          location: false,
          agent_skills: true,
          activity_icon: false,
        },
      },
      ring_notification: {
        enabled: true,
      },
      send_audio_rec_file: {
        enabled: true,
      },
      metrics_data_tiles: {
        enabled: true,
        queues_view_tiles: {
          active_tasks_data_tile: false,
          waiting_tasks_data_tile: false,
          longest_wait_time_data_tile: false,
          agents_by_activity_bar_chart: false,
          all_channels_data_tile: false,
          enhanced_agent_by_activity_pie_chart: false,
        },
        teams_view_tiles: {
          task_summary_tile: false,
          team_activity_tile: false,
          team_location_tile: true,
          status_idle_color: 'limegreen',
          status_busy_color: 'royalblue',
        },
        channels: {
          Voice: {
            color: '#ADD8E6',
            SLA_data_tile: false,
            task_counts_data_tile: false,
            teams_task_summary: false,
          },
          Chat: {
            color: '#87CEFA',
            SLA_data_tile: false,
            task_counts_data_tile: false,
            teams_task_summary: false,
          },
          SMS: {
            color: '#59cef8',
            SLA_data_tile: false,
            task_counts_data_tile: false,
            teams_task_summary: true,
          },
          Video: {
            color: '#00CED1',
            SLA_data_tile: false,
            task_counts_data_tile: false,
            teams_task_summary: false,
          },
        },
        agent_activity_configuration: {
          activities: {
            Available: {
              color: 'green',
              icon: 'Accept',
            },
            Outbound: {
              color: 'darkgreen',
              icon: 'Call',
            },
            Break: {
              color: 'goldenrod',
              icon: 'Hold',
            },
            Lunch: {
              color: 'darkorange',
              icon: 'Hamburger',
            },
            Training: {
              color: 'red',
              icon: 'Bulb',
            },
            Offline: {
              color: 'grey',
              icon: 'Minus',
            },
          },
          other: {
            color: 'darkred',
            icon: 'More',
          },
        },
      },
      queues_stats_metrics: {
        enabled: true,
        assigned_tasks_column: true,
        wrapping_tasks_column: true,
        agent_activity_stats_column: true,
      },
      sip_support: {
        enabled: false,
      },
      worker_details: {
        enabled: true,
        edit_team: true,
        edit_department: true,
        text_attributes: [],
        boolean_attributes: [],
      },
      worker_canvas_tabs: {
        enabled: true,
      },
      datadog_log_integration: {
        enabled: false,
        log_level: 'info',
        api_key: '',
        intake_region: '',
        flush_timeout: 5000,
      },
      contacts: {
        enabled: true,
        enable_recents: true,
        enable_personal: true,
        enable_shared: true,
        recent_days_to_keep: 14,
        shared_agent_editable: false,
        page_size: 10,
      },
      inline_media: {
        enabled: true,
      },
      branding: {
        enabled: false,
        custom_logo_url: '',
        use_custom_colors: false,
        custom_colors: {
          main_header_background: 'rgb(6, 3, 58)',
          side_nav_background: 'rgb(255, 255, 255)',
          side_nav_border: 'rgb(202, 205, 216)',
          side_nav_icon: 'rgb(18, 28, 45)',
          side_nav_selected_icon: 'rgb(2, 99, 224)',
          side_nav_hover_background: 'rgb(225, 227, 234)',
        },
        component_theme_overrides: {},
      },
    },
  },
};
