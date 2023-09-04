import { store } from 'store';
import { createJob } from 'store/ducks';

// action handlers
export const JobMetaAction = () => {};

export const TagsGroupAction = () => {};

export const UploadFileAction = async () => {
  const { jt, jd, resumes, profile, tags } = store.getState().stepsContent;
  const payload = {
    jt,
    jd,
    resumes: [],
    tags,
    profile,
  };
  const { id } = await store.dispatch(createJob(payload));
  return {
    location: `/result`,
  };
};
