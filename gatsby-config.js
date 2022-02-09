
module.exports = {
  siteMetadata: {
    title: `Medisalud`,
    description: `Generador de QR para pruebas de COVID-19.`,
    author: `@medisaludc`
  },
  plugins: [
    {
      resolve: "gatsby-source-custom-api",
      options: {
        url: `https://medisalud-api.herokuapp.com/api/test/obtain-tests`,
        rootKey: `tests`,
        schemas: {
          tests: `
          _id: String
          address: String
          age: Int
          createdAt: String
          di: String
          firstname: String
          gender: String
          isDelete: Boolean
          isValid: Boolean
          lastname: String
          phone: String
          qrcode: String
          result: Boolean
          time: String
          updatedAt: String
          `
        }
      }
    },
    `gatsby-plugin-emotion`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/logo-medisalud-sin-letras.jpg`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
