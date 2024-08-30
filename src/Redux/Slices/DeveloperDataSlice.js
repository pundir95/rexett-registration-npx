import { createSlice } from "@reduxjs/toolkit";
import authInstance from "../../services/auth.instance";
import { toast } from "react-toastify";

const initialDeveloperData = {
  skillOptions: [],
  btnLoader: false,
  screenLoader: false,
  smallLoader: false,
  developerRegistrationData:{},



}


export const developerDataSlice = createSlice({
  name: "authData",
  initialState: initialDeveloperData,
  reducers: {
    setSkillOptions: (state, action) => {
      state.skillOptions = action.payload;
      state.screenLoader = false;
    },

    setFailDeveloperData: (state, action) => {
      state.smallLoader = false;
      state.btnLoader = false;
      state.screenLoader = false;
    },
    setDeveloperRegistrationDetails: (state, action) => {
      state.developerRegistrationData = action.payload;
      state.screenLoader = false;
    },
    setSuccessActionData: (state, action) => {
      state.smallLoader = false;
    },
    setActionSuccessFully: (state, action) => {
      state.smallLoader = false;
      state.approvedLoader = false;
      state.screenLoader = false;
    },
    setSmallLoader: (state, action) => {
      state.smallLoader = true;
    },
    setSuccessDeveloperData: (state, action) => {
      state.developerCvData = action.payload;
      state.smallLoader = false;
      state.screenLoader = false;
    },

  }
})


export const { setSkillOptions, setSuccessDeveloperData,setFailDeveloperData,setDeveloperRegistrationDetails,setSuccessActionData,setActionSuccessFully,setSmallLoader} = developerDataSlice.actions

export default developerDataSlice.reducer;

