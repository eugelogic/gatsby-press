import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'

const TagTemplate = props => {
    const { data: { wpgql: { tag } } } = props
    const { name, count, posts } = tag
    return (
        <Layout>
            <h1>Tag: {name} ({count ? count : '0'})</h1>
            {posts.nodes && posts.nodes.length ? (
                <>
                    <h2>Posts:</h2>
                    <ul>
                    {posts.nodes.map(post => (
                        <li key={post.id}>
                            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                        </li>
                    ))}
                    </ul>
                </>
            ) : null }
        </Layout>
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