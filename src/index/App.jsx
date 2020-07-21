import React, {
  useCallback,
  useMemo
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './App.css';

import Header from '../common/Header.jsx';

import Journey from './Journey.jsx';
import Submit from './Submit.jsx';

import CitySelector from '../common/CitySelector.jsx';

import {
  exchangeFromTo,
  showCitySelector,
  hideCitySelector,
  fetchCityData,
  setSelectedCity,
} from './actions';

function App(props) {
  console.log('props: ', props);
  const {
      from,
      to,
      isCitySelectorVisible,
      cityData,
      isLoadingCityData,
      dispatch,
  } = props;

  const onBack = useCallback(() => {
      window.history.back();
  }, []);

  const cbs = useMemo(() => {
      return bindActionCreators({
          exchangeFromTo,
          showCitySelector,
      }, dispatch);
  }, [dispatch]);

  const citySelectorCbs = useMemo(() => {
      return bindActionCreators({
          onBack: hideCitySelector,
          fetchCityData,
          onSelect: setSelectedCity
      }, dispatch);
  }, [dispatch]);

  return (
      <div>
          <div className="header-wrapper">
              <Header title="火车票" onBack={onBack}/>
          </div>
          <form className="form">
              <Journey
                  from={from}
                  to={to}
                  {...cbs}
              />
              <Submit/>
          </form>
          <CitySelector
              show={isCitySelectorVisible}
              cityData={cityData}
              isLoading={isLoadingCityData}
              {...citySelectorCbs}
          />
      </div>
  );
}

export default connect(
  function mapStateToProps(state) {
      return state;
  },
  function mapDispatchToProps(dispatch) {
      return { dispatch };
  }
)(App);
