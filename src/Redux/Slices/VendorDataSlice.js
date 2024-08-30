import { createSlice } from "@reduxjs/toolkit"
import authInstance from "../../services/auth.instance";
// import { setSmallLoader } from "./DeveloperDataSlice";
import { toast } from "react-toastify";


const initialVendorData={
    screenLoader: false,
    smallLoader: false,

}

export const vendorDataSlice = createSlice({
    name: "vendorData",
    initialState: initialVendorData,
    reducers: {
      setScreenLoader: (state, action) => {
        state.screenLoader = true;
      },
      setSmallLoader: (state, action) => {
        state.smallLoader = true;
      },
        setFailVendorData: (state, action) => {
            state.screenLoader = false
            state.smallLoader = false;
        },
        setVendorSuccess: (state, action) => {
          state.smallLoader=false
          state.screenLoader = false;
      },
     
    }
})

export const {setFailVendorData,setVendorSuccess,setSmallLoader,setScreenLoader}=  vendorDataSlice.actions

export default vendorDataSlice.reducer

export function applyAsVendor(payload,callback) {
    return async (dispatch) => {
      dispatch(setSmallLoader())
      try {
        let result = await authInstance.post("common/vendor-registration",{...payload})
        console.log("afterResult")
        localStorage.setItem("vendorId",result?.data?.data?.vendor.id);
        toast.success(result.data.message, { position: "top-center" });
        // dispatch(setVendorSuccess())
        return callback();
      } catch (error) {
        toast.error(error?.response?.data?.message, { position: "top-center" });
        dispatch(setFailVendorData());
      }
    };
}
export function getEditDecision(payload,callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await authInstance.post(`common/vendor-decision-makers-details`,{...payload});
      localStorage.setItem("vendorId",result?.data?.data?.vendor?.id);
      dispatch(setVendorSuccess())
      callback()
    } catch (error) {
      // const message = error?.message;
      // if (error?.message === VERIFY_USER_MESSAGE) {
        // if (error.response?.data?.verify_user) {
        // triggerVerificationModal("verify"); 
      // } else {
        // toast.error(error?.response?.data?.message, { position: "top-center" });
      // }
      dispatch(setFailVendorData());
    }
  };
}
export function getAreaExpertise(payload) {
  return async (dispatch) => {
  dispatch(setSmallLoader())
    try {
      let result = await authInstance.post(`common/vendor-area-expertise`,{...payload});
      localStorage.setItem("vendorId",result?.data?.data?.vendor?.id);
      dispatch(setVendorSuccess())
      // callback()
    } catch (error) {
      const message = error?.message;
      // if (error?.message === VERIFY_USER_MESSAGE) {
        if (error.response?.data?.verify_user) {
        // triggerVerificationModal("verify"); 
      } else {
        // toast.error(error?.response?.data?.message, { position: "top-center" });
      }
      dispatch(setFailVendorData());
    }
  };
}
export function getVendorUpdatedDetails(id,callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await authInstance.get(`common/vendor-registration-details/${id}`);
      dispatch(setVendorSuccess())
      callback(result?.data?.data)
      // localStorage.setItem("vendorId",result?.data?.data?.id);
    } catch (error) {
      const message = error?.message;
      // if (error?.message === VERIFY_USER_MESSAGE) {
        if (error.response?.data?.verify_user) {
        // triggerVerificationModal("verify"); 
      } else {
        // toast.error(error?.response?.data?.message, { position: "top-center" });
      }
      dispatch(setFailVendorData());
    }
  };
}
export const uploadFileToS3Bucket = (payload, callback) => {
  return async (dispatch) => {
    try {
      let result = await authInstance.post(`web/upload-file/`, payload);
      callback && callback(result?.data?.data?.Location);
      // dispatch(setVendorSuccess())
    } catch (error) {
      toast.error(error?.response?.data?.message, { position: "top-center" });
      // dispatch(setFailVendorData());
    }
  };
};

