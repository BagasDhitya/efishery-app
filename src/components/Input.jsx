import "../styles/components/input.scss";

const Input = ({ id, label, type, name, value, placeholder, onChange }) => {
  return (
    <div className="input-container">
      <label className="input-label">{label}</label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="input"
      />
    </div>
  );
};

export default Input;
