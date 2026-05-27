import React, { useState, useEffect, useContext } from "react";

const login = async() => {
    const loginData = {
        otp,
        ...(loginType === 'emailid' ? { emailid: username } : { mobileno: `91-${username}` }), // Hardcode country code
    };

    const headers = {
        'Content-Type': 'application/json',
        APIKey: config.REACT_APP_API_KEY,
    };

    const response = await axios.post(
        `${config.REACT_APP_API_URL}/login`,
        loginData,
        { headers }
    );

    // Store user data in context and localStorage
    setUser(response.data.result);
    localStorage.setItem('user', JSON.stringify(response.data.result));

    setIsOpenModal(true); // Open modal if needed
    toast.success('Login successful!');
    trackEvent('Login', 'Onclick Login', recordId);       
}