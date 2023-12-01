export type TRepository = {
    id: string;
    name: string;
  };
  
  export type TRepositories = {
    nodes: TRepository[];
  };
  
  export type TDataInResult = {
    viewer: {
      repositories: TRepositories;
    };
  };


