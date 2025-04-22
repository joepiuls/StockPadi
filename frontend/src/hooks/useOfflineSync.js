import { useEffect, useState } from "react";
import Dexie from "dexie";

//Initialize Database

const db = new Dexie('StockPadiOfflineDB');
db.Version(1).stores({
    offlineOperations:'++id, type, payload, timestamp'
});

const useOfflineSync = ()=>{
    const [queuedOps, setQueuedOps] = useState([]);

    useEffect(()=>{

    //Load queued operations on indexedDB on mount
    const loadOperations = async ()=>{
        const ops = await db.offlineOperations.toArray();
        setQueuedOps(ops);
    }

    loadOperations();
    }, []);

    const addOperations = async (operations)=>{
        const op = {...operations, timeStamp:Date.now()}
        await db.offlineOperations.add(op);
        const ops = await db.offlineOperations.toArray();
        setQueuedOps(ops);
    }

    const removeOperations = async(id)=>{
        await db.offlineOperations.delete(id);
        const ops = await db.offlineOperations.toArray();
        setQueuedOps(ops)
    }

    const clearOperations = async ()=>{
        await db.offlineOperations.clear();
        setQueuedOps([]);
    }

    return {queuedOps, addOperations, removeOperations, clearOperations}
}

export default useOfflineSync;