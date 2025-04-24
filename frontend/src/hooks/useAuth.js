import { useState, useEffect } from "react";
import Dexie from "dexie";
import bcryptjs from 'bcryptjs';
import CryptoJS from "crypto-js";
// import jwtDecode from 'jwt-decode'
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
    const [loading, setLoading] = useState(false);
    const [isOffline, setIsOffline] = useState(false);

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    useEffect(()=>{
        setIsOffline(!navigator.onLine);
    })

    const register = async (email, password, businessname) => {
        setLoading(true)
        await sleep(7000);
        try {
            const res = await axios.post('/api/vi/register', {
               email,
               password,
               businessname 
            })
            if (res.status==201) {
                setLoading(false);
                return {success: true, message:'Registeration successful'}
            } else{
                setLoading(false);
                return { success: false, message: res.data.message || 'Registration failed' };
            }
        } catch (err) {
            setLoading(false);
            return {success:false, message:err.data.message || 'Registration failed'}
        }
    }

    const registerStaff = async (email, password, staffData) => {
        setLoading(true);
        await sleep(7000)
        try {
            const res = await axios.post('/api/staff/register', {
               email,
               password,
               ...staffData
            })
            if (res.status==201) {
                setLoading(false);
                return {success: true, message:'Registeration successful'}
            } else{
                setLoading(false);
                return { success: false, message: res.data.message || 'Registration failed' };
            }
        } catch (err) {
            setLoading(false);
            return {success:false, message:err.data.message || 'Registration failed'}
        }
    }

    const loginOnline = async (email, password) => {
        setLoading(true);
        await sleep(7000);
        try {
            const res = await axios.post('/api/login', {email:email, password:password});
            const data = res.data.json();

            if (res.status===200) {
                const {token, user} = data;
                // const decoded = jwtDecode(token);
                const passwordHash = bcryptjs.hashSync(password, 10);
                const encryptedProfile = encrypt(JSON.stringify(user), 'mysecretkey');


                //store to indexedDB 
                await db.users.put({
                    email,
                    passwordHash,
                    profile: encryptedProfile,
                    token
                })

                setUser(user);
                setLoading(false);
                return{success:true}
            } else{
                setLoading(false);
                return {success:false, message: data.message}
            }
        } catch (err) {
            setLoading(false);
            return {success:false, message: err.message}
        }
    }

    const loginOffline = async (email, password) => {
        setLoading(true);
        await sleep(7000)
        try {
            const userRecord = await db.users.get(email);
            if (!userRecord) {
                return{success:false, message:'No offline record found'}
            }

            const isValid = await bcryptjs.compareSync(password, userRecord.passwordHash);
            if(!isValid) return{success:false, message:'Invalid password'};
            const decryptedProfile = JSON.parse(decrypt(userRecord.profile, 'mysecretkey'));
            setUser(decryptedProfile);
            setLoading(false);
            return{success:true}
        } catch (err) {
            setLoading(false);
            return {success:false, message:err.message}
        }
    }

    const logOut = async ()=>{
        setLoading(true);
        await sleep(7000);
        setUser(null);
        setLoading(false);
    }

    return{
        isOffline,
        loading,
        user,
        logOut,
        loginOffline,
        loginOnline,
        register,
        registerStaff
    }
}