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
        url: `https://gatsbypress.website/graphql`
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
    }
  ]
}
