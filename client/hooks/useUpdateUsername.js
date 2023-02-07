// System Library Imports
import { axiosProtected } from "../api/axios";

const useUpdateUsername = async (username) => {
  try {
    const res = await axiosProtected.put(`/users/username`, {
      username,
    });

    return res;
  } catch (err) {
    return err.response;
  }
};

export default useUpdateUsername;
