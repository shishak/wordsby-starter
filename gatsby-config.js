require("dotenv").config();
const previewPrefix = require("wordsby/preview");

const gatsbyConfig = {
  pathPrefix: previewPrefix(), // if you need to add a prefix to this site, pass it as a string eg. previewPrefix("/some-prefix").
  siteMetadata: {
    siteUrl: `http://wordsby.test`
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    {
      resolve: "gatsby-plugin-google-fonts",
      options: {
        fonts: ["poppins:100,300,400,500"]
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "wordsby",
        path: `${__dirname}/wordsby/`
      }
    },
    {
      resolve: "gatsby-plugin-wordsby",
      options: {
        previewToken: process.env.preview_token,
        siteUrl: `http://wordsby.test`
      }
    },
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: `${__dirname}/static/`
      }
    },
    {
      resolve: "gatsby-plugin-nprogress",
      options: {
        color: "rebeccapurple"
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-catch-links",
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `{
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage(filter: {context: {id: {ne: null}}}) {
            edges {
              node {
                path
                context {
                  id
                }
              }
            }
          }
      }`
      }
    },
    {
      resolve: "gatsby-plugin-transition-link",
      options: {
        layout: require.resolve(`./src/components/layouts/index.js`)
      }
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /svg/
        }
      }
    },
    "gatsby-plugin-netlify",
    "gatsby-plugin-netlify-cache"
  ]
};

if (process.env.NODE_ENV === "production" && !process.env.WORDSBY_PREVIEW) {
  gatsbyConfig.plugins.push("gatsby-plugin-offline");
}

if (process.env.NODE_ENV === "production") {
  gatsbyConfig.plugins.push("gatsby-plugin-favicon");
}

// if (
//   wordsbyConfig.keys.googleAnalyticsID &&
//   process.env.NODE_ENV === "production" &&
//   !process.env.WORDSBY_PREVIEW
// ) {
//   gatsbyConfig.plugins.push({
//     resolve: "gatsby-plugin-google-analytics",
//     options: {
//       trackingId: wordsbyConfig.keys.googleAnalyticsID
//     }
//   });
// }

module.exports = gatsbyConfig;