export function getSkillOptions() {
  return async (dispatch) => {
    //   dispatch(setScreenLoader());
    try {
      let result = await authInstance.get(`web/skills`);
      dispatch(setSkillOptions(result?.data?.data));
      // return callback();
    } catch (error) {
      console.log(error, "error");
      dispatch(setFailDeveloperData());
    }
  };
}
export function getDeveloperProfileDetails(id,callback) {
  return async (dispatch) => {
    // dispatch(setSmallLoader());
    try {
      let result = await authInstance.get(`common/developer-profile?developer_id=${id}`);
      dispatch(setDeveloperRegistrationDetails(result?.data?.data))
      return callback(result.data.data)
      dispatch(setSuccessActionData());
    } catch (error) {
      const message = error.message || "Something went wrong";
      // toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}
export function addDeveloperRegisProject(payload, callback) {
  return async (dispatch) => {
    // dispatch(setScreenLoader());
    try {
      let result = await authInstance.post("common/add-developer-project", payload);
      // toast.success("Project is Added", { position: "top-center" });
      dispatch(setActionSuccessFully());
      return callback()
    } catch (error) {
      const message = error.message || "Something went wrong";
      // toast.error(error?.response?.data?.message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}
export function developerRegistration(payload, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await authInstance.post("common/developer-registration", { ...payload });
      if (result.status === 201) {
      toast.success(result?.data?.message, { position: "top-center" });
      localStorage.setItem("developerId", result?.data?.data?.id)
      dispatch(setActionSuccessFully());
      return callback()
    }
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(error?.response?.data?.message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}
export function developerRegistrationBio(payload) {
  return async (dispatch) => {
    // dispatch(setScreenLoader());
    try {
      let result = await authInstance.post("common/add-developer-bio", { ...payload });
      // toast.success("Bio is creatd", { position: "top-center" });
      dispatch(setActionSuccessFully());
    } catch (error) {
      const message = error.message || "Something went wrong";
      // toast.error(error?.response?.data?.message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}
export function fileUploadForWeb(fileData, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await authInstance.post(`web/upload-file`, fileData);
      dispatch(setActionSuccessFully());
      return callback(result?.data?.data.Location);
    } catch (error) {
      toast.error(error?.response?.data?.message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}
export function registerDeveloperEducation(payload, id, callback) {
  return async (dispatch) => {
    // dispatch(setSmallLoader());
    try {
      let result = await authInstance.post(`common/add-developer-education?developer_id=${id}`, payload);
      // toast.success("Education is Added", { position: "top-center" });
      dispatch(setSuccessActionData());
      return callback()
    } catch (error) {
      const message = error.message || "Something went wrong";
      // toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}
export function registerDeveloperExperience(payload, id, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await authInstance.post(`common/add-developer-experience?developer_id=${id}`, payload);
      // toast.success("Experience is Added", { position: "top-center" });
      dispatch(setSuccessActionData());
      return callback()
    } catch (error) {
      const message = error.message || "Something went wrong";
      // toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}
export function registerDeveloperSkills(payload, id) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await authInstance.post(`common/add-developer-skills`, payload);
      // toast.success("skills is Added", { position: "top-center" });
      dispatch(setSuccessActionData());
    } catch (error) {
      const message = error.message || "Something went wrong";
      // toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}
export function fetchDeveloperCv(payload, callback) {
  return async (dispatch) => {
    // dispatch(setScreenLoader());
    try {
      let result = await authInstance.get("developer/cv");
      if (result.status === 200) {
        dispatch(setSuccessDeveloperData(result.data.data));
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      // toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}
export function updateDeveloperCvBio(payload, role, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await authInstance.post("common/update-bio", {
        ...payload,
      });
      // if (result.status === 200) {
      //   if (role === "developer") {
      //     toast.success("Please wait for changes approval by admin", {
      //       position: "top-center",
      //     });
      //   } else {
      //     toast.success("Bio is Updated", { position: "top-center" });
      //   }
      //   dispatch(setSuccessActionData());
      //   return callback();
      // }
    } catch (error) {
      const message = error.message || "Something went wrong";
      // toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}
export function deleteEducationCv(id, payload, callback) {
  return async (dispatch) => {
    //  dispatch(setSmallLoader())
    try {
      let result = await authInstance.delete(
        `common/delete-education/${id}?developerId=${payload}`
      );
      if (result.status === 200) {
        // toast.success("Education is Deleted", { position: "top-center" });
        dispatch(setSuccessActionData());
        return callback();
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      // toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}
export function updateDeveloperCvEducation(payload, role, callback) {
  return async (dispatch) => {
    // dispatch(setSmallLoader());
    try {
      let result = await authInstance.post(`common/update-educations`, {
        ...payload,
      });
      if (result.status === 200) {
        // if (role === "developer") {
        //   toast.success("Please wait for changes approval by admin", {
        //     position: "top-center",
        //   });
        // } else {
        //   toast.success("Education is Updated", { position: "top-center" });
        // }
        dispatch(setSuccessActionData());
        return callback();
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      // toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}
export function addDegree(payload, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await authInstance.post(`common/add-degree`, {
        ...payload,
      });
      dispatch(setSuccessActionData());
      return callback();
    } catch (error) {
      dispatch(setFailDeveloperData());
    }
  };
}
export function updateDeveloperCvExperience(payload, role, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await authInstance.post(`common/update-experiences`, {
        ...payload,
      });
      if (result.status === 200) {
        // if (role === "developer") {
        //   toast.success("Please wait for changes approval by admin", {
        //     position: "top-center",
        //   });
        // } else {
        //   toast.success("Experience is Updated", { position: "top-center" });
        // }
        dispatch(setSuccessActionData());
        return callback();
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      // toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
      return;
    }
  };
}
export function deleteExperience(id, devId, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await authInstance.delete(
        `common/delete-experience/${id}?developerId=${devId}`
      );
      if (result.status === 200) {
        // toast.success("Experience is deleted", { position: "top-center" });
        dispatch(setSuccessActionData());
        return callback();
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      // toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}
export function addProjects(paylaod, role, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await authInstance.post(`/common/add-developer-project`, {
        ...paylaod,
      });
      // if (role === "developer") {
      //   toast.success("Please wait for changes approval by admin", {
      //     position: "top-center",
      //   });
      // } else {
      //   toast.success("Project is Added", { position: "top-center" });
      // }

      dispatch(setSuccessActionData());
      return callback();
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      // toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}
export function updateProjects(
  projectId,
  payload,
  role,
  callback,
  isLast = true
) {
  return async (dispatch) => {
    // dispatch(setSmallLoader());
    try {
      let result = await authInstance.post(
        `/common/update-developer-project?projectId=${projectId}`,
        payload
      );
      if (isLast) {
        // if (role === "developer") {
        //   toast.success("Please wait for changes approval by admin", {
        //     position: "top-center",
        //   });
        // } else {
        //   toast.success("Projects are Updated", { position: "top-center" });
        // }
      }
      dispatch(setSuccessActionData());
      return callback();
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      // toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
      return;
    }
  };
}

export function deleteProjects(projectId, callback) {
  return async (dispatch) => {
    // dispatch(setSmallLoader());
    try {
      let result = await authInstance.delete(
        `/common/delete-developer-project/${projectId}`
      );
      // toast.success("Project deleted successfully", { position: "top-center" });
      dispatch(setSuccessActionData());
      return callback();
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      // toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}
export function updateDeveloperSkills(
  payload,
  role,
  callback,
  method = "post"
) {
  return async (dispatch) => {
    // dispatch(setSmallLoader());
    try {
      let result;
      //  if(method === "post")
      //     {
      //          result = await clientInstance.post(`common/edit-developer-skills`, {... payload })
      // }
      // else{
      //     result = await clientInstance.put(`common/edit-developer-skills`, {... payload })
      // }
      result = await authInstance.post(`common/update-developer-skills`, {
        ...payload,
      });
      if (result.status === 200) {
        // if (role === "developer") {
        //   toast.success("Please wait for changes approval by admin", {
        //     position: "top-center",
        //   });
        // } else {
        //   toast.success("Skills are Updated", { position: "top-center" });
        // }
        dispatch(setSuccessActionData());
        return callback();
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      // toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}
export function addDeveloperSocialMedia(payload, callback) {
  return async (dispatch) => {
    // dispatch(setBtnLoader());
    try {
      let result = await authInstance.post(`common/add-social-links`, {
        ...payload,
      });
      if (result.status === 200) {
        // toast.success("Media is updated successfully", {
        //   position: "top-center",
        // });
        dispatch(setSuccessActionData());
        return callback();
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      // toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}
export function deleteSkill(payload, id, callback) {
  return async (dispatch) => {
    // dispatch(setSmallLoader());
    try {
      let result = await authInstance.delete(
        `common/delete-developer-skill/${id}?user_id=${payload}`
      );
      if (result.status === 200) {
        // toast.success(" Expertise is deleted", { position: "top-center" });
        dispatch(setSuccessActionData());
        return callback();
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      // toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}



