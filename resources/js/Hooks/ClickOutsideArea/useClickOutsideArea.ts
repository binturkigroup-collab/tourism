import React, {useEffect, useRef, useState} from "react";

const useClickOutsideArea = (ref: React.MutableRefObject<any>, clicked: false) => {
    const [visible, setVisible] = useState<boolean>(clicked);
    // const ref = useRef(null);

    const clickOutsideArea = (event: any) => {
        if (ref?.current && !ref.current.contains(event.target)) {
            setVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', clickOutsideArea, true);
        return () => {
            document.removeEventListener('click', clickOutsideArea, true);
        }
    }, []);

    return {visible, setVisible};
}

export default useClickOutsideArea;
