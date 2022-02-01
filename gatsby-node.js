const { default: axios } = require("axios");

exports.createPages = async ({ actions }) => {
  const { createPage } = actions

  const res = await axios.get(`${process.env.GATSBY_SERVER_URL}/api/test/obtain-tests`);

  for (let test of res.data) {
    if (test.result) {
      createPage({
        path: `/resultado-${test._id}/`,
        component: require.resolve("./src/templates/test.js"),
        context: test,
        defer: true,
      })
    }
  }
}
