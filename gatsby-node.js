const { default: axios } = require("axios");

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const result = await graphql(`
  {

    allCustomApi {
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

  result.data.allCustomApi.nodes.forEach((node, index) => {
    createPage({
      path: `resultado-${node.id}/`,
      component: require.resolve("./src/templates/test.js"),
      context: node,
      defer: index + 1 > 20,
    });
  })
  // try {
  //   const res = await axios.get(`${process.env.GATSBY_SERVER_URL}/api/test/obtain-tests`);

  //   for (let test of res.data) {
  //     if (test.qrcode) {
  //       createPage({
  //         path: `/resultado-${test._id}/`,
  //         component: require.resolve("./src/templates/test.js"),
  //         context: test,
  //         defer: false,
  //       })
  //     }
  //   }
  // } catch (err) {
  //   console.log(err);
  // }
}
