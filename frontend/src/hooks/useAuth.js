import { useState, useEffect } from "react";
import bcryptjs from 'bcryptjs';
import CryptoJS from "crypto-js";
import jwtDecode from 'jwt-decode';
import axios from "axios";


// Set up IndexedDB with Dexie
const db = new Dexie('stockPadiDB');
db.version(1).stores({
  users: '&email, passwordHash, profile, token'
});

//encrypt data before storing
const encrypt = (data, secret)=> CryptoJS.AES.encrypt(data, secret).toString();
const decrypt = (cipher, secret)=>{
    const bytes = CryptoJS.AES.decrypt(cipher, secret);
    return bytes.toString(CryptoJS.enc.Utf8)
}

export const useAuth = ()=>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isOffline, setIsOffline] = useState(false);

    useEffect(()=>{
        setIsOffline(!navigator.onLine);
    })

    const loginOnline = async (email, password) => {
        try {
            const res = await axios.post('/api/login', {email:email, password:password});
            const data = res.data.json();

            if (res.status===200) {
                const {token, user} = data;
                const decoded = jwtDecode(token);
                const passwordHash = bcryptjs.hashSync(password, 10);
                const encryptedProfile = encrypt(JSON.stringify(user), 'mysecretkey');


                //store to indexedDB 
                await db.users.put({
                    email,
                    passwordHash,
                    profile: encryptedProfile,
                    decoded
                })

                setUser(user);
                return{success:true}
            } else{
                return {success:false, message: data.message}
            }
        } catch (err) {
            return {success:false, message: err.message}
        }
    }

    const loginOffline = async (email, password) => {
        try {
            const userRecord = await db.users.get(email);
            if (!userRecord) {
                return{success:false, message:'No offline record found'}
            }

            const isValid = await bcryptjs.compareSync(password, userRecord.passwordHash);
            if(!isValid) return{success:false, message:'Invalid password'};
            const decryptedProfile = JSON.parse(decrypt(userRecord.profile, 'mysecretkey'));
            setUser(decryptedProfile);
            return{success:true}
        } catch (err) {
            return {success:false, message:err.message}
        }
    }

    const logOut = ()=>{
        setUser(null);
    }

    return{
        isOffline,
        loading,
        user,
        logOut,
        loginOffline,
        loginOnline
    }
}