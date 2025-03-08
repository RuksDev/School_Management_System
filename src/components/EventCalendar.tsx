"use client";

import Image from "next/image";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

// TEMPORARY
const events = [
  {
    id: 2,
    title: "Science Lab",
    time: "10:00 AM - 11:30 AM",
    description:
      "Hands-on experiments in Chemistry focusing on chemical reactions.",
  },
  {
    id: 5,
    title: "Physical Education",
    time: "3:45 PM - 4:30 PM",
    description:
      "Group activities and fitness training in the school's gymnasium.",
  },
  {
    id: 6,
    title: "Parent-Teacher Meeting",
    time: "5:00 PM - 6:00 PM",
    description:
      "Discussion of student progress with parents and teachers for the 11th-grade class.",
  },
  {
    id: 7,
    title: "School Assembly",
    time: "9:00 AM - 9:45 AM",
    description:
      "Weekly school assembly with announcements, performances, and speeches.",
  },
];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="bg-white p-4 rounded-md">
      <Calendar onChange={onChange} value={value} />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Events</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <div className="          flex flex-col gap-4">
        {events.map((event) => (
          <div
            className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-ruksSkyBlue even:border-t-ruksPurple"
            key={event.id}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{event.title}</h1>
              <span className="text-gray-300 text-xs">{event.time}</span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
