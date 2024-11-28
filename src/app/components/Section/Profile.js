'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styles from '../../style/Profile.module.css';

export default function Profile() {
  const { user, updateUserProfile } = useAuth();
  const [formData, setFormData] = useState({
    nickname: '',
    war3Id: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        nickname: user.nickname || '',
        war3Id: user.war3Id || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'war3Id' ? value.toLowerCase() : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(formData);
      alert('회원정보가 성공적으로 업데이트되었습니다.');
    } catch (error) {
      alert('회원정보 업데이트에 실패했습니다: ' + error.message);
    }
  };

  return (
    <section id="my-page" className="my-page">
      <div className={styles.myPageContainer}>
        <h2>회원정보 수정</h2>
        <br />
        <h4>워크아이디는 최초 1회만 수정가능하니 주의해주세요</h4>
        <h4>워크아이디는 모두 소문자로 입력해주셔야 됩니다.</h4>
        <h4>잘못 수정했으면 아래 오픈톡방으로 문의주세요</h4>
        <br />
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="nickname">닉네임</label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
            />
          </div>
          {user.war3Id === 'none' && (
            <div>
              <label htmlFor="war3Id">War3 ID</label>
              <input
                type="text"
                id="war3Id"
                name="war3Id"
                value={formData.war3Id}
                onChange={handleChange}
                placeholder="소문자로 입력해주세요"
              />
            </div>
          )}
          <button type="submit" className={styles.submitButton}>
            정보 수정
          </button>
        </form>
      </div>
    </section>
  );
}