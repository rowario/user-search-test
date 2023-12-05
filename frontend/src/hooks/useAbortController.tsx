import { useEffect, useRef } from "react";

const useAbortController = () => {
    const controller = useRef<AbortController | null>(null);

    const updateAbortController = () => {
        if (controller.current) {
            controller.current.abort();
        }

        controller.current = new AbortController();
    };

    useEffect(() => {
        return () => {
            if (controller.current) {
                controller.current.abort();
            }
        };
    }, []);

    return [controller, updateAbortController] as const;
};

export default useAbortController;
