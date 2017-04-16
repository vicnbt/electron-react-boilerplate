// @flow
import React, {Component} from 'react';
import {Link} from 'react-router';
import styles from './Counter.css';
import AdmZip from 'adm-zip';
import _ from 'lodash';

class Counter extends Component {
  props: {
    selectFile: () => void,
    counter: any
  };

  componentDidMount() {
    var zip = new AdmZip("./1.zip");
    var zipEntries = zip.getEntries(); // an array of ZipEntry records

    zipEntries.forEach(function (zipEntry) {
      console.log(zipEntry.toString()); // outputs zip entries information
      if (zipEntry.entryName == "my_file.txt") {
        console.log(zipEntry.data.toString('utf8'));
      }
    });
  }

  render() {
    const {selectFile, counter} = this.props;
    console.log(counter);
    return (
      <div>
        <div className={styles.backButton} data-tid="backButton">
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x"/>
          </Link>
        </div>
        <div className={`counter ${styles.counter}`} data-tid="counter">
            {counter}
      </div>
        <div className={styles.btnGroup}>
          <button className={styles.btn} onClick={selectFile} data-tclass="btn">
            Add
          </button>
        </div>
      </div>
    );
  }
}

export default Counter;
