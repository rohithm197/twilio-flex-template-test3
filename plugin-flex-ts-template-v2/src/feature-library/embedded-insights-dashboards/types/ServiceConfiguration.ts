interface Dashboard {
  title: string;
  dashboard_uri: string;
}

export default interface EmbeddedInsightsDashboardsConfig {
  enabled: boolean;
  workspace_uri: string;
  dashboards: Dashboard[];
  analytics_base_url: string;
}
