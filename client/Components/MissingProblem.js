import React from "react";
import { useNavigate } from "react-router-dom";

const MissingProblem = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center mx-7 xs:mx-16 mt-8 text-center">
      <p className="text-xl font-playfair-sc">
        Ooops...Looks like our team is suffering from writers block
      </p>
      <p className="text-m font-cormorant-sc mt-4">
        Check back again soon for the next issue
      </p>
      <p className="text-m font-cormorant-sc mb-4">
        In the meantime, feel free to try out some of our previous issues{" "}
        <span
          className="text-xl hover:cursor-pointer"
          onClick={() => navigate("/pastissues")}
        >
          here
        </span>
      </p>
      <img className="w-96 opacity-90" src="/writers-block.png" />
    </div>
  );
};

export default MissingProblem;
