// @flow
import { ADD_ZIP } from '../actions/counter';


export type counterStateType = {
  counter: any
};

type actionType = {
  type: string
};

export default function counter(state: array = [], action: actionType) {
  switch (action.type) {
    case ADD_ZIP:
        if(action.fileNames === undefined){
          console.log("No file selected");
          return state;
        } else {
          action.fileNames.forEach(file => !state.includes(file) && state.push(file));
          console.log("state", state);
        }
      return state;
    default:
      return state;
  }
}
