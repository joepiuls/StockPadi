import { useEffect } from "react";
import Dexie from "dexie";
import bcryptjs from "bcryptjs";
import { encrypt } from "../utils/cryto";

const db = new Dexie('stockPadiDB');
db.version(1).stores({
  users: '&email, passwordHash, profile, token',
});



const DevTools = () => {
  const addTestUser = async () => {
    const email = "devuser@example.com";
    const password = "password123";
    const businessname = "Dev Business";
    const SECRET_KEY =  'your-fallback-secret-32-chars';
    const passwordHash = bcryptjs.hashSync(password, 10);
    const profile = {
      id: Date.now(),
      email,
      businessname,
      role: 'admin',
    };
    const encryptedProfile = encrypt(profile, SECRET_KEY);

    await db.users.put({
      email,
      passwordHash,
      profile: encryptedProfile,
      token: 'dev-dummy-token-123'
    });

    alert("✅ Test user added successfully!");
  };

  if (import.meta.env.PROD) return null; // Only show in development mode

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={addTestUser}
        className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-600 transition"
      >
        + Add Test User
      </button>
    </div>
  );
};

export default DevTools;
