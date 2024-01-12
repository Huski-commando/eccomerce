import { GoDotFill } from "react-icons/go";
import { FaCheck } from "react-icons/fa";

const PasswordStrengthItem = ({ condition, text }) => (
  <li
    className={
      condition
        ? "text-green-400 flex items-center"
        : "text-red-400 flex items-center"
    }
  >
    {condition ? <FaCheck className="mt-1" /> : <GoDotFill className="mt-1" />}{" "}
    &nbsp; {text}
  </li>
);

export default PasswordStrengthItem;
