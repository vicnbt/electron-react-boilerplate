// @flow
import { ADD_ZIP, PROCESS_FILES } from '../actions/counter';
import AdmZip from 'adm-zip';


export type counterStateType = {
  counter: any
};

type actionType = {
  type: string
};

export default function counter(state: object = {}, action: actionType) {
  switch (action.type) {
    case PROCESS_FILES:
      console.log('state',state);

      state.filenames.forEach((item)=>{
        console.log('item',item);

        var zip = new AdmZip(item);
        var zipEntries = zip.getEntries(); // an array of ZipEntry records
        console.log('zipEntries',zipEntries);

        zipEntries.forEach(function (zipEntry) {
          console.log(zipEntry.toString()); // outputs zip entries information
          if (zipEntry.entryName == "my_file.txt") {
            console.log(zipEntry.data.toString('utf8'));
          }
        });
      });


      return state;
      return;
    case ADD_ZIP:
        if(!state.filenames){
          state.filenames = [];
          state.filenamesHash = "";
        }
        if(action.fileNames === undefined){
          console.log("No file selected");
          return state;
        } else {
          console.log("state", state);
          state.filenames.push(action.fileNames);
          state.filenamesHash = JSON.stringify(action.fileNames);
          return Object.assign({},state);
        }
      return state;
    default:
      return state;
  }
}
