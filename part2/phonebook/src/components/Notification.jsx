const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  const notificationStyles = {
    color: message.state === "notification" ? "green" : "red",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  return <div style={notificationStyles}>{message.message}</div>;
};

export default Notification;
