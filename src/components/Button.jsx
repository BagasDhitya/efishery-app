import "../styles/components/button.scss";

const Button = ({ id, label, type, disabled, onClick }) => {
  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="button-container"
    >
      {label}
    </button>
  );
};

export default Button;
