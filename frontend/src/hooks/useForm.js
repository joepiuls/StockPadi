import { useState } from "react";

export const useForm = (initialValues={}, validationSchema=null)=>{
    const [values, setValues] = useState({initialValues});
    const [errors, setErrors] = useState({});


    const handleChange = (e)=>{
        const {name, value} = e.target;
        setValues({...values, [name]:value})
    }

    const validate = async () => {
        if(!validationSchema) return true;
        try {
           await validationSchema.validate(values, {abortEarly:false});
            setErrors({})
            return true
        } catch (err) {
            const formattedErrors = {};
            err.inner.forEach((e)=>{
                formattedErrors[e.path] = e.message;
            });
            setErrors(formattedErrors);
            return false
        }
    }

    const resetForm = ()=>{
        setValues(initialValues);
        setErrors({});
    }

    const setErrorField = (field, message)=>{
        setErrors((prev)=>({...prev, [field]:message}))
    }

    return{
        values,
        errors,
        validate,
        resetForm,
        setErrorField,
        handleChange
    }
}