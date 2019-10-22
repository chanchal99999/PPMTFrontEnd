import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddProject from "./components/project/AddProject";
import { Provider } from "react-redux";
import store from "./store";
import UpdateProject from "./components/project/UpdateProject";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import AddProjectTask from "./components/ProjectBoard/ProjectTasks/AddProjectTask";
import UpdateProjectTask from "./components/ProjectBoard/ProjectTasks/UpdateProjectTask";
import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTTokens";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import SecureRoute from "./securityUtils/SecureRoute";

const jwtToken = localStorage.jwtToken;
if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  });
  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    //Handle logout
    window.location.href = "/";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          {
            //Public Routes
          }
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          {
            // Private Routes
          }
          <Switch>
            <SecureRoute exacpt path="/dashboard" component={Dashboard} />
            <SecureRoute exacpt path="/addProject" component={AddProject} />
            <SecureRoute
              exacpt
              path="/UpdateProject/:id"
              component={UpdateProject}
            />
            <SecureRoute
              exacpt
              path="/projectBoard/:id"
              component={ProjectBoard}
            />
            <SecureRoute
              exacpt
              path="/addProjectTask/:id"
              component={AddProjectTask}
            />
            <SecureRoute
              exacpt
              path="/UpdateProjectTask/:backlogId/:ptid"
              component={UpdateProjectTask}
            />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
