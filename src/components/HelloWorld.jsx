import React, { Component } from 'react';
import ComponentB from './ComponentB';

class HelloWorld extends Component {
    constructor(props) {
        super(props);
        this.state={
            counter:0
        }
    }
    
    handleCounter = ()=>{
        console.log("hello");
        this.setState({
            counter : this.state.counter + 1
        }) 
        console.log("hi");
    }
    
    render() {
        return (
            <div>
                <h1>Hello World</h1>
                <p>{this.state.counter}</p>
                <button onClick={this.handleCounter}>Click</button>
                <ComponentB/>
            </div>
        );
    }
}

export default HelloWorld;