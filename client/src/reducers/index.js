import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { routerReducer } from "react-router-redux";
import thunk from "redux-thunk";

import { Auth, LoginUser, LogoutUser } from "./auth";
import { Registration, RegisterUser, registerDone } from "./registration";
import {
  User,
  FetchUser,
  UpdateUser,
  UserUpdateDone,
} from "./user";

const store = createStore(
  combineReducers({
    Auth,
    Registration,
    User,
    router: routerReducer,
  }),
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const Action = {
  LoginUser,
  LogoutUser,
  RegisterUser,
  registerDone,
  FetchUser,
  UpdateUser,
  UserUpdateDone,
};

export { store, Action };