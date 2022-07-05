function Persons({ personsList, handleDeletePerson }) {
  return (
    <ul>
      {personsList.map((p) => {
        return (
          <li key={p.name}>
            {p.name} {p.number}{" "}
            <button onClick={() => handleDeletePerson(p.id)}>Delete </button>
          </li>
        );
      })}
    </ul>
  );
}

export default Persons;
