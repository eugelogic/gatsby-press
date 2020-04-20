import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import moment from 'moment/moment'

const UserTemplate = props => {
    const { data: { wpgql: { user } } } = props
    const { name, description } = user
    const { data: { wpgql: { user: { posts } } } } = props
    return (
        <Layout>
            <h1>User: {name}</h1>
            <div dangerouslySetInnerHTML={{ __html: description }} />
            <h3>Posts published:</h3>
            {posts.nodes && posts.nodes.map(post =>
            <article key={post.id}>
                <h2>
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <time>{moment(post.date).format("Do MMMM YYYY")}</time>
                <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
            </article>
            )}
        </Layout>
    )
}

export default UserTemplate

export const pageQuery = graphql`
query GET_USER($id: ID!) {
    wpgql {
      user(id: $id) {
        id
        name
        description
        posts {
          nodes {
            id
            title(format: RENDERED)
            slug
            date
            excerpt(format: RENDERED)
          }
        }
      }
    }
  }
`