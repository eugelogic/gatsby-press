import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { createLocalLink } from '../utils'

const MainMenu = () => {
    const { wpgql: { menuItems: { nodes } } } = useStaticQuery(
        graphql`
            fragment MenuFields on WPGQL_MenuItem {
                id
                label
                url
            }

            query {
                wpgql {
                    menuItems(where: {location: PRIMARY}) {
                        nodes {
                            ...MenuFields
                            childItems {
                                nodes {
                                    ...MenuFields
                                }
                            }
                        }
                    }
                }
            }
        `)

    const reanderMenuItem = menuItem => {
        let hasChild = false
        if(menuItem.childItems && menuItem.childItems.nodes.length) {
            hasChild = true
        }
        return (
            <li key={menuItem.id}>
                <Link to={createLocalLink(menuItem.url)}>{menuItem.label}</Link>
                {hasChild && renderChildMenu(menuItem)}
            </li>
        )
    }

    const renderChildMenu = menuItem => {
        return <ul>{menuItem.childItems.nodes.map(child => reanderMenuItem(child))}</ul>
    }

    return (
        <nav>
            <ul>{nodes && nodes.map(menuItem => reanderMenuItem(menuItem))}</ul>
        </nav>
    )
}

export default MainMenu
