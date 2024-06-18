import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './UserPage.css'
const UserPage = () => {
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userDataFromStorage = JSON.parse(sessionStorage.getItem("userData"));
    const userId = userDataFromStorage ? userDataFromStorage.userId : null;

    if (!userId) {
      console.error("No user ID found in session storage");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://localhost:7092/api/User/GetUserById?id=${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setUserData(data);
        setUsername(data.userName); // Corrected to use correct property name
        setEmail(data.email);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://localhost:7092/api/Event",
          {
            method: "GET",
            headers: {
              "accept": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchUserData();
    fetchEvents();
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/"); 
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="containers">
      <div className="rows">
        <div className="col-md-6 lefts">
          <div className="profile-section">
            <h3>Profile</h3>
            <hr/>
            <p>
              <strong>Username:</strong> {username}
            </p>
            <p>
              <strong>Email:</strong> {email}
            </p>
          </div>
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className="col-md-6 rights">
          <div className="events-section">
            <h3>Events</h3>
            <hr/>
            {events.map((event) => (
              <div key={event.id} className="event">
                <h3>{event.title}</h3>
                <h4>{event.description}</h4>
                <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                <p>Location: {event.location}</p>
                <p>Max Attendees: {event.maxAttendees}</p>
                <p>Registration Fee: {event.registrationFee}</p>
                <hr/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;