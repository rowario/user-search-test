import { useEffect, useRef, useState } from "react";
import { SearchInput, User } from "../types";

const useSearchUsers = () => {
    const [data, setData] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const abortController = useRef<AbortController | null>(null);

    const load = async (input: SearchInput): Promise<void> => {
        const values: Record<string, string> = {
            email: input.email,
            number: input.number,
        };

        if (abortController.current) {
            abortController.current.abort();
        }

        abortController.current = new AbortController();

        const parmas = new URLSearchParams(values).toString();

        try {
            setIsLoading(true);
            const response = await fetch(
                "http://localhost:3000/search?" + parmas,
                {
                    method: "GET",
                    signal: abortController.current.signal,
                }
            );

            const data = await response.json();

            setData(data);
            setIsLoading(false);
        } catch (e) {
            if (!(e instanceof Error)) {
                alert("Got an error while fetching users :(");
            }
            if (abortController.current.signal.aborted) setIsLoading(false);
        }
    };

    useEffect(() => {
        return () => {
            if (abortController.current) {
                abortController.current.abort();
            }
        };
    }, []);

    return { data, load, isLoading };
};

export default useSearchUsers;
