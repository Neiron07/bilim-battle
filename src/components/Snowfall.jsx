import React, { useEffect, useState } from 'react';
import './../assets/styles/Snowfall.scss';

const Snowfall = () => {
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    const createSnowflake = () => {
      const size = Math.random() * 3 + 1;
      const left = Math.random() * window.innerWidth;
      const animationDuration = Math.random() * 3 + 2;

      return {
        size,
        left,
        animationDuration,
      };
    };

    const snowflakeArray = [...Array(50)].map((_, index) => createSnowflake());
    setSnowflakes(snowflakeArray);

    const updateSnowflakes = () => {
      setSnowflakes((prevSnowflakes) =>
        prevSnowflakes.map((flake) => ({
          ...flake,
          top: flake.top + 1,
        }))
      );
    };

    const snowfallInterval = setInterval(updateSnowflakes, 50);

    return () => clearInterval(snowfallInterval);
  }, []);

  return (
    <div className="snowfall-container">
      {snowflakes.map((flake, index) => (
        <div
          key={index}
          className="snowflake"
          style={{
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            left: `${flake.left}px`,
            animationDuration: `${flake.animationDuration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Snowfall;
