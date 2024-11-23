import { database } from '../utils/firebase';
import { ref, set, get } from 'firebase/database';

export const saveUserData = async (uid, userData) => {
  try {
    if (!uid) throw new Error('인증된 사용자만 접근 가능합니다.');
    
    const userRef = ref(database, `users/${uid}`);
    const now = new Date();
    const formattedDate = now.toLocaleString();
    await set(userRef, {
      email: userData.email,
      nickname: userData.nickname || '',
      war3Id: userData.war3Id || '',
      createdAt: formattedDate,
      lastLogin: formattedDate,
      emailVerified: userData.emailVerified || false
    });
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};

export const getUserData = async (uid) => {
  try {
    const userRef = ref(database, `users/${uid}`);
    const snapshot = await get(userRef);
    return snapshot.exists() ? snapshot.val() : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    throw error;
  }
};