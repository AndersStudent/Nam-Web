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

  const gifs = [
    'src/assets/gif1.gif',
    'src/assets/gif11.gif'
  ]

  let currentIndex = 0;
const imgElement = document.getElementById('slideshow');

setInterval(() => {
  currentIndex = (currentIndex + 1) % gifs.length;  // Loop back to 0
  imgElement.src = gifs[currentIndex];
}, 3000);


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
    <img id="slideshow" src="gif1.gif" alt="Slideshow Image" width="400" className="adImage"/>

  </div>

  {/* Main Content */}
  <div className="divclass">
    <title>FeedBuzzing</title>
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
      <button className="button1Class" onClick={() => navigate("/leaderboard")}>
        Leaderboard
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
