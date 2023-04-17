// System Imports
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Local Imports
import { fetchProblems } from "../store/problem";

const Home = () => {
  const { problems, status } = useSelector((state) => state.problems);

  console.log(problems);

  const dispatch = useDispatch();

  useEffect(() => {
    const getProblems = async () => {
      await dispatch(fetchProblems());
    };

    getProblems();
  }, []);

  if (status !== "succeeded") {
    return null;
  }

  return (
    <div className="w-[calc(100%-8rem)] h-[calc(100vh-12rem)] mx-16 flex justify-center mt-5 font-cormorant-sc">
      <div className="w-[calc(60%-1rem)] overflow-y-scroll pr-3">
        <div className="mr-3">
          <img
            src={`/problemImages/${problems[0].id}.png`}
            className="float-right px-4 w-6/12"
          />
          <div>
            <h1 className="text-3xl font-playfair-sc line-clamp-3">
              {problems[0].title}
            </h1>
            <div className="h-0.5 w-6/12 bg-darkFont my-4"></div>
            <p
              className="first-letter:text-4xl first-letter:font-bold first-letter:text-black
					first-letter:mr-3 first-letter:mt-1 first-letter:float-left first-letter:font-playfair"
            >
              {problems[0].blurb}
            </p>
            <Link to="/problem" className="font-playfair-sc">
              See More Here
            </Link>
          </div>
        </div>
        <div className="h-0.5 w-full bg-darkFont mt-4 mb-1"></div>
        <div className="h-0.5 w-full bg-darkFont mt-1 mb-4"></div>
        <div className="flex">
          <div className="w-[calc(50%-1rem)]">
            <h1 className="text-xl font-playfair-sc line-clamp-2">
              {problems[1].title}
            </h1>
            <div className="h-0.5 w-full bg-darkFont my-4"></div>
            <img
              src={`/problemImages/${problems[1].id}.png`}
              className="w-5/12 float-right px-4"
            />
            <p
              className="first-letter:text-4xl first-letter:font-bold first-letter:text-black
			first-letter:mr-3 first-letter:mt-1 first-letter:float-left first-letter:font-playfair"
            >
              {problems[1].blurb}
            </p>
            <Link
              to={`/problem/${problems[1].id}`}
              className="font-playfair-sc"
            >
              See More Here
            </Link>
          </div>
          <div className="w-8 flex justify-center">
            <div className="bg-darkFont w-0.5"></div>
          </div>
          <div className="w-[calc(50%-1rem)]">
            <h1 className="text-xl font-playfair-sc line-clamp-2">
              {problems[2].title}
            </h1>
            <div className="h-0.5 w-full bg-darkFont my-4"></div>
            <img
              src={`/problemImages/${problems[2].id}.png`}
              className="w-5/12 float-right px-4"
            />
            <p
              className="first-letter:text-4xl first-letter:font-bold first-letter:text-black
					first-letter:mr-3 first-letter:mt-1 first-letter:float-left first-letter:font-playfair"
            >
              {problems[2].blurb}
            </p>
            <Link
              to={`/problem/${problems[2].id}`}
              className="font-playfair-sc"
            >
              See More Here
            </Link>
          </div>
        </div>
      </div>
      <div className="w-8 flex justify-center">
        <div className="bg-darkFont w-0.5"></div>
      </div>
      <div className="w-[calc(40%-1rem)] overflow-y-scroll font-cormorant-sc pr-4">
        <div className="mb-3">
          <h1 className="text-3xl font-playfair-sc">About The Dispatch</h1>
          <p className="my-3">
            The Dispatch is an algorithms and data structures competition site
            where a user's solution to a problem is ranked based on a composite
            score calculated from the following factors:
          </p>
          <ul className="list-disc">
            <li className="ml-7">Time to complete the problem</li>
            <li className="ml-7">
              Time the algorithm takes to run the test cases
            </li>
            <li className="ml-7">Memory used</li>
          </ul>
          <p className="my-3">
            Every problem is designed to have multiple solutions with varying
            time and space complexities and dependent on the problem, the
            composite score is weighted based on whether the time the algorithm
            takes to run or the memory usage is determined to be the critical
            factor.
          </p>
          <p className="my-3">
            A new problem is released every calendar month and solutions
            submitted during that time are ranked and added to the leaderboard.
            Past problems are available in a playground setting, but solutions
            submitted for past problems are not included in the leaderboard for
            the problem.
          </p>
          <Link to="/about" className="font-playfair-sc mt-3">
            Learn More
          </Link>
        </div>
        <div className="h-0.5 w-full bg-darkFont my-4"></div>
        <div>
          <h1 className="text-3xl font-playfair-sc">Previous Headlines</h1>
          {problems.map((problem, ind) => (
            <div key={problem.id} className="my-5">
              <h2 className="font-playfair-sc text-xl mb-3">{problem.title}</h2>
              <p
                className="first-letter:text-4xl first-letter:font-bold first-letter:text-black
							first-letter:mr-3 first-letter:mt-1 first-letter:float-left first-letter:font-playfair
							line-clamp-4"
              >
                {problem.blurb}
              </p>
              <Link
                to={`/problem/${problem.id}`}
                className="font-playfair-sc text-sm"
              >
                Continue Here
              </Link>
              {problems.length - 1 > ind ? (
                <div className="h-0.5 w-full bg-disabledButtonBackground my-4"></div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
