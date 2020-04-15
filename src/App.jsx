import React, { Component, memo } from "react";
import "./App.css";


const Foo = memo(function Foo(props){
  console.log('Foo render')

  return <div>{props.person.age}</div>;
  
})


class App extends Component {
  state = {
    count: 0,
    person:{
      age:1
    }
  };

  callback= ()=>{
    //this 的指向问题
  }
  render() {
    const person = this.state.person

    return (
      <div>
        <button onClick={() => {
          person.age++;
          this.setState({ 
            count: this.state.count + 1 })
          }}>
          add
        </button>
        <Foo person={person} cb={this.callback}/>
      </div>
    );
  }
}

export default App;
