import RenderContact from "./RenderContact";

const RenderContacts = ({ persons }) =>
<>
    <ul className="no-bullets">
        {persons.map((person) => {
        return person.important ? (
            <RenderContact key={person.id} person={person} />
        ) : null;
        })}
    </ul>
</>

export default RenderContacts;