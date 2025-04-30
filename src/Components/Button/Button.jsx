import "./Button.css";

function Button({ buttonName, typeButton, onClickFunction }) {
  return (
    <button onClick={onClickFunction} className="btn" type={typeButton}>
      {buttonName}
    </button>
  );
}

export default Button;
