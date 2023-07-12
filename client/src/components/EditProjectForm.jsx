import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_PROJECT } from "../mutations/project";
import { GET_PROJECT } from "../queries/project";

export default function EditProjectForm({ project }) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState('');

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !description || !status) {
      return alert('Please fill out all fields');
    }

    updateProject(name, description, status);
  }

  return (
    <div className="mt-5">
      <h3>Update Project Details</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
          >

          </textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            id="status"
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="form-select"
          >
            <option value="new">Not Started</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
