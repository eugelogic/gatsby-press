import React from 'react'
import { Link, graphql } from 'gatsby'
import Pagination from '../components/pagination'
import Layout from '../components/layout'
import moment from "moment/moment"

const BlogIndex = props => {
    const {
        data: {
            wpgql: { posts }
        },
        pageContext: { pageNumber, hasNextPage }
    } = props

    const currentPage = (1 < pageNumber) ? ` - page ${pageNumber}` : ``
    return (
        <Layout>
            <h1>Blog{currentPage}</h1>
            {posts.nodes.map(post =>
            <article key={post.id}>
                <h2>
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <time>{moment(post.date).format(`Do MMMM YYYY`)}</time>
                <h3>
                    <Link to={`user/${post.author.slug}`}>Author: {post.author.name}</Link>
                </h3>
                <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
            </article>
            )}
            <Pagination pageNumber={pageNumber} hasNextPage={hasNextPage} />
        </Layout>
    )
}

export default BlogIndex

export const pageQuery = graphql`
    query GET_POSTS($ids: [ID]) {
        wpgql {
            posts( where: { in: $ids }, first: 12 ) {
                nodes {
                    id
                    title(format: RENDERED)
                    uri
                    slug
                    date
                    author {
                        name
                        slug
                    }
                    excerpt(format: RENDERED)
                }
            }
        }
    }
`