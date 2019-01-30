import React, { Component } from 'react';
import ComparisonList from '../../components/comparisonList/comparisonList.js';
import './compare.css';


class CompareScreen extends Component {
  render() {
    return (
      <div className="Main-Container">
        <ComparisonList />
      </div>
    );
  }
}

export default CompareScreen;
