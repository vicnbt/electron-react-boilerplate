// @flow
import React, {Component} from 'react';
import {Link} from 'react-router';
import styles from './Counter.css';
import AdmZip from 'adm-zip';
import _ from 'lodash';

class Counter extends Component {
  props: {
    selectFile: () => void,
    processFiles: () => void,
    counter: any
  };

  componentDidMount() {

  }

  render() {
    const {selectFile, processFiles,  counter} = this.props;
    return (
      <div>
        <div className={styles.backButton} data-tid="backButton">
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x"/>
          </Link>
        </div>
        <div className={`counter ${styles.counter}`} data-tid="counter">
          {_.map(counter.filenames, (item)=><div>{item}</div>)}
      </div>
        <div className={styles.btnGroup}>
          <button className={styles.btn} onClick={selectFile} data-tclass="btn">
            Add
          </button>
          <button className={styles.btn} onClick={processFiles} data-tclass="btn">
            GO
          </button>
        </div>
      </div>
    );
  }
}

export default Counter;
