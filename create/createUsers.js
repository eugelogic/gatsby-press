const path = require(`path`)
module.exports = async ({ actions, graphql }) => {
    const GET_USERS = `
    query GET_USERS($first:Int) {
        wpgql {
            users(first: $first) {
                pageInfo {
                    endCursor
                    hasNextPage
                }
                nodes {
                    userId
                    id
                    slug
                }
            }
        }
    }
    `

    const { createPage } = actions
    const allUsers = []
    const fetchUsers = async variables =>
        await graphql(GET_USERS, variables).then(({ data }) => {
            const {
                wpgql: {
                    users: {
                        nodes,
                        pageInfo: { endCursor, hasNextPage }
                    }
                }
            } = data
            nodes.map(user => {
                allUsers.push(user)
            })
            if(hasNextPage) {
                return fetchUsers({ first: variables.first, after: endCursor })
            }
            return allUsers
        })

    await fetchUsers({ first: 100, after: null }).then(allUsers => {
        const userTemplate = path.resolve(`./src/templates/user.js`)

        allUsers.map(user => {
            console.log(`creating user: ${user.slug}`)
            createPage({
                path: `/user/${user.slug}`,
                component: userTemplate,
                context: user
            })
        })
    })
}
