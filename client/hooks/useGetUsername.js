// System Library Imports
import { axiosProtected } from "../api/axios";

const useGetUsername = async () => {
  try {
    const res = await axiosProtected.get(`/users/username`);

    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default useGetUsername;
