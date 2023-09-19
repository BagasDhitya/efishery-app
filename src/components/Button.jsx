import "../styles/components/button.scss";

const Button = ({ id, label, type, onClick }) => {
  return (
    <button id={id} type={type} onClick={onClick} className="button-container">
      {label}
    </button>
  );
};

export default Button;
