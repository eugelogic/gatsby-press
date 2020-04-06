import React from 'react'
import { graphql } from 'gatsby'

const TagTemplate = props => {
    const { data: { wpgql: { tag } } } = props
    const { name, count } = tag
    return (
        <div>
            <h1>Tag: {name} ({count})</h1>
        </div>
    )
}

export default TagTemplate

export const pageQuery = graphql`
    query GET_TAG($id: ID!) {
        wpgql {
            tag(id: $id) {
                id
                name
                count
                slug
            }
        }
    }
`