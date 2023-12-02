import React, { useEffect, useState } from 'react';
import { Button, Input, Flex } from "antd";
import { TComment } from "../types/Issues";
import { gql, useMutation } from '@apollo/client';

export default function CommentBlock({ edges, idIssue, username }: { edges: TComment[], idIssue: string, username: string }) {
    const [value, setValue] = useState('');
    const [commentsData, setCommentsData] = useState<TComment[]>(edges)
    const [addCommentMutation] = useMutation(gql`
        mutation AddCommentToIssue {
          addComment(input: {subjectId: "${idIssue}", body: "${value}"}) {
            clientMutationId
          }
        }
    `);

    const handleSendComment = () => {
        addCommentMutation();
        setCommentsData(prevComments => [
          ...prevComments,
          { node: { body: value, author: { login: username } } }
        ]);
      };

    return (
        <div>
            <Flex wrap="wrap" gap="small">
                {commentsData.map(({ node: commentNode }, index) => (
                    <ul key={index}>
                        <li>
                            <p style={{fontSize: 14}}>{commentNode.body}</p>
                            <p style={{fontSize: 10}}>Author: {commentNode.author.login}</p>
                        </li>
                    </ul>
                ))}
            </Flex>
            <Input
                style={{ width: 320 }}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Add Comment"
                
            />
          
            <Button type="default" onClick={handleSendComment}>Send</Button>
        </div>
    );
}
