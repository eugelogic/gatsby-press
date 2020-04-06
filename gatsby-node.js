const createPages = require(`./create/createPages`)
const createPosts = require(`./create/createPosts`)

exports.createPages = async ({ actions, graphql }) => {
    await createPages({ actions, graphql })
    await createPosts({ actions, graphql })
}