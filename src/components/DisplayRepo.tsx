import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { TDataInResult } from "../types/Repositories";
import { Select, Button } from 'antd';
import type { SelectProps } from 'antd';
import { Content } from 'antd/es/layout/layout';
import IssuesInfo from './IssuesInfo';

const GET_REPOSITORIES = gql`
    query {
        viewer {
            login
            repositories(last: 20, isFork: false) {
                nodes {
                    name
                }
            }
        }
        
    }
`;

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '80px',
};


export default function DisplayRepo() {
    const { loading, error, data } = useQuery<TDataInResult>(GET_REPOSITORIES);
    const [selectedRepo, setSelectedRepo] = useState<string>('pics-script');
    const [confirmedRepo, setConfirmedRepo] = useState<string>('');
    const [isShowRepoInfo, setIsShowNRepoInfo] = useState<boolean>(false);

    const handleChange = (value: string) => {
        setSelectedRepo(value)
    };

    const handleClear = () => {
        setIsShowNRepoInfo(false)
    };

    const getRepoInfo = () => {
        setConfirmedRepo(selectedRepo)
        setIsShowNRepoInfo(true)
    };

    console.log(data)
    if (loading) return <Content style={contentStyle}>Loading...</Content>;
    if (error) return <Content style={contentStyle}>Error : {error.message}</Content>;
    if (data) {
        let options: SelectProps['options'] = data.viewer.repositories.nodes.map(repo => ({
            value: repo.name,
            label: repo.name,
        }));

        return (
            <>
                <Content style={contentStyle}>
                    <span>Select github repo:</span>
                    <Select style={{ width: 180 }}
                        onChange={handleChange}
                        defaultValue={data.viewer.repositories.nodes[0].name}
                        options={options} />
                    <Button type="primary" onClick={getRepoInfo}>Submit</Button>
                    <Button type="text" onClick={handleClear}>Clear</Button>
                </Content>
                {isShowRepoInfo ? <IssuesInfo name={confirmedRepo} username={data.viewer.login} /> : ''}
            </>

        )
    } else {
        return <h3>No issues</h3>;
    }
}