var proxy = require("http-proxy-middleware")


module.exports = {
  siteMetadata: {
    title: "Static App Template",
    description: "A template for building static apps with Gatsby.",
    author: "@datamade",
  },
  developMiddleware: app => {
  // for avoiding CORS while developing Netlify Functions locally
  // read more: https://www.gatsbyjs.org/docs/api-proxy/#advanced-proxying
    app.use(
      "/.netlify/functions/",
      proxy({
        target: "http://localhost:34567",
        pathRewrite: {
          "/.netlify/functions/": "",
        },
      })
    )
  },
  plugins: [
    // Manage changes to the document <head>
    // See: https://www.gatsbyjs.org/packages/gatsby-plugin-react-helmet/
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    // Image handling
    // See: https://www.gatsbyjs.org/packages/gatsby-plugin-sharp/
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    // Ship site with a manifest file that allows it to be saved to a smartphone
    // See: https://www.gatsbyjs.org/packages/gatsby-plugin-manifest/
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "gatsby-starter-default",
        short_name: "starter",
        start_url: "/",
        background_color: "#663399",
        theme_color: "#663399",
        display: "minimal-ui",
        icon: "src/images/gatsby-icon.png", // Replace this with a new icon
      },
    },
    // Enable Progressive Web App + Offline functionality
    // See: https://gatsby.dev/offline
    'gatsby-plugin-offline',
    // Make /admin/ views protected by login
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/admin/*`] },
    },
  ],
}
