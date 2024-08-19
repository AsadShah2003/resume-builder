export const EduValidation = (userEdu: any): any => {
  const errors: any = {
    isDegreeEmpty: !userEdu.educationDegree,
    isEndDateEmpty:
      userEdu.isStillStudying === false && !userEdu.educationEndDate,
    isInstituteEmpty: !userEdu.educationInstitute,
    isStartDateEmpty: !userEdu.educationStartDate,
  };

  return errors;
};

export default EduValidation;
