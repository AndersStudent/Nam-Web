import React, { useEffect, useState, useRef } from "react";
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
  ];

  const gifs = [
    'src/assets/gif1.gif',
    'src/assets/ZippyTube.gif',
    'src/assets/FiatMultipla.gif',
    'src/assets/RetroToy.gif'
  ];

   const [showAdPopup, setShowAdPopup] = useState(false);
   const [adCountdown, setAdCountdown] = useState(5); // 5 second timer
   const [canCloseAd, setCanCloseAd] = useState(false);


  const [currentGif, setCurrentGif] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [fade, setFade] = useState(true);

  const leftGifRef = useRef(null);
  const rightGifRef = useRef(null);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");



  // 👇 Handles GIF changes
  useEffect(() => {
    const gifInterval = setInterval(() => {
      setCurrentGif(prev => (prev + 1) % gifs.length);
    }, 20000); // every 5 seconds

    return () => clearInterval(gifInterval);
  }, []);

  // 👇 Handles image slideshow with fade
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setCurrentImage((prevImage) =>
          prevImage === images.length - 1 ? 0 : prevImage + 1
        );
        setFade(true);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Handles the pop-up ad :)
  useEffect(() => {
    if (!showAdPopup) return;
  
    setAdCountdown(5);
    setCanCloseAd(false);
  
    const timer = setInterval(() => {
      setAdCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanCloseAd(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  
    return () => clearInterval(timer);
  }, [showAdPopup]);

  return (
    <div className="pageContainer">
      {/* Left Ad */}
      <div className="adContainer adLeft">
        <img
          ref={leftGifRef}
          src={gifs[currentGif]}
          alt="Slideshow GIF Left"
          className="adImage"
        />
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
        <div className="parentcontainer nameContainer">
          <label htmlFor="myName">Your FeedingBuzz name:</label>
            <input 
              className="nameInputField" 
              name="myName" 
              type="text" 
              placeholder="Type your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && (<p className="errorText">{nameError}</p>)}
            </div>

        <h3 className="parentcontainer">
        <button className="button1Class" 
          onClick={() => {
            if (name.trim() === "") {
              setNameError("Please enter a name before starting the quiz.");
            } else {setNameError(""); setShowAdPopup(true); }}}
        >
          Start Quiz
        </button>

          <button className="button1Class" onClick={() => navigate("/leaderboard")}>
            Leaderboard
          </button>
        </h3>
      </div>

      {/* Right Ad */}
      <div className="adContainer adRight">
        <img
          ref={rightGifRef}
          src={gifs[currentGif]}
          alt="Slideshow GIF Right"
          className="adImage"
        />
      </div>
      {showAdPopup && (
        <div className="popupOverlay">
          <div className="popupVideoWrapper">
          <div className="adCloseWrapper">
            <button
              className="exitAdButton"
              onClick={() => navigate("/quiz")}
              disabled={!canCloseAd}
              aria-label="Close ad"
            >
              &times;
            </button>
            <span className="countdownText">
              {canCloseAd ? "Close ad" : `Close ad in ${adCountdown}`}
            </span>
          </div>
            <img src={'src/assets/CarAd.gif'} alt="Ad" className="popupAdGifOnly" />
          </div>
        </div>
      )}

    </div>
  );
}
