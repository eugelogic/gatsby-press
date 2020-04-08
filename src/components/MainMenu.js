import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { createLocalLink } from '../utils'

const MainMenu = () => {
    const { wpgql: { menuItems: { nodes } } } = useStaticQuery(
        graphql`
            query {
                wpgql {
                    menuItems(where: {location: PRIMARY}) {
                        nodes {
                            id
                            label
                            url
                        }
                    }
                }
            }
        `)

    return (
        <nav>
            <ul>
                {nodes && nodes.map(menuItem =>
                <li key={menuItem.id}>
                    <Link to={createLocalLink(menuItem.url)}>{menuItem.label}</Link>
                </li>
                )}
            </ul>
        </nav>
    )
}

export default MainMenu
