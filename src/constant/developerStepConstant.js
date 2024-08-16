import moment from "moment";

const RELOCATE_OPTIONS = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];
export const LEVEL_OPTIONS = [
  {
    label: "Beginner",
    value: "beginner",
  },
  {
    label: "Intermediate",
    value: "intermediate",
  },
  {
    label: "Expert",
    value: "expert",
  },
];
export const EXPERTISE_LEVEL_OPTIONS = [
  { label: "Starter", value: "starter" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Expert", value: "expert" },
];
const JOB_TYPES_OPTIONS = [
  { label: "OnSite", value: "onsite" },
  { label: "Remote", value: "remote" },
  { label: "Hybrid", value: "hybrid" },
];
const EXPERIENCE_OPTIONS = [
  { label: "1 Year", value: "1" },
  { label: "2 Years", value: "2" },
  { label: "3 Years", value: "3" },
  { label: "4 Years", value: "4" },
  { label: "5 Years", value: "5" },
  { label: "5+ Years", value: "5+" },
];
const WORK_EXPERIENCE_OPTIONS = [
  { label: "0 to 1 year", value: "0 to 1 year" },
  { label: "1 to 2 years", value: "1 to 2 years" },
  { label: "2 to 3 years", value: "2 to 3 years" },
  { label: "5+ years", value: "5+ years" },
  { label: "10+ years", value: "10+ years" },
];

const PROJECT_OPTIONS = [
  { label: "E-commerce Platforms", value: "eCommercePlatforms" },
  { label: "Dating Websites/Apps", value: "datingWebsitesApps" },
  { label: "Restaurant Management Software", value: "restaurantManagementSoftware" },
  { label: "Healthcare Management Systems", value: "healthcareManagementSystems" },
  { label: "Education Technology (EdTech)", value: "educationTechnologyEdTech" },
  { label: "Financial Technology (FinTech)", value: "financialTechnologyFinTech" },
  { label: "Customer Relationship Management (CRM)", value: "customerRelationshipManagementCRM" },
  { label: "Supply Chain Management Systems", value: "supplyChainManagementSystems" },
  { label: "Human Resource Management (HRM) Software", value: "humanResourceManagementHRMSoftware" },
  { label: "Property Management Software", value: "propertyManagementSoftware" },
  { label: "Travel and Tourism Platforms", value: "travelAndTourismPlatforms" },
  { label: "Social Networking Sites", value: "socialNetworkingSites" },
  { label: "Event Management Software", value: "eventManagementSoftware" },
  { label: "Transportation Management Systems", value: "transportationManagementSystems" },
  { label: "Media and Entertainment Platforms", value: "mediaAndEntertainmentPlatforms" },
  { label: "Gaming Industry", value: "gamingIndustry" },
  { label: "Real Estate Technology (PropTech)", value: "realEstateTechnologyPropTech" },
  { label: "Insurance Technology (InsurTech)", value: "insuranceTechnologyInsurTech" },
  { label: "Legal Technology (LegalTech)", value: "legalTechnologyLegalTech" }
];


const DEVELOPER_STEPPER_DATA = {
  1: {
    fields: [
      {
        fieldName: "first_name",
        inputType: "text",
        label: "firstName",
        isRequired: true,
        isAutocomplete: false,
        rules: { required: "First Name is required" },
      },
      {
        fieldName: "last_name",
        inputType: "text",
        label: "lastName",
        isRequired: true,
        isAutocomplete: false,
        rules: { required: "Last Name  is required" },
      },
      {
        fieldName: "email",
        type: "text",
        label: "email",
        isRequired: true,
        rules: {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email format",
          },
        },
      },
      {
        fieldName: "ready_to_relocate",
        type: "normal-select",
        label: "ready_to_relocate",
        rules: { required: "This field is required" },
        isRequired: true,
        isAutocomplete: false,
        isPhoneField: true,
        options: RELOCATE_OPTIONS,
        defaultOption: "Select",
      },
      {
        fieldName: "password",
        isPassword: true,
      },
      // for password and confirmPassword
      // {
      //   fieldName: "ready_to_relocate",
      //   type: "select",
      //   label: "ready_to_relocate",
      //   rules:{required:"This field is required"},
      //   isRequired: true,
      // },
      // {
      //   fieldName: "ready_to_relocate",
      //   type: "select",
      //   label: "ready_to_relocate",
      //   rules:{required:"This field is required"},
      //   isRequired: true,
      // }
      {
        fieldName: "phone_number",
        type: "phone",
        label: "phone",
        rules: {
          required: "Phone Number is required",
          pattern: {
            value: /^\+?[0-9]{10,14}$/,
            message: "Please enter a valid phone number",
          },
        },
        isRequired: true,
        isAutocomplete: false,
      },
      {
        fieldName: "address",
        type: "select",
        label: "address",
        rules: {
          required: " Address is required",
        },
        isRequired: true,
        isAutocomplete: true,
      },
      {
        fieldName: "location",
        isLocation: true,
      },
      {
        fieldName: "passcode",
        type: "onlyNumber",
        label: "zipcode",
        rules: {
          required: "Zip Code  is required",
        },
        isRequired: true,
        isAutocomplete: false,
      },
    ],
    headingData: {
      h1: "Add your Contact Details",
      para: `Explore thrilling remote opportunities with Europe's top companies, become part of a dynamic community, and enjoy exclusive perks`,
    },
  },
  2: {
    fields: [
      {
        // Inside API there is no field for professionalTitle 
        fieldName: "professional_title",
        type: "text",
        label: "professionalTitle",
        rules: {
          required: "Professional title  is required",
        },
        isRequired: true,
      },
      {
        fieldName: "total_experience",
        type: "normal-select",
        label: "workExperience",
        rules: {
          required: "Working experience is required",
        },
        isRequired: true,
        options: WORK_EXPERIENCE_OPTIONS,
        defaultOption: "Select years",
      },
      {
        fieldName: "work_preference",
        type: "normal-select",
        label: "jobType",
        rules: {
          required: "Job type is required",
        },
        isRequired: true,
        options: JOB_TYPES_OPTIONS,
        defaultOption: "Select type",
      },
      {
        fieldName: "language",
        type: "select2",
        label: "selectLanguage",
        rules: {
          required: "Language is required",
        },
        isRequired: true,
        // options:
      },
      {
        fieldName: "expertise_level",
        type: "normal-select",
        label: "languageLevel",
        rules: {
          required: "Language level is required",
        },
        isRequired: true,
        options: EXPERTISE_LEVEL_OPTIONS,
        defaultOption: "Select level",
      },
      {
        fieldName: "skill",
        type: "select2",
        label: "selectSkill",
        rules: {
          required: "Skill is required",
        },
        isRequired: true,
      },
      {
        fieldName: "experience",
        type: "normal-select",
        label: "skillExperience",
        rules: {
          required: "Skill experience is required",
        },
        isRequired: true,
        options: EXPERIENCE_OPTIONS,
        defaultOption: "Select skills experience",
      },
    ],
    headingData: {
      h1: "Expertise at its best!",
      para: `We pair exceptional professionals with the worlds top companies`,
    },
  },
  3: {
    data: [],
    name: "project_length",
    optionKey: "project_length",
    inputType: "radio",
    headingData: {
      h1: " Past Successes",
      para: ``,
    },
  },
  4: {
    data: [],
    name: "when_should_the_development_start",
    optionKey: "development_start",
    inputType: "radio",
    headingData: {
      h1: "When should your New Team Member Start ?",
      para: ``,
    },
  },
  5: {
    data: [],
    name: "availability",
    optionKey: "availability",
    inputType: "radio",
    headingData: {
      h1: "What Availablity you need ?",
      para: ``,
    },
  },
  6: {
    data: [],
    name: "skills",
    optionKey: "skill",
    inputType: "multi-select",
    headingData: {
      h1: "What Skillset you need ?",
      para: ``,
    },
    label: "Select Your Skills",
  },
  7: {
    data: [],
    name: "meeting_date",
    inputType: "date",
    headingData: {
      h1: "Book a Meeting with your Personal Match",
      para: ``,
    },
  },
  8: {
    data: [],
    name: null,
    inputType: null,
    headingData: {
      h1: "Thank you for applying",
      para: `A Rexett Family Team Member Will Reach Out to You Shortly for the Next Steps!`,
    },
  },
};
const DEVELOPER_STEP_URLS = {
  1: "/web/apply-as-developer",
  2: "/web/create-developer-profile",
  6:'/web/update-developer-profile'
};
export const getActiveStepPostURL = (activeStep) =>
  DEVELOPER_STEP_URLS[activeStep] || null;

