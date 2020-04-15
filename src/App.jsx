import React, { Component, lazy, Suspense } from "react";
import "./App.css";

const About = lazy(() => import(/* webpackChunkName: 'about' */ "./About.jsx"));

//ErrorBoundary
//ComponentDidCatch

class App extends Component {
  state ={
    hasError: false
  }

  static getDerivedStateFromError(){
    return {
      hasError: true
    }
  }

  render() {
    const { hasError } = this.state
    if(hasError){
      return <div>error</div>
    }
    return (
      <div>
        <Suspense fallback={<div>loading</div>}>
          <About/>
        </Suspense>
      </div>
    );
  }
}

export default App;
