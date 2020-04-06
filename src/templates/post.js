import React from 'react'
import { graphql } from 'gatsby'

const Post = props => {
    const { data: { wpgql: { post } } } = props
    const { title, content } = post
    return (
        <div>
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    )
}

export default Post

export const pageQuery = graphql`
    query GET_POST($id: ID!) {
        wpgql {
            post(id: $id) {
                uri
                title
                content
            }
        }
    }
`