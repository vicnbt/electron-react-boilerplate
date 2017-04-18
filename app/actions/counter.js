// @flow
import type { counterStateType } from '../reducers/counter';
import { remote } from 'electron';
const { dialog } = remote;
import fs from 'fs';

export const ADD_ZIP = 'ADD_ZIP';
export const SELECT_FILE = 'SELECT_FILE';
export const PROCESS_FILES = 'PROCESS_FILES';

export function addZipFile(fileNames) {
  return {
    type: ADD_ZIP,
    fileNames: fileNames
  };
}

export function selectFile() {
  return (dispatch: () => void) => {
    dialog.showOpenDialog((fileNames) => {
      // fileNames is an array that contains all the selected
      console.log("fileNames", fileNames);
      dispatch(addZipFile(fileNames));
    });
  };
}

export function processFiles() {
  return {
    type: PROCESS_FILES
  };
}
