import { ChangeEvent, FormEvent, useState } from "react";
import InputField from "./components/InputField";
import chunk from "./utils/chunk";
import useSearchUsers from "./hooks/useSearchUsers";

function App() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [number, setNumber] = useState("");

    const { data: users, isLoading: isLoadingUsers, load } = useSearchUsers();

    const handleEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 0 && emailError.length > 0)
            setEmailError("");

        setEmail(event.target.value);
    };

    const handleNumberDashedInput = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.trim().replaceAll("-", "");

        let newValue = chunk(value.split(""), 2)
            .map((x) => x.join(""))
            .join("-");

        setNumber(newValue);
    };

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (email.length < 1) {
            setEmailError("Please enter a value");
            return;
        }

        load({ email, number });
    };

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <InputField
                    value={email}
                    onChange={handleEmailInput}
                    label="Email"
                    placeholder="john@mail.com"
                    error={emailError}
                />
                <InputField
                    value={number}
                    onChange={handleNumberDashedInput}
                    label="Number"
                    placeholder="12-34-56"
                />
                <button type="submit">Send</button>
            </form>
            {isLoadingUsers && "Loading..."}
            {!isLoadingUsers &&
                users &&
                users.map((user, index) => (
                    <div key={index}>
                        Email: {user.email}
                        <br />
                        Number: {user.number}
                    </div>
                ))}
        </>
    );
}

export default App;
