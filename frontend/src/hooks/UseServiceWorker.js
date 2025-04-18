import { useEffect } from "react";
import { useState } from "react"

const useServiceWorker = ({swUrl})=>{
    const [registeration, setRegisteration] = useState(null);
    const [error, setError] = useState(null);
    const [upadateAvailable, setUpdateAvailable] = useState(false);


    useEffect(()=>{
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register(swUrl)
            .then((reg)=>{
                setRegisteration(reg);

                //listen to updates
                reg.onupdatefound = ()=>{
                    const installingWorker = reg.installing;

                    if (installingWorker) {
                        installingWorker.onstatechange = ()=>{
                            if (
                                installingWorker.state==='installed'
                            && navigator.serviceWorker.controller) {
                                setUpdateAvailable(true);
                            }
                        }
                    }
                }
            }).catch((err)=>{
                setError(err)
            })
        }
    }, [swUrl]);

    return {registeration, error, upadateAvailable}
}

export default useServiceWorker;