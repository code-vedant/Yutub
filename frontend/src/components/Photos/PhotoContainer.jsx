import "../../style/photoContainer.css";


export default function PhotoContainer({photo}) {
    console.log("PhotoContainer component is being rendered",photo);
  return (
    <div className="photo-container">
        <img src={photo.photoFile} alt="" />
        <div className="photo-info">
            <h3>{photo.title}</h3>
            <p>{photo.description}</p>
            </div>
    </div>
  )
}
