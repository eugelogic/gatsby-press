const createPages = require(`./create/createPages`)
const createPosts = require(`./create/createPosts`)
const createCategories = require(`./create/createCategories`)

exports.createPages = async ({ actions, graphql }) => {
    await createPages({ actions, graphql })
    await createPosts({ actions, graphql })
    await createCategories({ actions, graphql })
}