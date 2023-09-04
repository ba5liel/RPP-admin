import { message, Progress, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { SERVER_URL } from 'config';
import useFetch from 'hooks/useFetch';
import Layout from 'layout/Layout';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { StoreState } from 'store';
import { ResultsWrapper, RTableContainer } from './Results.style';
import ExportResults from './ExportResults';
interface RecordType {
  name: string;
  job_session: string;
  resume: string;
  type: string;
  summary_or_objective: string;
  number_of_portfolio: number;
  portfolio_score: number;
  number_of_companies: number;
  work_experience_score: number;
  work_experience: string;
  education_score: number;
  education: string;
  years_of_experiance: number;
  achievements_or_awards: string;
  top_skill: string;
  skills: string;
  skill_relevancy_score: number;
  relevance: number;
  total_score: number;
  _key: number;
}

const columns: ColumnsType<RecordType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Job Session',
    dataIndex: 'job_session',
    key: 'job_session',
  },
  {
    title: 'Resume',
    dataIndex: 'resume',
    key: 'resume',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Summary/Objective',
    dataIndex: 'summary_or_objective',
    key: 'summary_or_objective',
  },
  {
    title: 'Portfolio Count',
    dataIndex: 'number_of_portfolio',
    key: 'number_of_portfolio',
  },
  {
    title: 'Portfolio Score',
    dataIndex: 'portfolio_score',
    key: 'portfolio_score',
    sorter: (a, b) => a.portfolio_score - b.portfolio_score,
  },
  {
    title: 'Company Count',
    dataIndex: 'number_of_companies',
    key: 'number_of_companies',
  },
  {
    title: 'Work Experience Score',
    dataIndex: 'work_experience_score',
    key: 'work_experience_score',
    sorter: (a, b) => a.work_experience_score - b.work_experience_score,
  },
  {
    title: 'Work Experience',
    dataIndex: 'work_experience',
    key: 'work_experience',
  },
  {
    title: 'Education Score',
    dataIndex: 'education_score',
    key: 'education_score',
    sorter: (a, b) => a.education_score - b.education_score,
  },
  {
    title: 'Education',
    dataIndex: 'education',
    key: 'education',
  },
  {
    title: 'Years of Experience',
    dataIndex: 'years_of_experiance',
    key: 'years_of_experiance',
  },
  {
    title: 'Achievements/Awards',
    dataIndex: 'achievements_or_awards',
    key: 'achievements_or_awards',
  },
  {
    title: 'Top Skill',
    dataIndex: 'top_skill',
    key: 'top_skill',
  },
  {
    title: 'Skills',
    dataIndex: 'skills',
    key: 'skills',
  },
  {
    title: 'Skill Relevancy Score',
    dataIndex: 'skill_relevancy_score',
    key: 'skill_relevancy_score',
    sorter: (a, b) => a.skill_relevancy_score - b.skill_relevancy_score,
  },
  {
    title: 'Relevance',
    dataIndex: 'relevance',
    key: 'relevance',
  },
  {
    title: 'Total Score',
    dataIndex: 'total_score',
    key: 'total_score',
    sorter: (a, b) => a.total_score - b.total_score,
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <a href={record.resume} target="__blank">
        View Resume
      </a>
    ),
  },
];

const Leaderboard: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const userId = useSelector((state: StoreState) => state.auth.user?.id);
  const URL = `/api/jobs/${jobId}/results`;
  const [results, isLoading, error] = useFetch(URL);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (!results) return;
    console.log(results);
    const resultsArray = results.map((result, idx) => {

      // // fixing nulls
      // Object.keys(userInfo).forEach(key => {
      //   const value = userInfo[key];
      //   if (!value) {
      //     userInfo[key] = 'NA';
      //   }
      // });

      const resumeLink = `${SERVER_URL}/api/pdf/${userId}/${result.resume}`;
      return {
        _key: idx,
         ...result,
         resumeLink
      };
    });
    setData(resultsArray);
  }, [results, jobId, userId]);

  error && message.error(error);

  return (
    <Layout>
      <ResultsWrapper>
        <ExportResults data={data} />
        <RTableContainer>
        <Table
  pagination={{ defaultPageSize: 8 }}
  columns={columns.map(column => ({
    ...column,
    responsive: ['xs', 'sm', 'md', 'lg', 'xl'],  // Add this line to each column
  }))}
  loading={isLoading}
  dataSource={data}
  rowKey={r => r._key}
  scroll={{ x: 'max-content' }}  // Add scroll prop
/>

        </RTableContainer>
      </ResultsWrapper>
    </Layout>
  );
};

export default Leaderboard;
