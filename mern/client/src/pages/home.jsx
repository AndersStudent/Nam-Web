import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import './home.css';

export default function HomePage() {
  const navigate = useNavigate();

  const images = [
    'src/assets/image1.png',
    'src/assets/image2.jpg',
    'src/assets/image3.jpg',
    'src/assets/image4.png',
    'src/assets/image5.jpg',
  ]

  const [currentImage, setCurrentImage] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // start fade out
  
      setTimeout(() => {
        setCurrentImage((prevImage) =>
          prevImage === images.length - 1 ? 0 : prevImage + 1
        );
        setFade(true); // fade in new image
      }, 300); // half second fade out before changing image
  
    }, 4000); // change image every 2 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="pageContainer">
  {/* Left Ad */}
  <div className="adContainer adLeft">
    <img src="src/assets/gif1.gif" alt="Fake Ad" className="adImage" />
  </div>

  {/* Main Content */}
  <div className="divclass">
    <h1 className="h1Class">FeedingBuzz</h1>

    <h2 className="parentcontainer h2Class">
      Take this easy Quiz to find out what Howl's Moving Castle Character you are!
    </h2>

    <div className="imageFadeContainer parentcontainer">
      <img
        src={images[currentImage]}
        alt="Rotating Images"
        className={`fadeImage ${fade ? 'show' : 'hide'}`}
      />
    </div>

    <h3 className="parentcontainer">
      <button className="button1Class" onClick={() => navigate("/quiz")}>
        Start Quiz
      </button>
    </h3>
  </div>

  {/* Right Ad */}
  <div className="adContainer adRight">
    <img src="src/assets/gif1.gif" alt="Fake Ad" className="adImage" />
  </div>

</div>
  );
}
