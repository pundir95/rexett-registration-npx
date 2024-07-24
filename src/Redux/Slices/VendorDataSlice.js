import { createSlice } from "@reduxjs/toolkit"
import authInstance from "../../services/auth.instance";

const initialVendorData={
    screenLoader: false,
    smallLoader: false,

}

export const vendorDataSlice = createSlice({
    name: "vendorData",
    initialState: initialVendorData,
    reducers: {
        setFailVendorData: (state, action) => {
            state.screenLoader = false
            state.smallLoader = false;
        },
    }
})

export const {setFailVendorData}=  vendorDataSlice.actions

export default vendorDataSlice.reducer

export function applyAsVendor(payload,callback) {
    console.log(payload,'payload')
    return async (dispatch) => {
      // dispatch(setScreenLoader());
      try {
        let result = await authInstance.post("common/vendor-registration",{...payload})
        console.log(result?.data?.data?.vendor?.id,"result")
        localStorage.setItem("vendorId",result?.data?.data?.vendor.id);
        return callback(result?.data?.data.Location);
      } catch (error) {
        // dispatch(setFailVendorData());
        console.log(error,"error")
      }
    };
}
export function getEditDecision(payload,callback) {
  console.log(payload,'payload')
  return async (dispatch) => {
  //   dispatch(setScreenLoader());
    try {
      let result = await authInstance.post(`common/vendor-decision-makers-details`,{...payload});
      localStorage.setItem("vendorId",result?.data?.data?.vendor?.id);
      callback()
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
export function getAreaExpertise(payload) {
  console.log(payload,'payload')
  return async (dispatch) => {
  //   dispatch(setScreenLoader());
    try {
      let result = await authInstance.post(`common/vendor-area-expertise`,{...payload});
      localStorage.setItem("vendorId",result?.data?.data?.vendor?.id);
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
  //   dispatch(setScreenLoader());
    try {
      let result = await authInstance.get(`common/vendor-registration-details/${id}`);
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

