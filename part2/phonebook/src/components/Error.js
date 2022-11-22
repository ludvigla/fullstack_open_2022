const Error = ({ message }) => {
    if (message === null) {
      return null;
    }
  
    return <div className="person-removed">{message}</div>;
  };
  
  export default Error;