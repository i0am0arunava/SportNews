import React, { useEffect } from 'react';
import { fetchMembers } from "../../context/members/actions";

// So, let's import the useMembersDispatch custom hook.
import { useMembersDispatch } from "../../context/members/context";

// I'll import the ProjectListItems component from the same folder. 
// This I'll define next.
import ProjectListItems from './MemberListItems';
const ProjectList: React.FC = () => {

  // I'll define a new constant called dispatchProjects, 
  // to call the useMembersDispatch() hook.
  const dispatchProjects = useMembersDispatch();
  
  useEffect(() => {
    // And I'll pass the `dispatchProjects` to `fetchMembers` function.
    fetchMembers(dispatchProjects)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="grid gap-4 grid-cols-4 mt-5">
      {/*To keep this file clean, I'll move all the logic to access the projects 
       from our app-state, to a new component ProjectListItems */}
      <ProjectListItems />
    </div>
  );
};
export default ProjectList;