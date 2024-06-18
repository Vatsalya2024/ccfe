import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './EventPage.css'; 

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().slice(0, 16), // Adjust date format for input
    location: '',
    maxAttendees: 0,
    registrationFee: 0
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/"); 
  };
  const fetchEvents = async () => {
    try {
      const response = await fetch('https://localhost:7092/api/Event');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleSelectEvent = async (id) => {
    try {
      const response = await fetch(`https://localhost:7092/api/Event/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSelectedEvent(data);
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault(); 
    try {
      const response = await fetch('https://localhost:7092/api/Event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEvent)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('New event added:', data);
      fetchEvents(); 
      setNewEvent({  
        title: '',
        description: '',
        date: new Date().toISOString().slice(0, 16),
        location: '',
        maxAttendees: 0,
        registrationFee: 0
      });
    } catch (error) {
      console.error('Error adding new event:', error);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      const response = await fetch(`https://localhost:7092/api/Event/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(`Event with ID ${id} deleted successfully`);
      fetchEvents(); 
      setSelectedEvent(null);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleUpdateEvent = async (id) => {
    try {
      const response = await fetch(`https://localhost:7092/api/Event/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedEvent)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(`Event with ID ${id} updated successfully`);
      fetchEvents(); 
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };
 

  return (
    <div className="container-fluid">
      <div className="row">

        <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
          <div className="position-sticky">
            <ul className="nav flex-column">
            <button className="btn btn-secondary mt-2" onClick={handleLogout}>
              Logout
            </button>
              {events.map(event => (
                <li key={event.id} className="nav-item">
                  <button className="nav-link" onClick={() => handleSelectEvent(event.id)}>
                    {event.title}
                  </button>
                 
                </li>
              ))}
            </ul>
          </div>
        </nav>

       
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="pt-3 pb-2 mb-3">
          
          </div>

      
          <div className="cards mb-4">
            <div className="cards-body">
              <h5 className="card-title">All Events</h5>
              <ul className="list-group">
                {events.map(event => (
                  <li key={event.id} className="list-group-item">
                    {event.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="cards-title">Event by ID</h5>
              {selectedEvent ? (
                <div>
                  <h2>Title:{selectedEvent.title}</h2>
                  <p>Description: {selectedEvent.description}</p>
                  {/* <button className="btn btn-danger mr-2" onClick={() => handleDeleteEvent(selectedEvent.id)}>Delete</button>
                  <button className="btn btn-primary" onClick={() => handleUpdateEvent(selectedEvent.id)}>Update</button> */}
                </div>
              ) : (
                <p>Select an event!</p>
              )}
            </div>
          </div>

      
          <div className="card mb-4">
            <div className="cards-body">
              <h5 className="cards-title">Add New Event</h5>
              <form onSubmit={handleAddEvent}>
                <div className="form-group">
                  <label>Title</label>
                  <input type="text" className="form-control" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <input type="text" className="form-control" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input type="datetime-local" className="form-control" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input type="text" className="form-control" value={newEvent.location} onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Max Attendees</label>
                  <input type="number" className="form-control" value={newEvent.maxAttendees} onChange={(e) => setNewEvent({ ...newEvent, maxAttendees: parseInt(e.target.value) })} required />
                </div>
                <div className="form-group">
                  <label>Registration Fee</label>
                  <input type="number" className="form-control" value={newEvent.registrationFee} onChange={(e) => setNewEvent({ ...newEvent, registrationFee: parseInt(e.target.value) })} required />
                </div>
                <button type="submit" className="btn btn-success">Add Event</button>
              </form>
            </div>
          </div>

          <div className="card mb-4">
            <div className="cards-body">
              <h5 className="cards-title">Update Event</h5>
              {selectedEvent && (
                <form onSubmit={() => handleUpdateEvent(selectedEvent.id)}>
                  <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" value={selectedEvent.title} onChange={(e) => setSelectedEvent({ ...selectedEvent, title: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <input type="text" className="form-control" value={selectedEvent.description} onChange={(e) => setSelectedEvent({ ...selectedEvent, description: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label>Location</label>
                    <input type="text" className="form-control" value={selectedEvent.location} onChange={(e) => setSelectedEvent({ ...selectedEvent, location: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label>Max Attendees</label>
                    <input type="number" className="form-control" value={selectedEvent.maxAttendees} onChange={(e) => setSelectedEvent({ ...selectedEvent, maxAttendees: parseInt(e.target.value) })} required />
                  </div>
                  <button type="submit" className="btn btn-primary">Update Event</button>
                </form>
              )}
            </div>
          </div>

         
          <div className="card mb-4">
            <div className="cards-body">
                            <h5 className="card-title">Delete Event</h5>
              {selectedEvent && (
                <div>
                  <p>Are you sure you want to delete the event "{selectedEvent.title}"?</p>
                  <button className="btn btn-danger mr-2" onClick={() => handleDeleteEvent(selectedEvent.id)}>Delete Event</button>
                  
                </div>
              )}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default EventPage;
