import React, { useEffect } from 'react';

function Sunrise() {
  useEffect(() => {
    const stars = 40;
    const skyStars = document.getElementById("sky__stars");

    // Generate stars randomly using absolute position
    function createStars() {
      for (let i = 0; i < stars; i++) {
        let x = Math.floor(Math.random() * 100 + 1);
        let y = Math.floor(Math.random() * 100 + 1);
        const starPoint = document.createElement("div");
        starPoint.style.left = `${x}%`;
        starPoint.style.top = `${y}%`;
        starPoint.className = "star";
        skyStars.appendChild(starPoint);
      }
    }

    createStars();
  }, []);

  return (
    <div className="sky">
      <div className="sky__phase sky__dawn"></div>
      <div className="sky__phase sky__noon"></div>
      <div className="sky__phase sky__dusk"></div>
      <div className="sky__phase sky__midnight">
        <div id="sky__stars"></div>
      </div>
      <div className="orbit">
        <div className="sun"></div>
        <div className="moon"></div>
      </div>

      <style>
        {`
          @keyframes sunrise {
            from {
              transform: rotate(-45deg);
            }

            to {
              transform: rotate(315deg);
            }
          }

          @keyframes moonrise {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(180deg);
            }
          }

          @keyframes dawn {
            0% {
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            60% {
              opacity: 0;
            }
          }

          @keyframes noon {
            0% {
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            75% {
              opacity: 0;
            }
          }

          @keyframes dusk {
            0% {
              opacity: 0;
            }
            50% {
              opacity: 0;
            }
            70% {
              opacity: 1;
            }
            90% {
              opacity: 0;
            }
          }

          @keyframes midnight {
            0% {
              opacity: 1;
            }
            25% {
              opacity: 0;
            }
            50% {
              opacity: 0;
            }
            80% {
              opacity: 1;
            }
          }

          body {
            --animation-speed: 24s;
            margin: 0; /* Remove default margin */
            overflow: hidden; /* Hide any overflow */
          }

          body.pause {
            --animation-speed: 0;
          }

          .sky {
            width: 100vw;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            overflow: hidden;
          }

          .sky__phase {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            transition: opacity 0.2s;
          }

          .sky__dawn {
            background: linear-gradient(
              0deg,
              rgba(254, 215, 102, 1) 0%,
              rgba(205, 237, 246, 1) 100%
            );
            animation: linear dawn infinite var(--animation-speed);
          }

          .sky__noon {
            background: linear-gradient(
              0deg,
              rgba(205, 237, 246, 1) 0%,
              rgba(36, 123, 160, 1) 100%
            );
            animation: linear noon infinite var(--animation-speed);
          }

          .sky__dusk {
            background: linear-gradient(
              0deg,
              rgba(255, 32, 110, 1) 0%,
              rgba(10, 0, 94, 1) 100%
            );
            animation: linear dusk infinite var(--animation-speed);
          }

          .sky__midnight {
            background: linear-gradient(
              0deg,
              rgba(2, 0, 20, 1) 0%,
              rgba(10, 0, 94, 1) 100%
            );
            animation: linear midnight infinite var(--animation-speed);
          }

          .orbit {
            position: relative;
            width: 100vw;
            height: 100vh;
            margin: 0 auto;
            transform: rotate(-45deg);
            animation: linear sunrise infinite var(--animation-speed);
          }

          @media (min-width: 768px) {
            .orbit {
              width: 700px;
              height: 700px;
              margin: 0 auto; /* Center horizontally */
            }
          }

          @media (min-width: 940px) {
            .orbit {
              width: 800px;
              height: 800px;
            }
          }

          @media (min-width: 1200px) {
            body {
              --animation-speed: 28s;
            }
            .orbit {
              width: 1000px;
              height: 1000px;
              margin: 0 auto; /* Center horizontally */
            }
          }

          @media (min-width: 1500px) {
            body {
              --animation-speed: 30s;
            }
            .orbit {
              width: 1300px;
              height: 1300px;
            }
          }

          .sun {
            position: absolute;
            top: -40px;
            left: -40px;
            width: 80px;
            height: 80px;
            background-color: rgb(254, 215, 102);
            border-radius: 50%;
            box-shadow: 0 0 14px 14px rgba(254, 215, 102, 0.2);
          }

          .moon {
            position: absolute;
            bottom: -40px;
            right: -40px;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background-color: #fff;
            box-shadow: 0 0 7px 7px rgba(255, 255, 255, 0.2);
          }

          #sky__stars > div {
            width: 3px;
            height: 3px;
            background-color: #fff;
            border-radius: 50%;
            position: absolute;
          }
        `}
      </style>
    </div>
  );
}

export default Sunrise;
