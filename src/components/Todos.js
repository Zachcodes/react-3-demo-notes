import React, { Component } from "react";
import Todo from "./Todo";

export default class Todos extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      newTodo: ""
    };
    // Since addTodo is passed directly as the callback function to the button in the render method below and since it also utilizes the this keyword, it must be bound in the constructor.
    this.addTodo = this.addTodo.bind(this);
    // Since deleteTodo will be invoked by children components ,we need to make sure this.setState is referring to the Todos component each time.
    this.deleteTodo = this.deleteTodo.bind(this);
  }
  // One of rules of React is to not directly alter the state of a component. Instead, we need to make a copy of this.state.todos and then add in a new todo. Then we can use the setState method to make sure state on the component is set correctly.
  addTodo() {
    let copy = this.state.todos.slice();
    copy.push(this.state.newTodo);
    this.setState({ todos: copy, newTodo: "" });
  }
  // deleteTodo needs to be invoked by each individual child component. It will be passed the index and then it will handle updating this components state by searching through the todos and removing the proper item.
  deleteTodo(index) {
    let copy = this.state.todos.slice();
    copy.splice(index, 1);
    this.setState({ todos: copy });
  }

  handleChange(value) {
    this.setState({ newTodo: value });
  }

  render() {
    return (
      <div>
        <h1>
          <u>Todos</u>
        </h1>
        <input
          value={this.state.newTodo}
          // We don't need to bind handleChange in the constructor since we are wrapping it in an es6 arrow function here.
          onChange={e => this.handleChange(e.target.value)}
        />
        <button onClick={this.addTodo}>Add Todo</button>
        {/* Whenever we are mapping through an array of items in React, we need to return a valid piece of jsx for each element in our array. the .map JavaScript array method is a perfect candidate for this since it will return a new items for each item in the array. */}
        {this.state.todos.map((todo, index) => {
          return (
            // We are passing down multiple props to this child component using key={value} pairs.
            // Another rule of react is whenever we are rendering out a list of components, we need to pass a unique key to the outermost element. This is a react rule and is required to avoid bugs / make sure our app is performant.
            <Todo
              key={`${todo}-${index}`}
              todo={todo}
              deleteTodo={this.deleteTodo}
              index={index}
            />
          );
        })}
      </div>
    );
  }
}
