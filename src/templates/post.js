import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import moment from "moment/moment"

const Post = props => {
    const { data: { wpgql: { post } } } = props
    const { title, date, content } = post
    return (
        <Layout>
            <h1>{title}</h1>
            <time>{moment(date).format(`Do MMMM YYYY`)}</time>
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
            }
        }
    }
`