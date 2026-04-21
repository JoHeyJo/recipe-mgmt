/**
 * 
      /* Render edit button:
                Owner        role = owner, type = standard
                Collaborator role = collaborator, type = standard
                Shared       role = owner, type = shared_inbox
                viewer       role = viewer, type standard
                Share_book(copy/remove controls NO edit) 
 */
function BookControls(role: string, type: string, action: ()=>{}){
  const fullPrivileges = role === "owner" && type === "standard"
  const collaborator = role === "collaborator" && type === "standard"
  const sharedInbox = role === "owner" && type === "shared_inbox"
  const viewOnly = role === "viewer" && type === "standard"
  return (
        <section>
          {/* {role === "owner" && <FontAwesomeIcon icon={faPenToSquare} />} */}
        </section>
  )
}
export default BookControls
