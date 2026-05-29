import React, {
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';

import axios from 'axios';
import '../../styles/create-food.css';
import { useNavigate } from 'react-router-dom';

const CreateFood = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [videoURL, setVideoURL] = useState('');
    const [fileError, setFileError] = useState('');
    const fileInputRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (!videoFile) {
            setVideoURL('');
            return;
        }

        const url = URL.createObjectURL(videoFile);
        setVideoURL(url);

        return () => URL.revokeObjectURL(url);
    }, [videoFile]);

    const onFileChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) {
            setVideoFile(null);
            setFileError('');
            return;
        }

        if (!file.type.startsWith('video/')) {
            setFileError(
                'Please select a valid video file.'
            );
            return;
        }

        setFileError('');
        setVideoFile(file);
    };

    const openFileDialog = () => {
        fileInputRef.current?.click();
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const token =
                localStorage.getItem("token");

            if (!token) {
                alert("Please login first");
                return;
            }

            const formData = new FormData();

            formData.append("name", name);
            formData.append(
                "description",
                description
            );
            formData.append(
                "video",
                videoFile
            );

            const response = await axios.post(
                "https://food-reels-150l.onrender.com/api/food",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type":
                            "multipart/form-data"
                    }
                }
            );

            console.log(response.data);

            alert("Food uploaded successfully");

            navigate("/partner-profile");

        } catch (error) {
            console.log(
                error.response?.data ||
                error.message
            );

            alert(
                error.response?.data?.message ||
                "Upload failed"
            );
        }
    };

    const isDisabled = useMemo(
        () => !name.trim() || !videoFile,
        [name, videoFile]
    );

    return (
        <div className="create-food-page">
            <div className="create-food-card">
                <h1>Create Food</h1>

                <form onSubmit={onSubmit}>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="video/*"
                        onChange={onFileChange}
                        hidden
                    />

                    <button
                        type="button"
                        onClick={openFileDialog}
                    >
                        Select Video
                    </button>

                    {fileError && <p>{fileError}</p>}

                    {videoURL && (
                        <video
                            src={videoURL}
                            controls
                            width="300"
                        />
                    )}

                    <input
                        type="text"
                        placeholder="Food Name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />

                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) =>
                            setDescription(
                                e.target.value
                            )
                        }
                    />

                    <button
                        type="submit"
                        disabled={isDisabled}
                    >
                        Upload Food
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateFood;