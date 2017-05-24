// @flow
import React, {Component} from 'react';
import {Link} from 'react-router';
import styles from './Counter.css';
import _ from 'lodash';

class Counter extends Component {
  props: {
    selectFile: () => void,
    processFiles: () => void,
    clear: () => void,
    counter: any
  };

  componentDidMount() {

  }
  //todo: to a component, and we need sort here
  getAllQuestions = (file, key) => {
    const {counter} = this.props;

    let hashTable = {};
    let files = _.keys(counter.questions);
    let questionSet = this.props.counter.questions;
    files.forEach((file) => {
      questionSet[file].forEach((question)=>{
        let { studyobjectives, title, link, ident} = question;
        hashTable[file+title] = { studyobjectives, title, link };
      })
    });

    return <div>{_.map(this.props.counter.questions[file],(question, qKey) => {
      let questionToCompare = hashTable[files[0]+question.title];
      if(key === 0){
        return <div key={key+'-'+qKey}>
          {question.title}<br />
          {question.studyobjectives}<br />
          {question.link}<hr />
        </div>;
      } else {
        return <div key={key+'-'+qKey}>
          {question.title} {_.isUndefined(questionToCompare) || questionToCompare.title === question.title?'':<span style={{color: 'red'}}>DIFF!</span>}<br />
          {question.studyobjectives} {_.isUndefined(questionToCompare) || questionToCompare.studyobjectives === question.studyobjectives?'':<span style={{color: 'red'}}>DIFF!</span>}<br />
          {question.link} {_.isUndefined(questionToCompare) || questionToCompare.link === question.link?'':<span style={{color: 'red'}}>DIFF!</span>}<hr />
        </div>;
      }

    })}</div>
  };

  render() {
    const {selectFile, processFiles, counter, clear} = this.props;
    return (
      <div>
        <div className={styles.backButton} data-tid="backButton">
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x"/>
          </Link>
        </div>
        <div style={{position: 'absolute', left:100}}>
          {_.map(counter.filenames, (item) => <div>{item}</div>)}
        </div>
        {
          counter.questions &&
          <div className={`counter ${styles.counter}`} data-tid="counter">
            <table>
              <tr>
            {_.map(_.keys(counter.questions), (key) => {
                return <td>{key}</td>;
            })}
              </tr>

              <tr>
            {_.map(_.keys(counter.questions), (file, key) => {
                return <td>{this.getAllQuestions(file, key)}</td>;
            })}
              </tr>

            </table>
          </div>
        }
        <div className={styles.btnGroup}>
          <button className={styles.btn} onClick={selectFile} data-tclass="btn">
            Add
          </button>
          <button className={styles.btn} onClick={processFiles} data-tclass="btn">
            GO
          </button>
          <button className={styles.btn} onClick={clear} data-tclass="btn">
            Clear
          </button>
        </div>
      </div>
    );
  }
}

export default Counter;
