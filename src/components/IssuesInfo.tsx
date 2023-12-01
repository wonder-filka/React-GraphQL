
import { useQuery, gql } from '@apollo/client';
import { TIssuesInResult } from '../types/Issues';
import CommentBlock from './CommentBlock';

export default function IssuesInfo({ name }: { name: string }) {
    const GET_ISSUES_OPEN = gql`
    query {
        repository(owner:"wonder-filka", name: "${name}") {
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
                        <h3>{node.title}</h3>
                        <p>{node.body}</p>
                        <CommentBlock edges={node.comments.edges} idIssue={(node.id.toString())}  />
                    </div>
                )
            })}
        </div>)
    } else {
        return null;
    }


}