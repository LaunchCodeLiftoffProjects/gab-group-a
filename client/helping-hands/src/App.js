import './App.css';
import { Switch, Route } from "react-router-dom";
import Home from "./Home"
import Profile from "./Profile"
import CreateItemForm from './CreateItemForm';

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
      </Switch>
    </>
  );
}

export default App;
