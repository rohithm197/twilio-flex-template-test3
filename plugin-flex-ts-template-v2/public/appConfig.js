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
        IT: [
          'IT-Invisalign CS',
          'IT-iTero CS',
          'IT-Tech Support',
          'IT-iTero Onboarding',
          'IT-iTero Training',
          'IT-Clinical Support',
          'IT-Treat',
          'IT-Credit & Collections',
          'IT-ISRs',
        ],
        IB: [
          'IB-Invisalign CS',
          'IB-iTero CS',
          'IB-Invisalign Sales Support',
          'IB-Treat Team',
          'IB-Tech Support'
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
        ],
        FR: [
          'FR-Invisalign CS',
          'FR-iTero CS',
          'FR-Tech Support',
          'FR-iTero Onboarding',
          'FR-iTero Training',
          'FR-Clinical Support',
          'FR-Treat',
          'FR-Credit & Collections',
          'FR-ISRs',
        ],
      },
      queuesList: {
        IT: [
          'IT-Invisalign',
          'IT-General',
          'IT-Master Plan',
          'IT-iTero',
          'IT-Clinical Support',
          'IT-Treat',
          'IT-Credit & Collections',
          'IT-ISRs',
        ],
        UK: [
          'UKI-Invisalign Queue',
          'UKI-iTero Queue',
          'UKI-Tech support',
          'UKI-CS-General Queue',
        ],
        PL: [
          'PL-Invisalign',
          'PL-iTero',
          'PL-Tech Support',
          'PL-iTero Onboarding',
          'PL-iTero Training',
          'PL-Clinical Support',
          'PL-Treat',
          'PL-Credit & Collections',
          'PL-ISRs',
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
        FI: [
          'Finnish Primary Queue',
          'Finnish Secondary Queue',
          'FI-Primary',
          'FI-Secondary',
          'FR-iTero Training',
          'FR-Clinical Support',
          'FR-Treat',
          'FR-Credit & Collections',
          'FR-ISRs',
        ],
        IB:[
          'CS-SP-Primary_Queue',
          'iTero-SP-Primary_Queue',
          'iTero-SP-Secondary_Queue',
          'CS-PT-Primary_Queue',
          'CS-PT-Secondary_Queue',
          'iTero-PT-Primary_Queue',
          'iTero-PT-Secondary_Queue',
          'SP-Collections',
          'SP-Treat Team',
          'Tech Support',
          'CS-SP-Secondary_Queue',
          'Onboarding queue',
          'SP-Treat-Hotline',
          'IBERIA iTero Sales Support',
          'IBERIA Invisalign Sales Support',
          'IBERIA PT iTero Sales Support',
          'IBERIA PT Invisalign Sales Support'
        ]
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
        log_filters: false,
        applied_filters: {
          activities: true,
          email: false,
          department: false,
          queue_no_worker_data: false,
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
            auto_select: true,
            auto_wrapup: true,
            required_attributes: [],
            required_worker_attributes: [],
            wrapup_time: 30000,
            allow_extended_wrapup: false,
            extended_wrapup_time: 0,
            default_outcome: 'Automatically completed',
            auto_accept_location_list: ['uk', 'us', 'in'],
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
          show_only_available_workers: false,
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
        enabled: false,
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
        enabled: false,
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
