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
import Dot from './Dot'

const structure = [
    { id: 4, type: 'divider' },
    { id: 5, type: 'title', label: 'Курс Стэнд22' },
    {
        id: 13,
        label: 'Огл',
        icon: <FolderIcon />,
        children: [
            { label: '1.12' },
            { label: '1.22' },
            { label: '1.32' },
            { label: '1.4' },
            { label: '1.5' },
            {
                label: 'Тесты',
                type: 'nested',
                children: [
                    { label: 'Level 2.1' },
                ],
            },
        ],
    },
    { id: 14, type: 'divider' },
]


export default structure
