const Header = (props) => {
  return(
    <>
      <h1>{props.course}</h1>
    </>
  )
};

const Part = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exercise}
      </p>
    </>
  );
};

const Content = (props) => {
  return (
    <>
      <Part part={props.parts.part1} exercise={props.exercises.exercises1}/>
      <Part part={props.parts.part2} exercise={props.exercises.exercises2}/>
      <Part part={props.parts.part3} exercise={props.exercises.exercises3}/>
    </>
  );
};

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.exercises.exercises1 + props.exercises.exercises2 + props.exercises.exercises3}</p>
    </>
  );
};

const App = () => {

  const course = 'Half Stack application development';

  const exercises = {
    exercises1: 10,
    exercises2: 7,
    exercises3: 14
  }

  const parts = {
    part1: "Fundamentals of React",
    part2: "Using props to pass data",
    part3: "State of a component"
  }

  return (
    <>
      <Header course={course} />
      <Content exercises={exercises} parts={parts}/>
      <Total exercises={exercises} />
    </>
  )
};

export default App;