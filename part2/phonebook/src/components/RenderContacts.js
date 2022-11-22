import RenderContact from "./RenderContact";

const RenderContacts = ({ persons }) => (
  <>
    <ul className="no-bullets">
      {persons.map((person) => (
        <RenderContact key={person.id} person={person} />
      ))}
    </ul>
  </>
);

export default RenderContacts;