import Delete from "./Delete";

const RenderContact = ({ person, deletePerson }) => 
    <li>
        {person.name + "\t" + person.number}
        <Delete person={person} deletePerson={deletePerson}/>
    </li>

export default RenderContact;