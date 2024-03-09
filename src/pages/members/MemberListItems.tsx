/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */


// First, I'll import the useMembersState custom hook to access projects state.
import { useMembersState } from "../../context/members/context";
import { deletemem } from '../../context/members/actions'
import { useMembersDispatch } from '../../context/members/context'
export default function ProjectListItems() {

  // I'll define a new constant called `state`, to call the useMembersState() hook, 
  // and get access to projects state.
  let state: any = useMembersState();
  const dispatchProjects = useMembersDispatch()
  // Next, I'll destructure the state object to gain access to projects, 
  // isLoading, isError and errorMessage property.
  const { projects, isLoading, isError, errorMessage } = state
  console.log("after render",projects);

  // If `isLoading` is true, and there are no projects, in that case, 
  // I'll show a loading text
  if (projects.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }
  
// Next, if there is an error, I'll show the error message.
  if (isError) {
    return <span>{errorMessage}</span>;
  }
  const handleDelete = async (projectId: number) => {
    // Perform deletion logic here, using projectId
    // You might want to confirm with the user or make an API call to delete the project
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = await deletemem(dispatchProjects, projectId)
    console.log(`Deleting project with id: ${projectId}`);
    console.log(response)
  };
  // And finally I'll iterate over the projects object to show the 
  // individual projects card.
  return (
    <>
      {projects.map((project: any) => (
        <div key={project.id} className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 member">
          <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">Name: {project.name}</h5>
          <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">Email Id: {project.email}</h5>
          <button onClick={() => handleDelete(project.id)} className="bg-red-500 text-white px-3 py-1 rounded-md mt-2">
            Delete
          </button>
        </div>
      ))}
    </>
  );
}