const Announcements = () => {
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-xs text-gray-400">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4 ">
      <div className="bg-ruksSkyBlueLight rounded-md p-4 relative">
          <div className="flex items-center justify-between">
            <div className="mt-4">
            <h2 className="font-medium">Submit your project proposals by January 25th.</h2>
            </div> 
            <span className="text-xs text-gray-400 bg-white rounded-md px-2 py-1 absolute top-1 right-2  whitespace-nowrap ">2025-01-05</span>
          </div>
          <p className="text-sm text-gray-600 mt-4">Students are requested to submit their project proposals for review. Late submissions will not be accepted.</p>
        </div>
        <div className="bg-ruksPurpleLight rounded-md p-4 relative">
          <div className="flex items-center justify-between">
            <div className="mt-4">
            <h2 className="font-medium">Annual sports day will be held on February 10th.</h2>
            </div> 
            <span className="text-xs text-gray-400 bg-white rounded-md px-2 py-1 absolute top-1 right-2  whitespace-nowrap ">2025-01-05</span>
          </div>
          <p className="text-sm text-gray-600 mt-4">Join us for a day of fun and sportsmanship as we celebrate the Annual Sports Day. Students are encouraged to participate in various events.</p>
        </div>
        <div className="bg-ruksYellowLight rounded-md p-4 relative">
          <div className="flex items-center justify-between">
            <div className="mt-4">
            <h2 className="font-medium">School will remain closed tomorrow due to maintenance.</h2>
            </div> 
            <span className="text-xs text-gray-400 bg-white rounded-md px-2 py-1 absolute top-1 right-2  whitespace-nowrap ">2025-01-05</span>
          </div>
          <p className="text-sm text-gray-600 mt-4">The school will be undergoing essential maintenance work to improve facilities. All classes and activities are canceled for the day.</p>
        </div>
      </div>
    </div>
    
    
  );
};

export default Announcements;

