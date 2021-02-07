import React, { useEffect } from "react";
import Youtube from "react-youtube";
import { useDispatch, useSelector } from "react-redux";

import {
  statusCourses,
  watchCourse,
  messageCourse,
} from "store/actions/courses";

import SidebarClass from "parts/SidebarClass";

import courses from "constants/api/courses";

import Loading from "parts/Loading";
import Centered from "parts/Centered";

export default function DetailsClass({ match, history }) {
  const dispatch = useDispatch();

  const COURSES = useSelector((state) => state.courses);

  useEffect(() => {
    window.scroll(0, 0);

    dispatch(statusCourses("loading"));
    courses
      .details(match.params.class)
      .then((res) => {
        if (res.chapters.length === 0)
          throw new Error("Class might be not ready yet");
        else dispatch(watchCourse(res));
      })
      .catch((err) => {
        dispatch(messageCourse(err?.response?.data?.message ?? "error"));
      });
  }, [match.params.class, dispatch]);

  if (COURSES.status === "loading") return <Loading></Loading>;
  if (COURSES.status === "error")
    return <Centered>{COURSES?.message ?? "Error here"}</Centered>;

  let currentChapter, currentLesson;
  if (
    COURSES.status === "ok" &&
    COURSES?.data?.[match.params.class]?.chapters
  ) {
    currentChapter =
      COURSES?.data?.[match.params.class]?.chapters?.find(
        (chapter) => +chapter.id === +match.params.chapter
      ) ?? COURSES.data[match.params.class]?.chapters[0];

    currentLesson =
      currentChapter?.lessons?.find(
        (lesson) => lesson.video === match.params.uid
      ) ?? currentChapter?.lessons?.[0];
  }

  function nextVideo() {}
  return (
    <div className="flex">
      {COURSES.data?.[match.params.class]?.chapters?.length > 0 && (
        <>
          <SidebarClass
            data={COURSES.data[match.params.class]}
            defaultUri={`/courses/${match.params.class}/${currentChapter.id}/${currentLesson.video}`}
          ></SidebarClass>
          <main className="flex-1">
            <div className="px-4 sm:px-16">
              <section className="flex flex-col mt-8 pl-12 sm:pl-0">
                <h1 className="text-xl sm:text-4xl text-gray-900 font-medium">
                  {currentLesson?.name ?? "Lesson Name"}
                </h1>
                <p className="text-sm sm:text-lg text-gray-600">
                  Materi bagian dari {currentChapter?.name ?? "Chapter Name"}
                </p>
              </section>
              <section className="flex flex-col mt-8">
                <div className="flex justify-start items-center -mx-4">
                  <div className="w-full px-4">
                    <div className="relative">
                      <div className="video-wrapper">
                        {currentLesson?.video && (
                          <Youtube
                            videoId={currentLesson?.video}
                            id={currentLesson?.video}
                            opts={{
                              playerVars: {
                                autoplay: 1,
                                controls: 1,
                                showinfo: 0,
                                rel: 0,
                              },
                            }}
                            onEnd={nextVideo}
                          ></Youtube>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </>
      )}
    </div>
  );
}
