export const getDisplayUserType = (userType) => {
  let displayUserType;
  switch (userType) {
    case "staff":
      displayUserType = "Staff Member";
      break;
    case "medical":
      displayUserType = "Medical Staff";
      break;
    case "nurse":
      displayUserType = "Charge Nurse";
      break;
    default:
      displayUserType = "";
  }
  return displayUserType;
};
