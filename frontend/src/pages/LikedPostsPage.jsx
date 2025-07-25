import React, { useEffect, useState } from "react";
import "../style/photos/likedPhotoPage.css";
import LikeService from "../service/like";
import { useSelector } from "react-redux";
import PhotoContainer from "../components/Photos/PhotoContainer";

export default function LikedPostsPage() {
  const [likedPhotos, setLikedPhotos] = useState([]);
  const { accessToken } = useSelector((state) => state.auth);

  const fetchPhotos = async () => {
    try {
      const response = await LikeService.getLikedPhotos(
        accessToken.accessToken
      );
      setLikedPhotos(response.data);
    } catch (error) {
      console.error("Error fetching liked photos:", error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);
  return (
    <section className="liked-photos-page">
      <h2>Liked Posts</h2>
      <section className="rendered-liked-photos">
        {likedPhotos.map((photo) => (
          <React.Fragment key={photo._id}>
            <PhotoContainer photo={photo?.photo} />
          </React.Fragment>
        ))}
      </section>
    </section>
  );
}
