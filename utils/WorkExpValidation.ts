export const WorkExpValidation = (userWorkExp: any): any => {
  const errors: any = {
    isJobTitleEmpty: !userWorkExp.jobTitle,
    isJobCompanyEmpty: !userWorkExp.jobCompany,
    isJobStartDateEmpty: !userWorkExp.jobStartDate,
    isJobEndDateEmpty:
      userWorkExp.isStillWorking === false && !userWorkExp.jobEndDate,
    isJobSummaryEmpty: !userWorkExp.jobSummary,
  };

  return errors;
};

export default WorkExpValidation;
