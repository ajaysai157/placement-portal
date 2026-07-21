import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./AuthInput.css";

function PasswordInput({
  label,
  placeholder,
  value,
  onChange,
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="auth-input-group">

      <label>{label}</label>

      <div className="password-wrapper">

        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />

        <button
          type="button"
          className="password-toggle"
          onClick={() => setShow(!show)}
        >
          {show ? <FaEyeSlash /> : <FaEye />}
        </button>

      </div>

    </div>
  );
}

export default PasswordInput;