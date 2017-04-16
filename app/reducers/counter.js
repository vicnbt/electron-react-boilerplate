// @flow
import { ADD_ZIP } from '../actions/counter';


export type counterStateType = {
  counter: any
};

type actionType = {
  type: string
};

export default function counter(state: string = "", action: actionType) {
  switch (action.type) {
    case ADD_ZIP:
        if(action.fileNames === undefined){
          console.log("No file selected");
          return state;
        } else {
          console.log("state", state);
          return action.fileNames;
        }
      return state;
    default:
      return state;
  }
}
