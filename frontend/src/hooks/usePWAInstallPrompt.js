import { use, useEffect, useState } from "react";

const usePWAInstallPrompt = ()=>{
    const [defferedPrompt, setDefferedPrompt] = useState(null);
    const [installable, setInstallable] =  useState(false);

    useEffect(()=>{
        const handler = (e)=>{
            e.preventDefault();
            setDefferedPrompt(e);
            setInstallable(true);
        }

        window.addEventListener('beforeinstallprompt', handler);

        return window.removeEventListener('beforeinstallprompt', handler);
    }, []);


    const promptInstall = async () => {
        if (!defferedPrompt) return;
        defferedPrompt.prompt();
        const choice = await defferedPrompt.userChoice;
        if (choice.outcome==='accepted') {
            console.log('PWA Installed');
            
        }
        setDefferedPrompt(null);
    }
    return {installable, promptInstall}
}

export default usePWAInstallPrompt;