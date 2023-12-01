import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { TDataInResult } from "../types/Repositories";
import { Select, Button } from 'antd';
import type { SelectProps } from 'antd';
import IssuesInfo from './IssuesInfo';

const GET_REPOSITORIES = gql`
query {
viewer {
    repositories(last: 20, isFork: false) {
    nodes {
        name
    }
    }
}
}
`;

export default function DisplayRepo() {
    const { loading, error, data } = useQuery<TDataInResult>(GET_REPOSITORIES);
    const [selectedRepo, setSelecterRepo] = useState<string>('pics-script');
    const [confirmedRepo, setConfirmedRepo] = useState<string>('');
    const [isShowRepoInfo, setIsShowNRepoInfo] = useState<boolean>(false);

    const handleChange = (value: string) => {
        setSelecterRepo(value)
    };

    const getRepoInfo = () => {
        setIsShowNRepoInfo(true)
        setConfirmedRepo(selectedRepo)
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    if (data) {
        let options: SelectProps['options'] = data.viewer.repositories.nodes.map(repo => ({
            value: repo.name,
            label: repo.name,
        }));

        return (
            <>
                <Select style={{ width: 120 }}
                    onChange={handleChange}
                    defaultValue="pics-script"
                    options={options} />
                <Button type="primary" onClick={getRepoInfo}>Show</Button>
                <br />
                {isShowRepoInfo ? <IssuesInfo name={confirmedRepo} /> : ''}
            </>

        )
    } else {
        return <h3>No issues</h3>;
    }
}