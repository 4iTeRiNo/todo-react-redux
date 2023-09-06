
const NewFomInput = ({text, handleInput, handelSubmit}) => {
  return (
    <label className="input-wrapper">
      <input value={text} onChange={(e) => handleInput(e.target.value)}/>
      <button onClick={handelSubmit}>Add Todo</button>
    </label>
  )
}

export default NewFomInput