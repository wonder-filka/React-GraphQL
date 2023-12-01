import React from 'react';
import './App.css';
import { useQuery, gql } from '@apollo/client';
import { Button } from 'antd';

const GET_REPOSITORIES = gql`
query {
  viewer {
    repositories(last: 20, isFork: false) {
      nodes {
        name
        description
      }
    }
  }
}
`;


export type TRepository = {
  id: string;
  name: string;
  description: string;
};

export type TRepositories = {
  nodes: TRepository[];
};

export type TDataInResult = {
  viewer: {
    repositories: TRepositories;
  };
};


function DisplayRepo() {
  const { loading, error, data } = useQuery<TDataInResult>(GET_REPOSITORIES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (!data) {
    return <p>An error occurred while fetching data.</p>;
  }
 
  let dataRepos: TRepository[] = [];
  if (data) {
    dataRepos = data.viewer.repositories.nodes;
    console.log(dataRepos)
    return (
      <>{
        dataRepos.map(({ name, description }, index) => {
          console.log(index, name)
          return  (
            <div key={index}>
              <h3>{name}</h3>
              <br />
              <p>{description}</p>
              <br />
            </div>
          )
        }
       )}
      </>
    )
  } else {
    return <div>Error</div>
  } 
}

function App() {
  
  return (
    <div className="App">
      <h2>My first Apollo app 🚀</h2>
      <br />
      <Button type="primary">Button</Button>
      <br />
      <DisplayRepo />
    </div>
  );
}

export default App;
