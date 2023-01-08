import { axiosProtected } from "../api/axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const useAxiosProtected = () => {
  const { auth } = useSelector((state) => state.auth);

  console.log(auth);

  useEffect(() => {
    const requestIntercept = axiosProtected.interceptors.request.use(
      (config) => {
        config.headers["TESTING"] = "TESTING NEW HEADERS";
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosProtected.interceptors.request.eject(requestIntercept);
    };
  }, [auth]);

  return axiosProtected;
};

export default useAxiosProtected;