export const getCurrentStepInfo = (count) =>
  DEVELOPER_STEPPER_DATA[count] || null;

export const createOptionsForReactSelect = (
  optionsToExtractFrom,
  valueField,
  labelField
) => {
  let newArr = [];
  if (optionsToExtractFrom?.length) {
    newArr = optionsToExtractFrom.map((curElem) => {
      return { label: curElem[labelField], value: curElem[valueField] };
    });
  }
  return newArr;
};

export const STEP_3_FIELDS = [
  {
    fieldName: "job_title",
    label: "professionalTitle",
    inputType: "text",
    isRequired: true,
    rules: { required: "Professional title is required" },
  },
  {
    fieldName: "company_name",
    label: "companyName",
    inputType: "text",
    isRequired: true,
    rules: { required: "Company name is required" },
  },
  {isDateSection:true},
  // {
  //   fieldName: "start_date",
  //   label: "from",
  //   inputType: "date",
  //   isRequired: true,
  //   isMaxRequired: true,
  //   rules: {
  //     required: "Start date is required",
  //     // validate: {
  //     //   dateRange: (value, endDate) => {
  //     //     if (!endDate || value <= endDate) {
  //     //       return true;
  //     //     }
  //     //     return "Start Date must be before End Date";
  //     //   },
  //     // },
  //   },
  // },
  // {
  //   fieldName: "end_date",
  //   label: "to",
  //   inputType: "date",
  //   isMaxRequired: true,
  //   isRequired: true,
  //   rules: { required: "End date is required" },
  // },
  {
    fieldName: "description",
    label: "description",
    inputType: "textarea",
    isRequired: true,
    rows: 3,
    rules: { required: "Description is required" },
  },
];
// validate: {
//   dateRange: (value) => {
//     const endDate = watch(
//       `projects.${index}.project_end_date`
//     ); // Get the value of the end date field
//     if (!endDate || value <= endDate) {
//       return true;
//     }
//     return "Start Date must be before End Date";
//   },
// },

