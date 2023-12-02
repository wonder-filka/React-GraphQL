import React, { useEffect, useState } from 'react';
import { Button, Input, Flex, Divider, message, Space } from "antd";
import { TComment } from "../types/Issues";
import { gql, useMutation } from '@apollo/client';


const baseStyle: React.CSSProperties = {
    padding: 14,

};


export default function CommentBlock({ edges, idIssue, username }: { edges: TComment[], idIssue: string, username: string }) {
    const [value, setValue] = useState('');
    const [commentsData, setCommentsData] = useState<TComment[]>(edges);

    const [addCommentMutation] = useMutation(gql`
        mutation AddCommentToIssue {
          addComment(input: {subjectId: "${idIssue}", body: "${value}"}) {
            clientMutationId
          }
        }
    `);

    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Comment saved',
        });
    };

    const handleSendComment = () => {
        addCommentMutation();
        setCommentsData(prevComments => [
            ...prevComments,
            { node: { body: value, author: { login: username } } }
        ]);
        success()
    };


    return (
        <>
            {contextHolder}
            <Divider orientation="left">Comments:</Divider>
            <Flex wrap="wrap" gap="small">

                {commentsData.map(({ node: commentNode }, index) => (
                    <div key={index}>
                        <div style={{ ...baseStyle, backgroundColor: index % 2 ? '#f5f5f5' : '#f0f0f0' }} >
                            <p>{commentNode.body}</p>
                            <p style={{ fontSize: 10 }}>Author: {commentNode.author.login}</p>
                        </div>
                    </div>
                ))}
            </Flex>
            < br />

            <Space.Compact style={{ width: '100%' }}>
                <Input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Add Comment"

                />
                <Button type="default" onClick={handleSendComment}>Send</Button>
            </Space.Compact>
        </>
    );
}
