import { useState, useEffect } from 'react';

function useForm (callback, data = {} ) {

    const [inputs, setInputs] = useState(data);

    /* useEffect(() => {
        setInputs({...data})
    },[data]) */

    const handleSubmit = (event) => {
        //Va a cachar el evento de submit del formulario
        if(event) event.preventDefault();
        callback(inputs);
    }

    const handleInputChange = (event) => {
        //Detectar os cambios en el Field
        
        event.persist();
        const { name, value } = event.target
        console.log(name,value)
        setInputs(fields => ({ ...fields, [name]:value }))
    } 

    return {
        inputs,
        handleSubmit,
        handleInputChange
    }

}

export default useForm;