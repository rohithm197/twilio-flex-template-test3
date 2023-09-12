import esMX from './es-mx.json';

// Export the template names as an enum for better maintainability when accessing them elsewhere
export enum StringTemplates {
  WithinSL = 'PSWithinSL',
  Other = 'PSOther',
}
// Service Level Agreement (SLA) = Acuerdo de Nivel de Servicio (SNA)

export const stringHook = () => ({
  'en-US': {
    [StringTemplates.WithinSL]: 'Within SL',
    [StringTemplates.Other]: 'Other',
  },
  'es-MX': esMX,
});
