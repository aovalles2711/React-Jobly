import { useRef, useState, useEffect } from "react";

// function useTimedMessage(timeinMsec = 3000) {
//     const [myMsgFlag, setMsgFlag] = useTimedMessage();

//     function somethingDidntWork() {
//         setMsgFlag(true);
//     }

//     return (
//         {myMsgFlag ? <p>Oh No!</p> : null}
//     )
// }

function useTimedMessage(timeinMsec = 3000) {
    const[active, setActive] = useState(false);

    const messageShownRef = useRef(false);

    useEffect(
        function showSavedMessage() {
            if (active && !messageShownRef.current) {
                messageShownRef.current = true;
                setTimeout(function removeMessage() {
                    setActive(false);
                    messageShownRef.current = false;
                }, timeinMsec);
            }
        },
        [active, timeinMsec],
    );

    return [active, setActive];
}


export default useTimedMessage;