import React from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import classnames from 'classnames'
import {
    Fab,
    IconButton,
    Tab,
} from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

// styles
import useStyles from './styles'

// components
import Header from '../Header'
import Sidebar from '../Sidebar'
import Footer from '../Footer'
import { Link } from '../../components/Wrappers'

// pages
import Cabinet from '../../pages/cabinet'
import Hardware from '../../pages/hardware'
import Module from '../../pages/modules'
import Catalog from '../../pages/catalog/Catalog'
import Product from '../../pages/catalog/Products'
import Profile from '../../pages/profile/Profile'

// context
import { useLayoutState } from '../../context/LayoutContext'
import { useUserState } from "../../context/UserContext";

//Sidebar structure
import structure from '../Sidebar/SidebarStructure_module'

function Layout(props) {
  var { isAuthenticated } = useUserState();
  const isAuth = isAuthenticated()

  const classes = useStyles()
  const [value, setValue] = React.useState(2)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const open = Boolean(anchorEl)
  const id = open ? 'add-section-popover' : undefined
  const handleClick = event => {
      setAnchorEl(open ? null : event.currentTarget)
  }

  // global
  var layoutState = useLayoutState()

  const handleChange = (event, newValue) => {
      setValue(newValue)
  }

  function a11yProps(index) {
      return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
      }
  }

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuth ? (
            React.createElement(component, props)
          ) : (
              <Redirect to={"/login"} />
            )
        }
      />
    );
  }

  return (
      <div className={classes.root}>
          <Header history={props.history} />
          <div
              className={classnames(classes.content, {
                  [classes.contentShift]: layoutState.isSidebarOpened,
              })}
          >
              
                              <div className={classes.fakeToolbar} />
 
              <Switch>
                  <PrivateRoute path="/app/cabinet" component={Cabinet} />
                  <Route
                      path="/app/catalog/product/:id"
                      component={Product}
                  />
                  <PrivateRoute
                      path="/app/course/:id"
                      component={Module}
                  />
                  <PrivateRoute path="/app/hardware" component={Hardware} />
                  <PrivateRoute path="/app/course" component={Module} />
                  <PrivateRoute path="/app/catalog/product" component={Product} />
                  <PrivateRoute
                      path="/app/catalog"
                      component={Catalog}
                  />
                  <PrivateRoute path="/app/profile" component={Profile} />
              </Switch>
          </div>
      </div>
  )
}

export default withRouter(Layout)
