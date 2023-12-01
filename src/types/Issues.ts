
export type TCommentAuthor = {
    login: string;
}

export type TComment = {
    node: {
        author: TCommentAuthor;
        body: string;
    }
}

export type TIssueComments = {
    edges: TComment[]
}

export type TIssue = {
    comments: TIssueComments[];
    title: string;
    url: string;
}

export type TIssueNode = {
    node: TIssue;
}

  export type TIssuesData = {
    edges: TIssueNode[];
  }

  export type TIssuesInResult = {
    repository: {
        issues: TIssuesData;
    }
  }