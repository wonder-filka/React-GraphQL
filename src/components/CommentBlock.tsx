import React, { useState } from 'react';
import { Button, Input } from "antd";
import { TComment } from "../types/Issues";
import { gql, useMutation } from '@apollo/client';

export default function CommentBlock({ edges, idIssue }: { edges: TComment[], idIssue: string }) {
    const [value, setValue] = useState('');

    const [addCommentMutation] = useMutation(gql`
        mutation AddCommentToIssue {
          addComment(input: {subjectId: "${idIssue}", body: "${value}"}) {
            clientMutationId
          }
        }
    `);

    const handleSendComment = () => {
        addCommentMutation();
    };

    return (
        <div>
            {edges.map(({ node: commentNode }, index) => (
                <ul key={index}>
                    <li>
                        <p>{commentNode.body}</p>
                        <p>Author: {commentNode.author.login}</p>
                    </li>
                </ul>
            ))}
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Add Comment"
            />
            <Button type="default" onClick={handleSendComment}>Send</Button>
        </div>
    );
}
