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

  result.data.allTests.nodes.forEach((node, index) => {
    createPage({
      path: `/resultado-${node._id}/`,
      component: require.resolve("./src/templates/test.js"),
      context: node,
      defer: index + 1 > 20,
    });
  })
}