export const STEP_4_FIELDS = [
  {
    fieldName: "degree_id",
    label: "degreeAndDiploma",
    inputType: "select2",
    isRequired: true,
    rules: { required: "Degree is required" },
  },
  {
    fieldName: "university_name",
    label: "collegeAndUniversity",
    inputType: "text",
    isRequired: true,
    rules: { required: "College/University name is required" },
  },
  {isDateSection:true},
  // {
  //   fieldName: "start_year",
  //   label: "from",
  //   inputType: "date",
  //   isRequired: true,
  //   isMaxRequired: true,
  //   rules: {
  //     required: "Start year is required",
  //     // validate: {
  //     //   dateRange: (value, endDate) => {
  //     //     if (!endDate || value <= endDate) {
  //     //       return true;
  //     //     }
  //     //     return "Start Date must be before End Date";
  //     //   },
  //     // },
  //   },
  // },
  // {
  //   fieldName: "end_year",
  //   label: "to",
  //   inputType: "date",
  //   isMaxRequired: true,
  //   isRequired: true,
  //   rules: { required: "End year is required" },
  // },
  {
    fieldName: "description",
    label: "description",
    inputType: "textarea",
    isRequired: true,
    rows: 3,
    rules: { required: "Description is required" },
  },
];
export const STEP_5_FIELDS = [
  {
    fieldName: "project_title",
    label: "title",
    inputType: "text",
    isRequired: true,
    rules: { required: "Title is required" },
  },
  // {
  //   fieldName: "university_name",
  //   label: "skillsTitle",
  //   inputType: "text",
  //   isRequired: true,
  //   rules: { required: "College/University name is required" },
  // },
  {
    fieldName: "role_in_project",
    label: "role",
    inputType: "text",
    isRequired: true,
    rules: {
      required: "Role is required",
      // validate: {
      //   dateRange: (value, endDate) => {
      //     if (!endDate || value <= endDate) {
      //       return true;
      //     }
      //     return "Start Date must be before End Date";
      //   },
      // },
    },
  },
  {
    fieldName: "project_type",
    label: "projectType",
    inputType: "select2",
    isRequired: true,
    // rules: { required: "Project type is required" },
  },
  {
    fieldName: "project_link",
    label: "projectUrl",
    inputType: "text",
    isRequired: true,
    rules: { required: "Project URL is required" },
  },
  {
    isDateSection : true
  },
  // {
  //   fieldName: "project_start_date",
  //   label: "from",
  //   inputType: "date",
  //   isRequired: true,
  //   isMaxRequired: true,
  //   rules: {
  //     required: "Start date is required",
  //     // validate: {
  //     //   dateRange: (value, endDate) => {
  //     //     if (!endDate || value <= endDate) {
  //     //       return true;
  //     //     }
  //     //     return "Start Date must be before End Date";
  //     //   },
  //     // },
  //   },
  // },
  // {
  //   fieldName: "project_end_date",
  //   label: "to",
  //   inputType: "date",
  //   isMaxRequired: true,
  //   isRequired: true,
  //   rules: { required: "End date is required" },
  // },
  {
    fieldName: "project_description",
    label: "description",
    inputType: "textarea",
    isRequired: true,
    rows: 3,
    rules: { required: "Description is required" },
  },
];

