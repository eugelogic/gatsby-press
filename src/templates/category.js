import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

const CategoryTemplate = props => {
    const { data: { wpgql: { category } } } = props
    const { name, description } = category
    return (
        <Layout>
            <h1>Category: {name}</h1>
            <div dangerouslySetInnerHTML={{ __html: description}} />
        </Layout>
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