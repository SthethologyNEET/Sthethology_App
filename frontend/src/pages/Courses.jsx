import CourseCard from "../components/CourseCard";
import useLogout from "../hooks/useLogout";

const courses = [
  {
    title: "NCERT Mastery Series 1.0",
    description: "For NEET 2025 Dropper Students",
    startDate: "2024-09-17",
    endDate: "2025-06-20",
    link: "https://stethologyforneet.godaddysites.com/ncert-mastery-2",
    linkText: "LET'S STUDY",
  },
  {
    title: "NEET Crash Course 2025",
    description: "For NEET 2025 Aspirants",
    startDate: "2024-12-01",
    endDate: "2025-05-30",
    link: "nya",
    linkText: "🔒 COMING SOON",
    isPremium: true,
  },
  {
    title: "Test",
    description: "For NEET Dropper Students",
    startDate: "2023-09-17",
    endDate: "2024-07-12",
    link: ".",
    linkText: "LET'S STUDY",
  },
  // Add more courses as needed
];

const Courses = () => {
  const today = new Date();
  const { loading, logout } = useLogout();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
  }

  return (
    <div className="container">
      {courses.map((course, index) => {
        const endDate = new Date(course.endDate);
        if (today > endDate) {
          return null;
        }
        return <CourseCard key={index} course={course} />;
      })}
      <div className="container">
        <button
          className="btn"
          disabled={loading}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Courses;