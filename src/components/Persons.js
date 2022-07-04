function Persons({ personsList }) {
  return (
    <ul>
      {personsList.map((p) => {
        return (
          <li key={p.name}>
            {p.name} {p.number}
          </li>
        );
      })}
    </ul>
  );
}

export default Persons;
