import {
  FETCH_COURSES,
  WATCH_COURSE,
  STATUS_COURSES,
  MESSAGE_COURSE,
} from "constants/types/courses";

export const statusCourses = (status) => ({
  type: STATUS_COURSES,
  payload: status,
});

export const fetchCourses = (courses) => ({
  type: FETCH_COURSES,
  payload: courses,
});

export const watchCourse = (course) => ({
  type: WATCH_COURSE,
  payload: course,
});

export const messageCourse = (message) => ({
  type: MESSAGE_COURSE,
  payload: message,
});
