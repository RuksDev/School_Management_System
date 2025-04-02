import prisma from "@/lib/prisma";

const EventList = async ({ dateParam }: { dateParam: string | undefined }) => {
  // Safe date parsing with validation
  const parseDate = (dateString?: string): Date => {
    if (!dateString) return new Date();

    // Handle ISO format (2025-04-01) and other date strings
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? new Date() : date;
  };

  const date = parseDate(dateParam);

  // Create new Date objects to avoid mutation
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  try {
    const data = await prisma.event.findMany({
      where: {
        startTime: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      orderBy: {
        startTime: "asc",
      },
    });

    if (data.length === 0) {
      return (
        <div className="p-5 rounded-md border-2 border-gray-100 text-center text-gray-400">
          No events scheduled for this day
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-4">
        {data.map((event) => (
          <div
            className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple"
            key={event.id}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{event.title}</h1>
              <span className="text-gray-300 text-xs">
                {event.startTime.toLocaleTimeString("en-UK", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return (
      <div className="p-5 rounded-md border-2 border-gray-100 text-center text-red-400">
        Error loading events
      </div>
    );
  }
};

export default EventList;
