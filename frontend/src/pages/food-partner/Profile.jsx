import React, { useState, useEffect } from 'react';
import '../../styles/profile.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
const Profile = () => {
    const { id: routeId } = useParams();
        const navigate = useNavigate();
    const partner = JSON.parse(localStorage.getItem("foodPartner"));

    const id = routeId || partner?._id;

    const [videos, setVideos] = useState([]);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (!id) return;

        axios
            .get(`https://food-reels-150l.onrender.com/api/foodpartner/${id}`)
            .then((response) => {
                console.log(response.data);
                setProfile(response.data.foodPartner);
                setVideos(response.data.foodPartner.foodItems);
            })
            .catch((err) => {
                console.log(err.response?.data || err.message);
            });
    }, [id]);

    return (
        <main className="profile-page">
            <section className="profile-header">
                <div className="profile-meta">
                    <img
                        className="profile-avatar"
                        src="https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500"
                        alt=""
                    />

                    <div className="profile-info">
                        <h1 className="profile-pill profile-business">
                            {profile?.name}
                        </h1>

                        <p className="profile-pill profile-address">
                            📍 {profile?.address}
                        </p>

                        <p className="profile-pill profile-phone">
                            📞 {profile?.phoneNumber}
                        </p>
                    </div>
                </div>

                <div className="profile-stats">
    <div className="profile-stat">
        <span>Total Videos</span>
        <span>{videos.length}</span>
    </div>

    <button
  className="upload-btn"
  onClick={() => navigate("/create-food")}
>
  <span className="upload-icon">＋</span>
  Upload New Video
</button>
</div>
                
            </section>

            <hr className="profile-sep" />

            <section className="profile-grid">
                {videos.map((v) => (
                    <div key={v._id} className="profile-grid-item">
                        <video
                            className="profile-grid-video"
                            src={v.video}
                            muted
                            controls
                        />
                    </div>
                ))}
            </section>
        </main>
    );
};

export default Profile;