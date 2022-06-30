import { useState } from 'react';
import {FaTrash} from 'react-icons/fa';
import {FaEdit} from 'react-icons/fa';
import {FaSave} from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/mutations';
import { EDIT_CLIENT } from '../mutations/mutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import {GET_PROJECTS} from '../queries/projectQueries';

import {useNavigate} from 'react-router-dom'

const ClientRow = ({id, name, email, phone}) => {

  const [isEditable, setIsEditable] = useState({statue:false, keyRow: null});

  const [client, setClient] = useState({clientId: id, clientName: name, clientEmail: email, clientPhone: phone});
  const {clientId, clientName, clientEmail, clientPhone} = client;

  const navigate = useNavigate();

  const [deleteClient] = useMutation(DELETE_CLIENT,{
    variables:{id},
    refetchQueries:[{query: GET_CLIENTS},{query : GET_PROJECTS}]
    // update(cache, {data:{deleteClient}}){
    //   const {clients} = cache.readQuery({query: GET_CLIENTS});
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data : {clients: clients.filter(client => client.id !== deleteClient.id)}
    //   })
    // }
  });

  const [editClient] = useMutation(EDIT_CLIENT, {
    variables: { id: clientId, name: clientName, email: clientEmail, phone: clientPhone },
    refetchQueries: [{query: GET_CLIENTS}]
    },
  );

  const onEdit = (cId) => {

    setIsEditable({
      statue: true,
      keyRow: cId,
    })

    // setClient(cName, cEmail, cPhone);
  }

  // const onCancel = () =>{
  //   setIsEditable({statue: false, keyRow: null});
  //   setClient({name: '', email: '', phone: ''})
  // }

  const updateClient = (e) => {
   e.preventDefault();

   if (!(clientName, clientEmail, clientPhone)) {
     return alert("Fill form");
   }
    editClient(clientId, clientName, clientEmail, clientPhone);
    setIsEditable({statue: false, keyRow: null})

    navigate('/')

  }

  const handleChange = (e) =>{
    const name = e.target.name;
    const value = e.target.value;

    setClient((prevState)=>({...prevState, [name]: value}))

  }

  return (
    <tr>
        <td>{isEditable.statue && isEditable.keyRow === id ? (
          <input name='clientName' className='p-2 rounded' value={clientName} onChange={handleChange}/>
          ): name}
          </td>

        <td>{isEditable.statue && isEditable.keyRow === id ?(
          <input name='clientEmail' className='p-1 rounded border-none' value={clientEmail} onChange={handleChange}/>
          ): email}
          </td>

        <td>{isEditable.statue && isEditable.keyRow === id ?(
          <input name='clientPhone' className='p-2 rounded' value={clientPhone} onChange={handleChange}/>
          ): phone}
          </td>

        <td>
        {
            isEditable.statue && isEditable.keyRow === id ? (
              <button type='button' onClick={updateClient} className='btn btn-primary btn-sm'><FaSave/></button>
            ):(
              <button type='button' onClick={() => onEdit(id)} className='btn btn-secondary btn-sm'><FaEdit/></button>
            )
        }
        </td>
        <td>
            {
              isEditable.statue ? 
              (<button onClick={()=>setIsEditable({statue: false, keyRow: null})} className='btn btn-light btn-sma'>Cancel</button>):
              (
                <button onClick={deleteClient} className='btn btn-danger btn-sm'><FaTrash/></button>

              )
              }
        </td>

    </tr>
  )
}

export default ClientRow;