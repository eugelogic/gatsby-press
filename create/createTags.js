const path = require(`path`)
module.exports = async ({ actions, graphql }) => {
    const GET_TAGS = `
    query GET_TAGS($first:Int) {
        wpgql {
            tags(first: $first) {
                pageInfo {
                    endCursor
                    hasNextPage
                }
                nodes {
                    databaseId
                    id
                    slug
                }
            }
        }
    }
    `

    const { createPage } = actions
    const allTags = []
    const fetchTags = async variables =>
        await graphql(GET_TAGS, variables).then(({ data }) => {
            const {
                wpgql: {
                    tags: {
                        nodes,
                        pageInfo: { endCursor, hasNextPage }
                    }
                }
            } = data
            nodes.map(tag => {
                allTags.push(tag)
            })
            if(hasNextPage) {
                return fetchTags({ first: variables.first, after: endCursor })
            }
            return allTags
        })

    await fetchTags({ first: 100, after: null }).then(allTags => {
        const tagTemplate = path.resolve(`./src/templates/tag.js`)

        allTags.map(tag => {
            console.log(`creating tag: ${tag.slug}`)
            createPage({
                path: `/blog/tag/${tag.slug}`,
                component: tagTemplate,
                context: tag
            })
        })
    })
}
