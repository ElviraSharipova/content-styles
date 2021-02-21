import React from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import classnames from 'classnames'
import Icon from '@mdi/react'
import {
    mdiSettings as SettingsIcon,
    mdiFacebookBox as FacebookIcon,
    mdiTwitterBox as TwitterIcon,
    mdiGithubBox as GithubIcon,
} from '@mdi/js'
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

//Sidebar structure
import structure from '../Sidebar/SidebarStructure_module'

function Layout(props) {
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
                    <Route path="/app/cabinet" component={Cabinet} />
                    <Route
                        path="/app/catalog/product/:id"
                        component={Product}
                    />
                    <Route
                        path="/app/module/:id"
                        component={Module}
                    />
                    <Route path="/app/courses" component={Catalog} />
                    <Route path="/app/hardware" component={Hardware} />
                    <Route path="/app/module" component={Module} />
                    <Route path="/app/catalog/product" component={Product} />
                    <Route
                        path="/app/catalog"
                        component={Catalog}
                    />
                    <Route path="/app/profile" component={Profile} />
                </Switch>
           </div>
        </div>
    )
}

export default withRouter(Layout)
