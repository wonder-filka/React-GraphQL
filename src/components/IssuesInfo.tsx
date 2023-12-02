
import { useQuery, gql } from '@apollo/client';
import { TIssuesInResult } from '../types/Issues';
import CommentBlock from './CommentBlock';

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
                comments(first: 10) {
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    if (data) {
        return (<div>
            {data?.repository.issues.edges.map(({ node }) => {
                return (
                    <div key={node.id}>
                        <h2>Issue name: {node.title}</h2>
                        <p style={{ fontSize: 14 }}>Description: {node.body}</p>
                        <h4>Comments:</h4>
                        <CommentBlock edges={node.comments.edges} idIssue={(node.id.toString())} username={username}/>
                    </div>
                )
            })}
        </div>)
    } else {
        return null;
    }


}