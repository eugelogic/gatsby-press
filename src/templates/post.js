import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import moment from "moment/moment"
import '../styles/templates/post.css'

const Post = props => {
    const { data: { wpgql: { post } } } = props
    const { title, date, content, author, categories, tags } = post
    return (
        <Layout>
            <h1>{title}</h1>
            <div className="metadata">
                <time>{moment(date).format(`Do MMMM YYYY`)}</time>
                <p>Author: <Link to={`user/${author.slug}`}>{author.name}</Link></p>
            </div>
            <div className="taxonomy">
                Categories:
                    <ul>
                    {categories.nodes.map(cat => (
                        <li>
                            <Link to={`/blog/category/${cat.slug}`}>{cat.name}</Link>
                        </li>
                    ))}
                    </ul>
            </div>
            { tags.nodes && tags.nodes.length ? (
            <div className="taxonomy">
                Tags:
                    <ul>
                    {tags.nodes.map(tag => (
                        <li>
                            <Link to={`/blog/tag/${tag.slug}`}>{tag.name}</Link>
                        </li>
                    ))}
                    </ul>
            </div>
            ) : null }
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </Layout>
    )
}

export default Post

export const pageQuery = graphql`
    query GET_POST($id: ID!) {
        wpgql {
            post(id: $id) {
                uri
                title
                date
                content
                author {
                    name
                    slug
                }
                categories {
                    nodes {
                        name
                        slug
                    }
                }
                tags {
                    nodes {
                        name
                        slug
                    }
                }
            }
        }
    }
`