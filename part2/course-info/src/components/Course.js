const Header = ({ course }) => <h2>{course}</h2>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part key={part.id} part={part} />)}  
  </>

const Total = ({ parts }) => 
<>
  <strong>
    Total of {parts.map(part => part.exercises).reduce((a, b) => a + b, 0)} execises 
  </strong>
</>

const Course = ({ course, parts }) => (
  <>
    <Header course={course} />
    <Content parts={parts} />
    <Total parts={parts} />
  </>
);

export default Course;