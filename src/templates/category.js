import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'

const CategoryTemplate = props => {
    const { data: { wpgql: { category } } } = props
    const { name, description, posts } = category
    return (
        <Layout>
            <h1>Category: {name}</h1>
            <div dangerouslySetInnerHTML={{ __html: description}} />
            {posts.nodes && posts.nodes.length ? (
                <>
                    <h2>Posts:</h2>
                    <ul>
                    {posts.nodes.map(post => (
                        <li key={post.id}>
                            <Link to={`blog/${post.slug}`}>{post.title}</Link>
                        </li>
                    ))}
                    </ul>
                </>
            ) : null }
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
                posts(first: 100) {
                    nodes {
                        id
                        title(format: RENDERED)
                        slug
                    }
                }
            }
        }
    }
`