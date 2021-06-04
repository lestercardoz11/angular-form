import { Action, createReducer, on } from '@ngrx/store';
import { ManagerActions } from './manager.action';

export interface ManagerItem {
  manager: string;
}

export const initialState: ManagerItem = {
  manager: '',
};

const managerReducer = createReducer(
  initialState,
  on(ManagerActions, ({ manager }) => ({ manager: manager }))
);

export function reducer(state: ManagerItem | undefined, action: Action) {
  return managerReducer(state, action);
}
