require('dotenv').config();
const wPURL = process.env.WORDPRESS_URL

module.exports = {
  siteMetadata: {
    title: `Gatsby with Headless WordPress`,
    description: `Pilot project of a Gatsby website with headless WordPress.`,
    author: `@EugeneMolari`
  },
  plugins: [
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `WPGQL`,
        fieldName: `wpgql`,
        url: `${wPURL}graphql`
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
