import { FC, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
};

const InputField: FC<InputProps> = ({ label, error, ...props }) => {
    return (
        <div>
            {label && (
                <div>
                    <label>{label}</label>
                </div>
            )}
            <input {...props} type="text" />
            {error && error.length > 0 && (
                <p style={{ color: "red" }}>{error}</p>
            )}
        </div>
    );
};

export default InputField;
