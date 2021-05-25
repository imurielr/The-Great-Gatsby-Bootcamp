import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';

import Layout from '../components/layout';
import * as blogStyles from './blog.module.scss';

const BlogPage = () => {
    const data = useStaticQuery(graphql`
        query {
            allMarkdownRemark {
                edges {
                    node {
                        frontmatter {
                            title
                            date
                        }
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `);

    return (
        <Layout>
            <h1>Blog</h1>
            <ol className={blogStyles.posts}>
                {data.allMarkdownRemark.edges.map(post => {
                    return (
                        <li className={blogStyles.post}>
                            <Link to={`/blog/${post.node.fields.slug}`}>
                                <h2>{ post.node.frontmatter.title }</h2>
                                <p>{ post.node.frontmatter.date }</p>
                            </Link>
                        </li>
                    )
                })}
            </ol>
        </Layout>
    );
}

export default BlogPage;