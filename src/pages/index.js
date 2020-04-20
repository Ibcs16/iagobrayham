import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo";
import styled from "styled-components";


const Container = styled.div`
  color: ${ props => props.theme.primary};
`;

const IndexPage = ({ data }) => {

  const {allMarkdownRemark } = data;
  const { edges } = allMarkdownRemark;

  return (
    <Layout>
      <SEO title="Home" />
      <Container>
      {
        edges.map( item => {
          const { node: { frontmatter } } = item;
          return (
            <>
              <p>{frontmatter.title}</p>
              <Link to={`/${frontmatter.path}`} key={frontmatter.path}>
                <h1 key={frontmatter.path}>{frontmatter.title}</h1>
              </Link>
            </>
          );
      })
      }
      </Container>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export const pageQuery = graphql`
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
`;

export default IndexPage
