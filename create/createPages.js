const path = require(`path`)
module.exports = async ({ actions, graphql }) => {
    const GET_PAGES = `
    query GET_PAGES($first:Int $after:String) {
        wpgql {
            pages(
                first: $first
                after: $after
                where: {
                    parent: null
                }
            ) {
                pageInfo {
                    endCursor
                    hasNextPage
                }
                nodes {
                    isFrontPage
                    id
                    uri
                    pageId
                    title
                }
            }
        }
    }
    `

    const { createPage } = actions
    const allPages = []
    const fetchPages = async variables =>
        await graphql(GET_PAGES, variables).then(({ data }) => {
            const {
                wpgql: {
                    pages: {
                        nodes,
                        pageInfo: { endCursor, hasNextPage }
                    }
                }
            } = data
            nodes.map(page => {
                allPages.push(page)
            })
            if(hasNextPage) {
                return fetchPages({ first: variables.first, after: endCursor })
            }
            return allPages
        })

    await fetchPages({ first: 100, after: null }).then(allPages => {
        const pageTemplate = path.resolve(`./src/templates/page.js`)

        allPages.map(page => {
            if(page.isFrontPage === true ) page.uri = `/`
            console.log(`creating page: ${page.uri}`)
            createPage({
                path: page.uri,
                component: pageTemplate,
                context: page
            })
        })
    })
}