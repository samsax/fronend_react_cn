import React from "react";
import { useQuery, useMutation } from "react-apollo-hooks";
import gql from "graphql-tag";
import Input from "../components/Input";
import isAuthenticated from "../utils/isAuthenticated";
import useForm from "../hooks/useForm";

const ME = gql`
  query ME {
    me {
      name
      email
      phone
    }
  }
`;

const UPDATEUSER  = gql`
  mutation UpdateUser($data:updateOneUser!){
      updateUser(data:$data){
          name,
          email,
          phone
      }
  }

`

function Profile() {
  const [ modifyUser ] = useMutation(UPDATEUSER); 

  const sendUpdate = async inputs => {
    delete inputs.__typename
    const { data, errors } = await modifyUser({variables:{data:{...inputs}}});
    if(data) alert('Usuario Modificado con Exito')
    if(errors) alert("Errores: ", errors.message);
  };

  const { data, loading, error } = useQuery(ME);

  const getData =  !loading ? data.me : {}

  const { inputs, handleInputChange, handleSubmit } = useForm(
    sendUpdate,
    getData
  );

  return loading ? (
    <h4 className="mt-5">Cargando...</h4>
  ) : (
    <div className="container mt-5">
      <form action="" onSubmit={handleSubmit}>
        <div className="row justify-content-center text-center">
          <div className="col-10">
            <h3>Mi Perfil</h3>
          </div>
          <div className="col-10">
            <Input
              label="Nombre:"
              type="text"
              name="name"
              value={inputs.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-10">
            <Input
              label="Email:"
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-10">
            <Input
              label="Telefono:"
              type="text"
              name="phone"
              value={inputs.phone}
              onChange={handleInputChange}
            />
          </div>

            <div className="col-10">
                <button type="submit" className="btn btn-lg bg-dark text-light">Guardar</button>
            </div>
        </div>
      </form>
    </div>
  );
}

export default isAuthenticated(Profile);
