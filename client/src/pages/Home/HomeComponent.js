import Page from 'material-ui-shell/lib/containers/Page'
import React from 'react'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import { useIntl } from 'react-intl'

const HomePage = () => {
  const intl = useIntl()

  const user = "Bob";

  return (
    <Page pageTitle={'Welcome Bob'}>
      <Scrollbar
        style={{ height: '100%', width: '100%', display: 'flex', flex: 1 }}
      >
        Something here
      </Scrollbar>
    </Page>
  )
}
export default HomePage
