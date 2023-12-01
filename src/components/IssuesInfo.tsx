
import { useQuery, gql } from '@apollo/client';
import { TIssuesInResult } from '../types/Issues';


export default function IssuesInfo({ name }: { name: string }) {
    const GET_ISSUES_OPEN = gql`
    query {
        repository(owner:"wonder-filka", name: "${name}") {
          issues(first:20, states: OPEN) {
            edges {
              node {
                title
                url
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

    console.log(data?.repository.issues.edges[1].node.title)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    if (data) {
        return (<div>
            <h1>{name}</h1>
            <h3>{data.repository.issues.edges[0].node.title}</h3>
        </div>)
    } else {
        return null;
    }


}