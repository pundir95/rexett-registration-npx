import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDeveloperProfileDetails } from "../../Redux/Slices/DeveloperDataSlice";
import SingleDeveloper from "../../common/SingleDeveloper/SingleDeveloper";


const DeveloperCvModal = () => {
    const dispatch = useDispatch()
    const {developerDetails} = useSelector(state => state.clientData)
    let developerId=localStorage.getItem("developerId")

    useEffect(()=>{
        if(developerId){
            dispatch(getDeveloperProfileDetails(developerId));
        }
      
    },[developerId])

    return(<>
    <SingleDeveloper  data={developerDetails} role={"a"}/>
    </>
    )
}
export default DeveloperCvModal;
