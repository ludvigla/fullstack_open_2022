const Delete = ({ person, deletePerson }) => {
    return (
      <button
        onClick={() => {
          if (window.confirm(`Delete ${person.name}?`)) {
            deletePerson(person.id);
          }
        }}
      >
        delete
      </button>
    );
};

export default Delete;