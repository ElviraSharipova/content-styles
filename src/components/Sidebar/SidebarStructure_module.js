import React from 'react'

import {
    Home as HomeIcon,
    FilterNone as UIElementsIcon,
    BorderAll as TableIcon,
    QuestionAnswer as SupportIcon,
    LibraryBooks as LibraryIcon,
    HelpOutline as FAQIcon,
    BarChart as ChartIcon,
    Map as MapIcon,
    Apps as CoreIcon,
    Description as DescriptionIcon,
    ShoppingCart as ShoppingCartIcon,
    StarBorder as ExtraIcon,
    Chat as ChatIcon,
    Add as AddSectionIcon,
    FolderOpen as FolderIcon,
    Description as DocumentationIcon,
    Person as PersonIcon
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'

// components
import Dot from './components/Dot'

const structure = [
    { id: 4, type: 'divider' },
    { id: 5, type: 'title', label: 'Курс Стэнд' },
    {
        id: 13,
        label: 'Оглавление',
        icon: <FolderIcon />,
    },
            { 
              label: '1.1',
              link: '1#1',
            },
    { 
              label: '1.2',
              link: '1#2',
            },
    { id: 14, type: 'divider' },
]


export default structure
