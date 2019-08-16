import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Input from '../components/Input'
import useForm from '../hooks/useForm'
import MapEditor from '../components/MapEditor'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'

const ADDZONE = gql`
    mutation CREATEZONE($data:createZone){
        createOneZone(data:$data){
            _id,
            zone
        }
    }
`;

const AddZone = ({history}) => {
    const createZone = useMutation(ADDZONE)
    const [zone,setZone] = useState(null);
    const sendZone = async(data)  => {
        const currentData = {price:parseFloat(data.price), zone:data.zone, location:zone}
        console.log(currentData);
        if(!zone){
            alert("Es necesario agregar una zona");
        }else{
            const response = await createZone({variable:{
                data:currentData
            }}).catch(e=>alert(e.message))
            if(response.data.createOneZone._id) history.push('/')
        }
    }

    const {inputs, handleInputChange, handleSubmit} = useForm();
    return (
        <>
        <Navbar/>
            <section className="container mt-5 pt-5">
                <form action="" onSubmit={handleSubmit}></form>
                    <div className="row">
                        <div className="form-group col-10">
                            <Input
                                label="Nombre de la zona"
                                type="text"
                                name="zone"
                                onChange={handleInputChange}
                                value={inputs.value}
                            />
                        </div>
                        <div className="form-group col-10">
                            <Input
                                label="Precio"
                                type="number"
                                name="price"
                                onChange={handleInputChange}
                                value={inputs.value}
                            />
                        </div>
                        <div className="col-10">
                            <MapEditor setZone={sendZone}/>
                        </div>
                        <div className="col-10 mt-10">
                            <button type="submit" className="btn btn-lg bg-dark text-light">Guardar</button>
                        </div>
                    </div>
            </section>
        </>
    )
}

export default AddZone
