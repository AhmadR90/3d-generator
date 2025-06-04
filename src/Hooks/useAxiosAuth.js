import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../Redux/Slice/UserSlice'; // Adjust path to your Redux slice
//import { initializeAxios } from '../Axios/axiosInatance'; // Adjust path to axiosInstance.js

const useAxiosAuth = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);

  useEffect(() => {
    // Initialize axios with token management functions
    initializeAxios({
      getTokens: () => ({
        accessToken: userData?.accessToken,
        refreshToken: userData?.refreshToken,
      }),
      updateTokens: ({ accessToken, refreshToken }) => {
        dispatch(setUserData({
          ...userData,
          accessToken,
          refreshToken,
        }));
      },
      logout: () => {
        dispatch(setUserData(null));
        window.location.href = '/login';
      },
    });
  }, [dispatch, userData]);

  return null; // No need to return anything unless you want to expose additional functionality
};

export default useAxiosAuth;