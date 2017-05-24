// @flow
import { ADD_ZIP, PROCESS_FILES, CLEAR } from '../actions/counter';
import AdmZip from 'adm-zip';
import { parseString } from 'xml2js';

export type counterStateType = {
  counter: any
};

type actionType = {
  type: string
};

const _processZip = (path: string) => {
  console.log('item',path);

  const zip = new AdmZip(path);
  const zipEntries = zip.getEntries(); // an array of ZipEntry records
  console.log('zipEntries',zipEntries);
  let result = {};
  result[path] = [];

  let title;
  let studyobjectives;
  let ident;
  let link;
  let notEmpty;
  zipEntries.forEach(function (zipEntry) {
    var xml = new TextDecoder("utf-8").decode(zipEntry.getData());
    parseString(xml, function (err, xmlobj) {

      title = 'default title';
      studyobjectives = 'default studyobjectives';
      ident = 'default ident';
      link = 'default link';
      notEmpty = false;

      try { title = xmlobj.questestinterop.item["0"].$.title; notEmpty = true;} catch(e){}
      try { studyobjectives = xmlobj.questestinterop.item["0"].$["uni:studyobjectives"]; notEmpty = true;} catch(e){}
      try { ident = xmlobj.questestinterop.item["0"].$["ident"]; notEmpty = true;} catch(e){}
      try { link = xmlobj.questestinterop.item["0"].itemfeedback[1]["uni:links"]["0"]["uni:link"]["0"].$.idref; notEmpty = true;} catch(e){}

      if(notEmpty){
          result[path].push({ ident, studyobjectives, title, link });
      }
    });
  });
  return result;
};

export default function counter(state: object = {}, action: actionType) {
  switch (action.type) {
    case CLEAR:
      state = {};
      state.filenames = [];
      state.filenamesHash = "";
      state.questions = [];
      return Object.assign({},state);
    case PROCESS_FILES:
      let questionsArr = [];
      if(!state.filenames){
        state.filenames = [];
        state.filenamesHash = "";
      }

      state.filenames.forEach((item)=>{
        questionsArr.push(_processZip(item[0]));
      });

      /*
      questionsArr.push(_processZip('./1.zip'));
      questionsArr.push(_processZip('./2.zip'));
      */

      let questions = Object.assign(...questionsArr);
      return Object.assign({}, state, { questions } );
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
