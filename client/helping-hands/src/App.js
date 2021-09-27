import { Switch, Route } from "react-router-dom";
import Home from "./Home"
import Profile from "./Profile"
import CreateItemForm from './CreateItemForm';
import CreateTaskForm from './CreateTaskForm';
import Login from './Login';
import Register from './Register';
import DisplaySearchResults from "./search/DisplaySearchResults";
import NavBar from "./NavBar";
import { useLocation } from "react-router";
import ViewItemMatches from "./item/ViewItemMatches";


function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname === '/login' || location.pathname === '/register' ? null : <NavBar />}
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
        <Route path="/item-matches">
          <ViewItemMatches />
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
