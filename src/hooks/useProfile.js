import { useState } from "react"

export const useProfile = (initialValue) => {
    const [ profile, setProfile ] = useState(initialValue);

    return {
        profile,
        setProfile,
    }
}
