const createPages = require(`./create/createPages`)

exports.createPages = async ({ actions, graphql }) => {
    await createPages({ actions, graphql })
}