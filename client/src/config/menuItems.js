import ChatBubble from '@material-ui/icons/ChatBubble'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import FilterList from '@material-ui/icons/FilterList'
import GetApp from '@material-ui/icons/GetApp'
import InfoOutlined from '@material-ui/icons/InfoOutlined'
import LanguageIcon from '@material-ui/icons/Language'
import LockIcon from '@material-ui/icons/Lock'
import QuestionAnswer from '@material-ui/icons/QuestionAnswer'
import React from 'react'
import SettingsIcon from '@material-ui/icons/SettingsApplications'
import StyleIcon from '@material-ui/icons/Style'
import Tab from '@material-ui/icons/Tab'
import ViewList from '@material-ui/icons/ViewList'
import Web from '@material-ui/icons/Web'
import allLocales from './locales'
import allThemes from './themes'
import { store, Action } from "reducers";

const getMenuItems = (props) => {
  const {
    intl,
    updateLocale,
    locale,
    menuContext,
    themeContext,
    a2HSContext,
    auth: authData,
  } = props
  const { isAuthMenuOpen, setMiniMode } = menuContext
  const { themeID, setThemeID } = themeContext
  const { setAuth } = authData
  const { isAppInstallable, isAppInstalled, deferredPrompt } = a2HSContext
 
  const state = store.getState();
  let isAuthorised = state.Auth.get('authenticated');

  store.subscribe(_ => {
    isAuthorised = store.getState().Auth.get('authenticated');
    isAuthorised && setAuth({ isAuthenticated: isAuthorised })
  }) 

  setMiniMode(false);

  const localeItems = allLocales.map((l) => {
    return {
      value: undefined,
      visible: true,
      primaryText: intl.formatMessage({ id: l.locale }),
      onClick: () => {
        updateLocale(l.locale)
      },
      leftIcon: <LanguageIcon />,
    }
  })


  const themeItems = allThemes.map((t) => {
    return {
      value: undefined,
      visible: true,
      primaryText: intl.formatMessage({ id: t.id }),
      onClick: () => {
        setThemeID(t.id)
      },
      leftIcon: <StyleIcon style={{ color: t.color }} />,
    }
  })

  if (isAuthMenuOpen || !isAuthorised) {
    return [
      {
        value: '/',
        onClick: isAuthorised
          ? () => {
              setAuth({ isAuthenticated: false })
              store.dispatch(Action.LogoutUser())
            }
          : () => {},
        visible: true,
        primaryText: isAuthorised
          ? intl.formatMessage({ id: 'sign_out' })
          : intl.formatMessage({ id: 'sign_in' }),
        leftIcon: isAuthorised ? <ExitToAppIcon /> : <LockIcon />,
      },
    ]
  }
  return [
    {
      value: '/home',
      visible: isAuthorised,
      primaryText: intl.formatMessage({ id: 'home' }),
      leftIcon: <DashboardIcon />,
    },
    {
      value: '/staff_context',
      visible: true,
      primaryText: 'Staff Context',
      leftIcon: <Web />,
    },
    {
      value: '/patient_context',
      visible: true,
      primaryText: 'Patient Context',
      leftIcon: <Web />,
    },
    {
      value: '/division_context',
      visible: true,
      primaryText: 'Division Context',
      leftIcon: <Web />,
    },
    { divider: true },
    {
      primaryText: intl.formatMessage({ id: 'settings' }),
      primaryTogglesNestedList: true,
      leftIcon: <SettingsIcon />,
      nestedItems: [
        {
          primaryText: intl.formatMessage({ id: 'theme' }),
          secondaryText: intl.formatMessage({ id: themeID }),
          primaryTogglesNestedList: true,
          leftIcon: <StyleIcon />,
          nestedItems: themeItems,
        },
        {
          primaryText: intl.formatMessage({ id: 'language' }),
          secondaryText: intl.formatMessage({ id: locale }),
          primaryTogglesNestedList: true,
          leftIcon: <LanguageIcon />,
          nestedItems: localeItems,
        }
      ],
    },
    {
      value: null,
      visible: isAppInstallable && !isAppInstalled,
      onClick: () => {
        deferredPrompt.prompt()
      },
      primaryText: intl.formatMessage({
        id: 'install',
        defaultMessage: 'Install',
      }),
      leftIcon: <GetApp />,
    },
  ]
}
export default getMenuItems
