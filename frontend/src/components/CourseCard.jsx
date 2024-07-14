/* eslint-disable react/prop-types */
const CourseCard = ({ course }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3>
          {course.title}
          {course.isPremium && <span className="premium-label">PREMIUM</span>}
        </h3>
      </div>
      <div className="card-content">
        <p>{course.description}</p>
        <p className="dates">
          📅 Starts on {new Date(course.startDate).toLocaleDateString()}<br />
          Ends on {new Date(course.endDate).toLocaleDateString()}
        </p>
        <a href={course.link} target="_blank" rel="noopener noreferrer">
          {course.linkText}
        </a>
      </div>
    </div>
  );
};

export default CourseCard;