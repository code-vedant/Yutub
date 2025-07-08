import { useCallback, useEffect, useState } from "react";
import PhotoService from "../service/photo";
import "../style/photopage.css";
import PhotoContainer from "../components/Photos/PhotoContainer";
import FilterComponent from "../components/VideoComponents/FilterComponent";

export default function PhotoPage() {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // const accessToken = useSelector((state) => state.auth.accessToken);

  const [filters, setFilters] = useState({
    query: "",
    sortBy: "createdAt",
    sortType: "desc",
    page: 1,
  });

  const fetchPhotos = useCallback(async () => {
    console.log("aaaaaaaaa");
    
    setIsLoading(true);
    setError(null);
    try {
      const res = await PhotoService.getAllPhotos(filters);

      setPhotos(res.data.docs);
    } catch (error) {
      console.error(
        "Error fetching photos:",
        error.response?.data?.message || error.message
      );
      setError((prev) => ({ ...prev, photos: error.message }));
    }finally{
      setIsLoading(false);
    }
  },[]);

  useEffect(()=>{
    fetchPhotos()
  },[fetchPhotos, filters]);

  return (
    <section className="photo_page">
            <FilterComponent type={"Photos"} filters={filters} setFilters={setFilters} />
      <div className="photo_render_area">
        {photos.length > 0 && photos.map((photo) => (
          <PhotoContainer key={photo._id} photo={photo} isLoading={isLoading} error={error} />
        ))}
      </div>
    </section>
  );
}
