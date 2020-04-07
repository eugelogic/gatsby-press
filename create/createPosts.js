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
                    postId
                    title
                }
            }
        }
    }
    `

    const { createPage } = actions
    const allPosts = []

    // Blog Index (1/3)
    const blogPages = []
    let pageNumber = 0
    //

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

            // Blog Index (2/3)
            const nodeIds = nodes.map(node => node.postId)
            const blogTemplate = path.resolve(`./src/templates/blog.js`)
            const blogPath = !variables.after ? `/blog/` : `/blog/page/${pageNumber + 1}`

            blogPages[pageNumber] = {
                path: blogPath,
                component: blogTemplate,
                context: {
                    ids: nodeIds,
                    pageNumber: pageNumber,
                    hasNextPage: hasNextPage
                },
                ids: nodeIds
            }
            //

            nodes.map(post => {
                allPosts.push(post)
            })
            if(hasNextPage) {
                pageNumber ++
                return fetchPosts({ first: 12, after: endCursor })
            }
            return allPosts
        })

    await fetchPosts({ first: 12, after: null }).then(allPosts => {
        const postTemplate = path.resolve(`./src/templates/post.js`)

        // Blog Index (3/3)
        blogPages.map(page => {
            console.log(`creating blog index: ${page.path}`)
            createPage(page)
        })
        //

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