import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import MainMenu from './MainMenu'

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
        <div>
            <h2>
                <Link to={`/`}>{settings.title}</Link>
            </h2>
            <em>{settings.description}</em>
            <MainMenu />
        </div>
    )
}

export default Header