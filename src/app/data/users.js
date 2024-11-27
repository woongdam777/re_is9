import { database } from '../utils/firebase';
import { ref, set, get } from 'firebase/database';

export const saveUserData = async (uid, userData) => {
  try {
    if (!uid) throw new Error('인증된 사용자만 접근 가능합니다.');

    // undefined 값을 null 또는 기본값으로 변환
    const sanitizedData = {
      email: userData.email || '',
      nickname: userData.nickname || '',
      war3Id: userData.war3Id || '',
      createdAt: userData.createdAt || new Date().toLocaleString(),
      lastLogin: userData.lastLogin || new Date().toLocaleString(),
      emailVerified: typeof userData.emailVerified === 'boolean' ? userData.emailVerified : false
    };

    const userRef = ref(database, `users/${uid}`);
    await set(userRef, sanitizedData);
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