require('dotenv').config();
const uRL = process.env.GATSBY_SOURCE_GRAPHQL_URL
const siteURL = process.env.GATSBY_SITE_URL

module.exports = {
  siteMetadata: {
    title: `Gatsby with Headless WordPress`,
    siteUrl: `${siteURL}`,
    description: `Pilot project of a Gatsby website with headless WordPress.`,
    author: `@EugeneMolari`
  },
  plugins: [
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `WPGQL`,
        fieldName: `wpgql`,
        url: `${uRL}`
      }
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        policy: [{ userAgent: `*`, disallow: `/`}]
      }
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Open Sans`,
            variant: [`400`, `700`]
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-39423737-15",
        head: true
      }
    }
  ]
}
