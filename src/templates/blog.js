import React from 'react'
import { Link, graphql } from 'gatsby'
import Pagination from '../components/pagination'

const BlogIndex = props => {
    const {
        data: {
            wpgql: { posts }
        },
        pageContext: { pageNumber, hasNextPage }
    } = props

    const currentPage = (1 < pageNumber) ? ` - page ${pageNumber}` : ``
    return (
        <div>
            <h1>Blog{currentPage}</h1>
            {posts.nodes.map(post =>
            <article key={post.id}>
                <h2>
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <time>{post.date}</time>
                <h3>
                    <Link to={post.author.uri}>Author: {post.author.name}</Link>
                </h3>
                <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
            </article>
            )}
            <Pagination pageNumber={pageNumber} hasNextPage={hasNextPage} />
        </div>
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
                        uri
                    }
                    excerpt(format: RENDERED)
                }
            }
        }
    }
`