import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReelFeed from '../../components/ReelFeed'
import '../../styles/reels.css'

const Saved = () => {
    const [videos, setVideos] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3000/api/food/save", {
            withCredentials: true
        })
        .then(response => {
            setVideos(response.data.saveFoods.map(item => ({
                ...item.food,
                isSaved: true
            })))
        })
        .catch(error => {
            console.log(error.response?.data || error.message)
        })
    }, [])

    async function saveVideo(item) {
        try {
            const response = await axios.post(
                "https://food-reels-150l.onrender.com/api/food/save",
                { foodId: item._id },
                { withCredentials: true }
            )

            if (!response.data.save) {
                setVideos(prev =>
                    prev.filter(v => v._id !== item._id)
                )
            }

        } catch (error) {
            console.log(error.response?.data || error.message)
        }
    }

    return (
        <ReelFeed
            items={videos}
            onSave={saveVideo}
            emptyMessage="No saved videos"
        />
    )
}

export default Saved