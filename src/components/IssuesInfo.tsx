
import { useQuery, gql } from '@apollo/client';
import { TIssuesInResult } from '../types/Issues';
import CommentBlock from './CommentBlock';
import { Card, Space, Divider, Col, Row } from 'antd';
import Link from 'antd/es/typography/Link';

export default function IssuesInfo({ name, username }: { name: string, username: string }) {
  const GET_ISSUES_OPEN = gql`
    query {
        repository(owner:"${username}", name: "${name}") {
          issues(first:20, states: OPEN) {
            totalCount 
            edges {
              node {
                title
                url
                id
                body
                comments(first: 100) {
                    edges {
                      node {
                        author {
                          login
                        }
                        body
                      }
                    }
                  }
              }
            }
          }
        }
    }
        `;

  const { loading, error, data } = useQuery<TIssuesInResult>(GET_ISSUES_OPEN);

  const dataLenght = data?.repository.issues.edges.length
  if (loading) return <Divider orientation="left">Loading...</Divider>;
  if (error) return <Divider orientation="left">Error : {error.message}</Divider>;
  console.log(dataLenght)
  if (dataLenght !== 0) {
    return (
      <>      
      <Row gutter={16} style={{ margin: 14 }}>
        {data?.repository.issues.edges.map(({ node }) => {
          return (
            <Col xs={24} sm={8} md={8} lg={8} xl={8} >
              <Card key={node.id} title={node.title} bordered={false}>
                <p style={{ padding: 0 }}>Description: {node.body}</p>
             
                < br />
                <CommentBlock edges={node.comments.edges} idIssue={(node.id.toString())} username={username} />
              </Card >
            </Col>
          )
        })}

      </Row>
      </>
      )
  } else {
    return <Divider orientation="left">No issues</Divider>;
  }


}