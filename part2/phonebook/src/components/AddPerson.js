const AddPerson = ({ addNote, newName, handleNoteChange, newNumber, handleNumberChange}) => (
  <>
    <form onSubmit={addNote}>
      <div>
        name: <input value={newName} onChange={handleNoteChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </>
);

export default AddPerson;