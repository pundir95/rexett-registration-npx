import moment from "moment";

export const convertCountriesForSelect = (options,type) => {
    console.log(options,"options inside countries select");
    let formattedCountryOptions=[]
    if(type === "timezones") {
         formattedCountryOptions = options?.map((timezone) => {
            return {label:timezone , value:timezone}
        });
    } else {
         formattedCountryOptions = options?.map(({name,code,isoCode}) => {
            return {label:name , value:type === "country" ? code : isoCode}
        });
    }
    return formattedCountryOptions
}

export const validatePassword = (value) => {
    if (value === "") {
      return true; // Password is not required, so return true if empty
    } else {
      // Check if password matches the pattern
      const pattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (!pattern.test(value)) {
        return `Password must contain at least a symbol, upper and lower case letters and a number`;
      }
    }
    return true; // Password meets the criteria
  };

  export const getDateInRequiredFormat = (date,format) => {
    if(date){
      return moment(date).format(format)
    } else {
      return ""
    }
  }