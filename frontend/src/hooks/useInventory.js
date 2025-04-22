import { useState, useEffect } from "react";
import Dexie from "dexie";

const db = new Dexie('stockPadiDB');
db.version(1).stores({
    inventory: '++id, name, category, quantity, price, updatedAt'
})


export const useInventory = ()=>{
    const [items, setItems] = useState([]);

    useEffect(()=>{
        const fetchItems = async () => {
            const allItems = await db.inventory.toArray();
            setItems(allItems);
        }
        fetchItems();
    }, [])

    const addItem = async (item) => {
        item.updatedAt = new Date.toISOString();
        const id = await db.inventory.add(item)
        setItems(await db.inventory.toArray());
        return id
    }

    const updateItem = async (id, updatedItem) => {
        updateItem.updatedAt = new Date.toISOString();
        await db.inventory.update(id, updatedItem)
        setItems(await db.inventory.toArray());
    }

    const deleteItem = async (id) => {
        await db.inventory.delete(id)
        setItems(await db.inventory.toArray());
    }

    const clearInventory = async () => {
        await db.inventory.clear();
        setItems([]);
    }

    return {
        items,
        addItem,
        updateItem,
        deleteItem,
        clearInventory
    }

}