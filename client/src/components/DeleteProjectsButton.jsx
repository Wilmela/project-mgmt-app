import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { DELETE_PROJECT } from "../mutations/mutations";
import { GET_PROJECTS } from "../queries/projectQueries";

const DeleteProjectsButton = ({ id }) => {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id },
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  return (
    <div className="d-flex mt-5 mx-auto">
      <div className="btn btn-danger m-2" onClick={deleteProject}>
        <FaTrash /> Delete Project
      </div>
    </div>
  );
};

export default DeleteProjectsButton;
