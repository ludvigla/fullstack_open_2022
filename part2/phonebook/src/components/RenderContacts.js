import RenderContact from "./RenderContact";

const RenderContacts = ({ persons, deletePerson }) => (
  <>
    <ul className="no-bullets">
      {persons.map((person) => (
        <RenderContact 
          key={person.id} 
          person={person} 
          deletePerson={deletePerson}
        />
      ))}
    </ul>
  </>
);

export default RenderContacts;