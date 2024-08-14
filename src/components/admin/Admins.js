import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admins.css';

const Admins = () => {
    const [teachers, setTeachers] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        hours: '',
        rate: '',
        image: '',
    });
    const [editMode, setEditMode] = useState(false);
    const [editTeacherId, setEditTeacherId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showLogout, setShowLogout] = useState(false); // State for toggling logout
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://127.0.0.1:8000/myapp/api/teachers/')
            .then(response => response.json())
            .then(data => setTeachers(data))
            .catch(error => console.error('Error fetching teacher data:', error));
    }, []);

    const handleEdit = (teacher) => {
        setEditMode(true);
        setEditTeacherId(teacher.id);
        setFormData({
            name: teacher.name,
            hours: teacher.hours,
            rate: teacher.rate,
            image: teacher.image,
        });
        setShowForm(true);
    };

    const handleDelete = (teacherId) => {
        if (window.confirm("Are you sure you want to delete this teacher?")) {
            fetch(`http://127.0.0.1:8000/myapp/api/teachers/${teacherId}/`, {
                method: 'DELETE',
            })
            .then(response => {
                if (response.ok) {
                    setTeachers(teachers.filter(teacher => teacher.id !== teacherId));
                } else {
                    alert("Failed to delete teacher.");
                }
            })
            .catch(error => console.error('Error deleting teacher:', error));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const url = editMode 
            ? `http://127.0.0.1:8000/myapp/api/teachers/${editTeacherId}/` 
            : 'http://127.0.0.1:8000/myapp/api/teachers/';
        
        const method = editMode ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            if (editMode) {
                setTeachers(teachers.map(teacher => teacher.id === editTeacherId ? data : teacher));
                setEditMode(false);
            } else {
                setTeachers([...teachers, data]);
            }
            setFormData({ name: '', hours: '', rate: '', image: '' });
            setShowForm(false);
        })
        .catch(error => console.error('Error submitting form data:', error));
    };

    const handleAddButtonClick = () => {
        setEditMode(false);
        setFormData({ name: '', hours: '', rate: '', image: '' });
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    const handleProfileClick = () => {
        setShowLogout(!showLogout); // Toggle logout visibility
    };

    const handleLogout = () => {
        // Perform logout logic (e.g., clearing tokens, redirecting)
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <main className="ma">
                <header className="dashboard-header">
                    <h2>TEACHERS DETAILS</h2>
                    <nav>
                        <a href="/data" className="nav-link">Payment Details</a>
                        <a href="/leaderboard" className="nav-link">Leaderboard</a>
                    </nav>
                    <div className="profile" onClick={handleProfileClick}>
                        <img src="https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg" alt="Profile" />
                        <p>Admin</p>
                        {showLogout && (
                          <div className="logout-menu">
                                <button onClick={handleLogout} className="logout-button">Logout</button>
                            </div>
                        )}
                    </div>
                </header>

                <section className="courses">
                    <div className="course-card">
                        <img src="https://i.pinimg.com/originals/ec/c3/88/ecc3882e29654a291f8824494979145b.gif" alt="Web Development" />
                        <p>Web Development</p>
                    </div>
                    <div className="course-card">
                        <img src="https://d382vuhe6yd0tq.cloudfront.net/wp-content/uploads/2023/12/custom-web-application-development.webp" alt="App Development" />
                        <p>App Development</p>
                    </div>
                    <div className="course-card">
                        <img src="https://swmultimedia.in/wp-content/uploads/2023/04/SW-MULTI-MEDIA-COURSES-01-min.png" alt="UX & UI" />
                        <p>UX & UI</p>
                    </div>
                </section>

                <section className="teachers">
                  <div className='xxx'>
                    <h3>Teachers</h3>
                        <button className="add-button" onClick={handleAddButtonClick}>ADD+</button>
                        </div>
                    {teachers.map(teacher => (
                        <div key={teacher.id} className="teacher">
                            <img src={teacher.image} alt={teacher.name} />
                            <div>
                                <p>{teacher.name}</p>
                                <p>{teacher.hours} hours lesson - ${teacher.rate}/hr</p>
                            </div>
                            <div className="teacher-actions">
                                <button className="edit-button" onClick={() => handleEdit(teacher)}>Edit</button>
                                <button className="delete-button" onClick={() => handleDelete(teacher.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </section>

                {showForm && (
                    <div className="form-modal">
                        <div className="form-cont">
                            <h3>{editMode ? "Edit Teacher" : "Add New Teacher"}</h3>
                            <form onSubmit={handleFormSubmit}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="number"
                                    name="hours"
                                    placeholder="Hours"
                                    value={formData.hours}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="number"
                                    name="rate"
                                    placeholder="Rate per hour"
                                    value={formData.rate}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="image"
                                    placeholder="Image URL"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                    required
                                />
                                <button type="submit" className="submit-button">{editMode ? "Update Teacher" : "Add Teacher"}</button>
                                <button type="button" className="close-button" onClick={handleCloseForm}>Cancel</button>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Admins;
