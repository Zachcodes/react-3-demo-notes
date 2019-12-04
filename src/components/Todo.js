import React from "react";
// We can access the props of a functional component by naming the first parameter of the function props (or anything else, but the common converntion is props)
// in a class based component, we would access props of a component using this.props
export default function Todo(props) {
  // We are passed a todo prop containing the text of each todo. Since the paretn passing down the prop named the key todo, we can display the text using props.todo
  return (
    <div>
      <p>{props.todo}</p>
      {/* When we want to delete this todo, we can call the function passed down from the parent passing in props.index since we need the bound function on the parent to be able to remove the correct item on state. */}
      <button onClick={() => props.deleteTodo(props.index)}>X</button>
    </div>
  );
}
