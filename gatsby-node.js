// import path from 'path';
const path = require('path');

// Gerar páginas a partir de markdown
exports.createPages = ({ graphql, actions}) => {
    const { createPage } = actions;

    const post = path.resolve('src/templates/post.js');
    return graphql(
      `
        {
          allMarkdownRemark {
            edges {
              node {
                html
                frontmatter {
                  title
                  date(formatString: "DD/MM")
                  path
                }
              }
            }
          }
        }
      `
    ).then(res => {

      console.log(res);
      if (res.errors) {
        Promise.reject(res.errors);
      }

      const posts = res.data.allMarkdownRemark.edges;

      posts.forEach( ({ node }) => {
        const { frontmatter } = node;

        // console.log(frontmatter, node);

        createPage(
          {
            path: frontmatter.path,
            component: post,
            context: {
              path: frontmatter.path
            }
          }
        )
      });
  });
}
