import { createAction, props } from '@ngrx/store';

export const ManagerActions = createAction(
  '[Manager] Get Manager',
  props<{ manager: string }>()
);
