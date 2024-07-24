import { configureStore } from '@reduxjs/toolkit'
import ClientDataSlice from './ClientDataSlice'
import AdminDataSlice from './AdminDataSlice'
// import AuthenticationDataSlice from './AuthenticationDataSlice'
import VendorDataSlice from './VendorDataSlice'
import DeveloperDataSlice from './DeveloperDataSlice'


const combinedReducer = {
    // authData: AuthenticationDataSlice,
    clientData:ClientDataSlice,
    developerData:DeveloperDataSlice,
    adminData:AdminDataSlice,
    vendorData:VendorDataSlice,
  }
  
  export default configureStore({
    reducer: combinedReducer
  })