import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import courses from "constants/api/courses";

import ServerError from "pages/500";
import Loading from "parts/Loading";

export default function Joined({ history, match }) {
  const [state, setstate] = useState(() => ({
    isLoading: true,
    isError: false,
    data: {},
  }));

  const joining = React.useCallback(async () => {
    try {
      const details = await courses.details(match.params.class);

      const joined = await courses.join(match.params.class);
      if (joined.data.snap_url) window.location.href = joined.data.snap_url;
      else setstate({ isLoading: false, isError: false, data: details });
    } catch (error) {
      if (error?.response?.data?.message === "user already take this course")
        history.push(`/courses/${match.params.class}`);
    }
  }, [match.params.class]);

  useEffect(() => {
    joining();
  }, [joining]);

  if (state.isLoading) return <Loading></Loading>;
  if (state.isError) return <ServerError></ServerError>;

  return (
    <section className="h-screen flex flex-col items-center mt-24">
      <img
        src={`${process.env.PUBLIC_URL}/assets/images/illustration-joined.jpg`}
        alt="Success join class"
      />
      <h1 className="text-3xl text-gray-900 mt-12">Welcome to Class</h1>
      <p className="text-lg text-gray-600 mt-4 mtb-8 lg:w-4/12 xl:w-3/12 mx-auto text-center">
        You have successfully joined our{" "}
        <strong>{state?.data?.name ?? "Class Name"}</strong> class
      </p>
      <Link
        className="cursor-pointer bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3 mt-5"
        to={`/courses/${match.params.class}`}
      >
        Start learn
      </Link>
    </section>
  );
}
