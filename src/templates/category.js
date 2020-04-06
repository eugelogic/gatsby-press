import React from 'react'
import { graphql } from 'gatsby'

const CategoryTemplate = props => {
    const { data: { wpgql: { category } } } = props
    const { name, description } = category
    return (
        <div>
            <h1>Category: {name}</h1>
            <div dangerouslySetInnerHTML={{ __html: description}} />
        </div>
    )
}

export default CategoryTemplate

export const pageQuery = graphql`
    query GET_CATEGORY($id: ID!) {
        wpgql {
            category(id: $id) {
                id
                name
                slug
                description
            }
        }
    }
`