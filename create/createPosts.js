const path = require(`path`)
module.exports = async ({ actions, graphql }) => {
    const GET_POSTS = `
    query GET_POSTS($first:Int $after:String) {
        wpgql {
            posts(
                first: $first
                after: $after
            ) {
                pageInfo {
                    endCursor
                    hasNextPage
                }
                nodes {
                    id
                    uri
                    databaseId
                    title
                }
            }
        }
    }
    `

    const { createPage } = actions
    const allPosts = []
    const fetchPosts = async variables =>
        await graphql(GET_POSTS, variables).then(({ data }) => {
            const {
                wpgql: {
                    posts: {
                        nodes,
                        pageInfo: { endCursor, hasNextPage }
                    }
                }
            } = data
            nodes.map(post => {
                allPosts.push(post)
            })
            if(hasNextPage) {
                return fetchPosts({ first: variables.first, after: endCursor })
            }
            return allPosts
        })

    await fetchPosts({ first: 100, after: null }).then(allPosts => {
        const postTemplate = path.resolve(`./src/templates/post.js`)

        allPosts.map(post => {
            console.log(`creating post: ${post.uri}`)
            createPage({
                path: `/blog${post.uri}`,
                component: postTemplate,
                context: post
            })
        })
    })
}