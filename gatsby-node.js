const { default: axios } = require("axios");

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  // const result = await graphql(`
  // {

  //   allCustomApi {
  //     nodes {
  //       _id
  //       address
  //       age
  //       createdAt
  //       di
  //       firstname
  //       gender
  //       id
  //       isDelete
  //       isValid
  //       lastname
  //       phone
  //       qrcode
  //       result
  //       time
  //       updatedAt
  //     }
  //   }
  // }
  //   `);

  // return Promise.all(
  //   result.data.allCustomApi.nodes.map(async node => {
  //     await createPage({
  //       path: `resultado-${node.id}/`,
  //       component: require.resolve("./src/templates/test.js"),
  //       context: node
  //     });
  //   })
  // );

  try {
    const res = await axios.get(`${process.env.GATSBY_SERVER_URL}/api/test/obtain-tests`);

    for (let test of res.data) {
      if (test.qrcode) {
        createPage({
          path: `/resultado-${test._id}/`,
          component: require.resolve("./src/templates/test.js"),
          context: test,
          defer: false,
        })
      }
    }
  } catch (err) {
    console.log(err);
  }
}
