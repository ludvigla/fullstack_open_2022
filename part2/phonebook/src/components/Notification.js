const Notification = ({ message }) => {
    if (message === null) {
      return null;
    }
  
    return <div className="person-added-message">{message}</div>;
  };
  
  export default Notification;