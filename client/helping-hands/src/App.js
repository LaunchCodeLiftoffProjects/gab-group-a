import { Switch, Route } from "react-router-dom";
import Home from "./Home"
import Profile from "./Profile"
import CreateItemForm from './CreateItemForm';
import CreateTaskForm from './CreateTaskForm';
import Login from './Login';
import Register from './Register';
import DisplaySearchResults from "./search/DisplaySearchResults";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" >
          <Home />
        </Route>
        <Route path="/profile/:id" component={Profile} />
        <Route path="/search/:query" component={DisplaySearchResults} />
        <Route path="/create-item" >
          <CreateItemForm />
        </Route>
        <Route path="/create-task" >
          <CreateTaskForm />
        </Route>
        <Route exact path="/login" >
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
      </Switch>
    </>
  );
}

export default App;
