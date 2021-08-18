import './App.css';
import { Switch, Route } from "react-router-dom";
import Home from "./Home"
import Profile from "./Profile"
import CreateItemForm from './CreateItemForm';
import CreateTaskForm from './CreateTaskForm';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" >
          <Home />
        </Route>
        <Route path="/profile" >
          <Profile />
        </Route>
        <Route path="/create-item" >
          <CreateItemForm />
        </Route>
        <Route path="/create-task" >
          <CreateTaskForm />
        </Route>
      </Switch>
    </>
  );
}

export default App;
