const path = require('path');

module.exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
    const blogTemplate = path.resolve('./src/templates/blog.jsx');
    const res = await graphql(`
        query {
            allContentfulBlogPost {
                edges {
                    node {
                        slug
                    }
                }
            }
        }
    `)

    res.data.allContentfulBlogPost.edges.forEach(page => {
        createPage({
            component: blogTemplate,
            path: `/blog/${page.node.slug}`,
            context: {
                slug: page.node.slug
            }
        });
    });
}