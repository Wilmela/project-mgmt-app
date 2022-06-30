import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries';
import { UPDATE_PROJECT } from '../mutations/mutations';

const EditProjectForm = ({project}) => {
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);


    const [editProject, setEditProject] = useState({name: project.name, description: project.description, status: ''})
    
    const {name, description, status} = editProject;

    const [updateProject] = useMutation(UPDATE_PROJECT, 
        {variables: {id: project.id, name, description, status},
        refetchQueries:[{query: GET_PROJECT}]
        });

  const onSubmit =(e)=>{
    e.preventDefault();

    if(!(name || description || status)){
        return alert('Please complete the form')
    }
    updateProject(name, description, status);
    navigate('/')
    setToggle(false);
  }
    return (
    <>
        <div onClick={()=>setToggle(!toggle)} className="mt-2 d-flex align-items-center justify-content-center">
            <p className="btn btn-light fw-bold w-100">{toggle ? 'Quit Editing' : 'Edit Project'}</p>
        </div>

    {toggle && (<div className='mt-5'>
        
        <h3>Update Project Details</h3>

        <form onSubmit={onSubmit}>
              <div className="mb-3">
                    <label className='form-label'>Name</label>
                    <input type='text' id='name' className='form-control' value={name} onChange={(e) => setEditProject( {...editProject, name : e.target.value})}/>
                </div>
                <div className="mb-3">
                    <label className='form-label'>Description</label>
                    <textarea id='description' className='form-control' value={description} onChange={(e) => setEditProject( {...editProject, description : e.target.value})}/>
                </div>
              
                <div className="mb-3">
                    <label className='form-label'>Status</label>
                    <select id='status' value={status} onChange={(e)=> setEditProject({...editProject, status : e.target.value})} className='form-select'>
                        <option value='new'>Not Started</option>
                        <option value='progress'>In Progress</option>
                        <option value='completed'>Completed</option>
                    </select>
                </div>
                <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
    
    </div>)}
</>
  )
}

export default EditProjectForm;