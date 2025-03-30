export const ITEM_PER_PAGE = 10;

export const routeAccessMap: { [key: string]: string[] } = {
  "/admin(.*)": ["admin"],
  "/teacher(.*)": ["teacher"],
  "/student(.*)": ["student"],
  "/parent(.*)": ["parent"],
  "/list/parents(.*)": ["admin", "teacher"],
  "/list/students(.*)": ["admin", "teacher"],
  "/list/teachers(.*)": ["admin", "teacher"],
  "/list/subjects(.*)": ["admin"],
  "/list/classes(.*)": ["admin", "teacher"],
  "/list/exams(.*)": ["admin", "teacher", "student", "parent"],
  "/list/assignments(.*)": ["admin", "teacher", "student", "parent"],
  "/list/events(.*)": ["admin", "teacher", "student", "parent"],
  "/list/announcements(.*)": ["admin", "teacher", "student", "parent"],
  "/list/attendance(.*)": ["admin", "teacher", "student", "parent"],
  "/list/results(.*)": ["admin", "teacher", "student", "parent"],
};
