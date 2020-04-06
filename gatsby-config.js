module.exports = {
  siteMetadata: {
    title: `Headless WordPress with Gatsby`,
    description: `Demo project of a headless WordPress site with Gatsby on the front end.`,
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
    }
  ]
}
