// Export the template names as an enum for better maintainability when accessing them elsewhere
export enum StringTemplates {
  TaskAttributesHeader = 'PSTaskAttributesHeader',
  WorkerAttributesHeader = 'PSWorkerAttributesHeader',
}

export const stringHook = () => ({
  [StringTemplates.TaskAttributesHeader]: 'Task attributes',
  [StringTemplates.WorkerAttributesHeader]: 'Attributes',
});
