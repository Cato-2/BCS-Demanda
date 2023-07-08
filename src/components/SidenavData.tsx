import React from 'react'
import * as FaIcons from 'react-icons/fa' 

export const SidenavData = [
    {
        title: 'Dashboard',
        path: '/',
        icon: <FaIcons.FaHome />
    },
    {
        title: 'Tareas',
        path: '/projects',
        icon: <FaIcons.FaUsers />
    },
    {
        title: 'Roles',
        path: '/roles',
        icon: <FaIcons.FaUserTag />
    },
    {
        title: 'Demanda',
        path: '/demanda',
        icon: <FaIcons.FaUserTag />   
    }
]
