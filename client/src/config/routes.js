/* eslint-disable react/jsx-key */
import React, { lazy } from 'react'
import AuthorizedRoute from 'base-shell/lib/components/AuthorizedRoute/AuthorizedRoute'
import UnauthorizedRoute from 'base-shell/lib/components/UnauthorizedRoute/UnauthorizedRoute'
import { Route } from 'react-router-dom'

const SignIn = lazy(() => import('../pages/SignIn/SignIn'))
const SignUp = lazy(() => import('../pages/SignUp/SignUp'))
const PasswordReset = lazy(() => import('../pages/PasswordReset/PasswordReset'))
const About = lazy(() => import('../pages/About'))
const Home = lazy(() => import('../pages/Home/Home'))
const StaffContext = lazy(() => import('../pages/StaffContext/wrapper'))
const PatientContext = lazy ( () => import('../pages/PatientContext'))
const DivisionContext = lazy(() => import('../pages/DivisionContext'))

const routes = [
  <UnauthorizedRoute path="/signin" redirectTo="/" exact component={SignIn} />,
  <UnauthorizedRoute path="/auth/staff/login" redirectTo="/home" exact component={SignIn} />,
  <UnauthorizedRoute path="/auth/medical/login" redirectTo="/home" exact component={SignIn} />,
  <UnauthorizedRoute path="/auth/nurse/login" redirectTo="/home" exact component={SignIn} />,
  <UnauthorizedRoute path="/signup" redirectTo="/" exact component={SignUp} />,
  <UnauthorizedRoute path="/auth/staff/signup" redirectTo="/home" exact component={SignUp} />,
  <UnauthorizedRoute path="/auth/medical/signup" redirectTo="/home" exact component={SignUp} />,
  <UnauthorizedRoute path="/auth/nurse/signup" redirectTo="/home" exact component={SignUp} />,

  <UnauthorizedRoute
    path="/password_reset"
    redirectTo="/"
    exact
    component={PasswordReset}
  />,
  <Route path="/about" exact component={About} />,


  <AuthorizedRoute path="/home" exact component={Home} />,
  <AuthorizedRoute path="/patient_context" exact component={PatientContext} />,
  <AuthorizedRoute path="/staff_context" exact component={StaffContext} />,
  <AuthorizedRoute path="/division_context" exact component={DivisionContext} />,
  
]

export default routes
