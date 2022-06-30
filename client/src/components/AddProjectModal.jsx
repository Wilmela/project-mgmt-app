import {useState} from 'react';
import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PROJECTS } from '../mutations/mutations';
import { GET_PROJECTS } from '../queries/projectQueries';
import { GET_CLIENTS } from '../queries/clientQueries';

const AddProjectModal = () => {

    const [project, setProject] = useState({ name: '', description: '', clientId: '', status: 'new' });
    const {name, description, clientId, status} = project;


    const {loading, error, data } = useQuery(GET_CLIENTS)
    
    const [addProject] = useMutation(ADD_PROJECTS,{
        variables: {name, description, clientId, status},

        update(cache, {data: {addProject}}){
            const {projects} = cache.readQuery({query: GET_PROJECTS});

            cache.writeQuery({
                query: GET_PROJECTS,
                data: {projects: [...projects, addProject]}
            })
        }
    })

    const onSubmit = (e)=>{
        e.preventDefault();
        if(!(name || description || clientId || status))return alert('Please complete the form')
        addProject(name, description, clientId, status);
        setProject({name: '', email: '', clientId: '', status: 'new'});
        
    }
    
    if(loading) return null;
    if(error) return 'Something went wrong';
  return (
 <>

 {!loading && !error &&(
    <>
    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProjectModal">
    <div className="d-flex align-items-center">
        <FaList className='icon'/>
        <div>New Project</div>
    </div>
    </button>

    <div className="modal fade" id="addProjectModal" aria-labelledby="addProjectModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title" id="addProjectModalLabel">New Project</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label className='form-label'>Name</label>
                    <input type='text' id='name' className='form-control' value={name} onChange={(e) => setProject( {...project, name : e.target.value})}/>
                </div>
                <div className="mb-3">
                    <label className='form-label'>Description</label>
                    <textarea id='description' className='form-control' value={description} onChange={(e) => setProject( {...project, description : e.target.value})}/>
                </div>
                <div className="mb-3">
                    <label className='form-label'>Client ID</label>
                    <input type='text' id='ClientId' className='form-control' value={clientId} onChange={(e) => setProject( {...project, clientId : e.target.value})}/>
                </div>
                <div className="mb-3">
                    <label className='form-label'>Status</label>
                    <select id='status' value={status} onChange={(e)=> setProject({...project, status : e.target.value})} className='form-select'>
                        <option value='new'>Not Started</option>
                        <option value='progress'>In Progress</option>
                        <option value='completed'>Completed</option>
                    </select>
                </div>
                <div className="mb-">
                    <label className='form-label'>Client</label>
                    <select className='form-select' id='clientId' value={clientId} onChange={(e)=>setProject({...project, clientId: e.target.value})}>
                      {data.clients.map((client)=>(
                          <option key={client.id} value={client.id}>{client.name}</option>
                      ))}
                    </select>
                </div>
                <button type='submit' className='btn btn-primary mt-2' data-bs-dismiss='modal'>Submit</button>
            </form>
        </div>
        </div>
    </div>
    </div>
    </>
 )}
</>
  )
}

export default AddProjectModal;