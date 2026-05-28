import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../../styles/reels.css'
import ReelFeed from '../../components/ReelFeed'

const Home = () => {
    const [videos, setVideos] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3000/api/food", { withCredentials: true })
            .then(response => {
                console.log(response.data)
                setVideos(response.data.foodItems)
            })
            .catch((error) => {
                console.log(error.response?.data || error.message)
            })
    }, [])

  async function likeVideo(item) {
    try {
        const response = await axios.post(
            "http://localhost:3000/api/food/like",
            { foodId: item._id },
            { withCredentials: true }
        )

        setVideos(prev =>
            prev.map(v =>
                v._id === item._id
                    ? {
                          ...v,
                          isLiked: response.data.like,
                          likeCount: response.data.like
                              ? (v.likeCount || 0) + 1
                              : Math.max((v.likeCount || 1) - 1, 0)
                      }
                    : v
            )
        )

    } catch (error) {
        console.log(error.response?.data || error.message)
    }
}

 async function saveVideo(item) {
    try {
        const response = await axios.post(
            "https://food-reels-150l.onrender.com/api/food/save",
            { foodId: item._id },
            { withCredentials: true }
        )

        setVideos(prev =>
            prev.map(v =>
                v._id === item._id
                    ? {
                          ...v,
                          isSaved: response.data.save,
                          savesCount: response.data.save
                              ? (v.savesCount || 0) + 1
                              : Math.max((v.savesCount || 1) - 1, 0)
                      }
                    : v
            )
        )

    } catch (error) {
        console.log(error.response?.data || error.message)
    }
}

    return (
        <ReelFeed
            items={videos}
            onLike={likeVideo}
            onSave={saveVideo}
            emptyMessage="No videos available."
        />
    )
}

export default Home