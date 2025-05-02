import CryptoJS from 'crypto-js';

// Use environment variable or fallback secret key
const SECRET_KEY =  'your-fallback-secret-32-chars';

export const encrypt = (data, secretKey = SECRET_KEY) => {
  try {
    if (typeof data !== 'object') {
      throw new Error('Data must be an object');
    }
    const jsonString = JSON.stringify(data);
    return CryptoJS.AES.encrypt(jsonString, secretKey).toString();
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
};

export const decrypt = (ciphertext, secretKey = SECRET_KEY) => {
  try {
    if (!ciphertext) {
      throw new Error('No ciphertext provided');
    }

    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    if (!decrypted) {
      throw new Error('Decryption failed - empty result');
    }

    return JSON.parse(decrypted);
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt data');
  }
};
