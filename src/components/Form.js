function Form(props) {
  const { addName, newName, newNumber, handleNameChange, handleNumberChange } =
    props;
  return (
    <form onSubmit={addName}>
      <div>
        <div>
          Name:{" "}
          <input type="text" value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number:{" "}
          <input type="text" value={newNumber} onChange={handleNumberChange} />
        </div>

        <button>Add</button>
      </div>
    </form>
  );
}

export default Form;