export const createToastMessage = (action, field) => {
  switch (action) {
    case "post":
      return `${field} added successfully`;
    case "update":
      return `${field} updated successfully`;
    case "delete":
      return `${field} deleted successfully`;
  }
};
export const getYearFromDate = (date) => {
  return moment(date).year();
};
export const convertDateIntoRequiredFormat = (date,format="YYYY-MM-DD") => {
  return moment(date).format(format);
};

const DEVELOPER_STEP_KEYS = {
  1: [
    "name",
    // "first_name",
    // "last_name",
    "email",
    "ready_to_relocate",
    "phone_number",
    "address",
    "country_code",
    "state_iso_code",
    "city",
    "passcode"
  ],
  2: [
    "professional_title",
    // "role",
    "total_experience",
    "work_preference",
    "language",
    "expertise_level",
    "skill",
    "experience",
  ],
  6:[
    "bio",
    "how_did_you_hear_about_rexett",
    "profile_picture",
    "resume",
    "social_links"
  ]
};
export const getDeveloperActiveStepKeys = (activeStep) =>
  DEVELOPER_STEP_KEYS[activeStep] || [];
export const STEP_SIX_SELECT_OPTIONS = [
  { value: "newspaper", label: "NewsPaper" },
  { value: "advertisements", label: "Advertisements" },
];
export const ALLOWED_EXTENSIONS = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
export const IMAGE_ALLOWED_EXTENSIONS = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/svg+xml",
];


export const experienceLevels = [];
for (let i = 1; i <= 15; i++) {
  experienceLevels.push({
    label: `${i} year${i > 1 ? 's' : ''}`,
    value: i,
  });
}
