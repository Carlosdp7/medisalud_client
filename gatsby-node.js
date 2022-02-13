const path = require("path")

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const result = await graphql(`
  {
    allTests {
      nodes {
        _id
        address
        age
        createdAt
        di
        firstname
        gender
        id
        isDelete
        isValid
        lastname
        phone
        qrcode
        result
        time
        updatedAt
      }
    }
  }
    `);

  result.data.allTests.nodes.forEach((node) => {
    if (node.qrcode) {
      createPage({
        path: `/resultado-${node._id}/`,
        component: path.resolve("./src/templates/test.js"),
        context: node
      });
    }
  })
}
