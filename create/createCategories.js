const path = require(`path`)
module.exports = async ({ actions, graphql }) => {
    const GET_CATEGORIES = `
    query GET_CATEGORIES($first:Int) {
        wpgql {
            categories(first: $first) {
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
    const allCategories = []
    const fetchCategories = async variables =>
        await graphql(GET_CATEGORIES, variables).then(({ data }) => {
            const {
                wpgql: {
                    categories: {
                        nodes,
                        pageInfo: { endCursor, hasNextPage }
                    }
                }
            } = data
            nodes.map(category => {
                allCategories.push(category)
            })
            if(hasNextPage) {
                return fetchCategories({ first: variables.first, after: endCursor })
            }
            return allCategories
        })

    await fetchCategories({ first: 100, after: null }).then(allCategories => {
        const categoryTemplate = path.resolve(`./src/templates/category.js`)

        allCategories.map(category => {
            console.log(`creating category: ${category.slug}`)
            createPage({
                path: `/blog/category/${category.slug}`,
                component: categoryTemplate,
                context: category
            })
        })
    })
}
