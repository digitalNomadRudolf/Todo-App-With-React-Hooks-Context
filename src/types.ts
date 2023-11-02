import { ActionsType } from "./actions";

export interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
}

export type ReducerAction = {
  type: ActionsType;
  payload?: any;
};
