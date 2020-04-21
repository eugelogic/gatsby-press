import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import MainMenu from './main-menu'

const Header = () => {
    const data = useStaticQuery(graphql`
        query {
            wpgql {
                generalSettings {
                    title
                    description
                }
            }
        }
    `)
    const { generalSettings: settings } = data.wpgql
    return (
        <header className="header">
            <h2>
                <Link to={`/`}>{settings.title}</Link>
            </h2>
            <em>{settings.description}</em>
            <MainMenu />
        </header>
    )
}

export default Header