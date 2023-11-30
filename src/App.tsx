import React from 'react';
import './App.css';
import { useQuery, gql } from '@apollo/client';
import { Button } from 'antd';

const GET_LOCATIONS = gql`
  query getLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

function DisplayLocations() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log(typeof data)
  return null;
}

function App() {
  return (
    <div className="App">
      <h2>My first Apollo app 🚀</h2>
      <br />
      <Button type="primary">Button</Button>
      <br />
      <DisplayLocations />
    </div>
  );
}

export default App;
