import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Input from './Input';
import Sunrise from './Sunrise';
import Rain from './Rain';
import Snowfal from './Snowfal';
import { CiSearch } from "react-icons/ci";
import { FaCloudRain, FaSnowman, FaCloudSun, FaTemperatureHalf } from "react-icons/fa6";
import { IoWater } from "react-icons/io5";
import { api } from '../componets/newapi';
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Bg from './Bg';

function Home() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());
  const [climate, setClimate] = useState(false);
  const [minusdegree, setMinusdegree] = useState(false);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async () => {
    setMinusdegree(false);
    setClimate(false);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`
      );

      const temperatureInKelvin = response.data.main.temp;
      const temperatureInCelsius = (temperatureInKelvin - 273.15).toFixed(2);

      setWeatherData({
        country_code: response.data.name,
        coordinate: `${response.data.coord.lon}, ${response.data.coord.lat}`,
        temp: `${temperatureInCelsius} °C`,
        minTemp: `${(response.data.main.temp_min - 273.15).toFixed(2)} °C`,
        maxTemp: `${(response.data.main.temp_max - 273.15).toFixed(2)} °C`,
        pressure: response.data.main.pressure,
        humidity: response.data.main.humidity,
        visibility: response.data.visibility,
        speed: response.data.wind.speed,
        main: response.data.weather[0].main,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
      });

      if (response.data.weather[0].description === "light rain") {
        setClimate(true);
      }

      if (temperatureInCelsius < 0) {
        setMinusdegree(true);
      }
    } catch (error) {
      toast.error('Please enter a valid city name');
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    // Update the current time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const fetchCity = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=calicut&units=metric&appid=${api}`
        );
        setWeatherData({
          country_code: response.data.name,
          coordinate: `${response.data.coord.lon}, ${response.data.coord.lat}`,
          temp: `${response.data.main.temp} °C`,
          minTemp: `${response.data.main.temp_min} °`,
          maxTemp: `${response.data.main.temp_max} °`,
          pressure: response.data.main.pressure,
          humidity: response.data.main.humidity,
          visibility: response.data.visibility,
          speed: response.data.wind.speed,
          main: response.data.weather[0].main,
          description: response.data.weather[0].description,
          icon: response.data.weather[0].icon,
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchCity();

    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ top: 0, left: '50%', transform: 'translateX(-50%)' }}
      />

      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#f2f5eb] w-96 rounded-md'>
        <div className=''>
          <div className='flex justify-center items-center'>
            <h1 className='p-2 text-2xl font-sans font-bold'>Check Weather</h1>
          </div>
          <div className='flex justify-center items-center relative'>
            <input
              type="text"
              placeholder="Enter location..."
              className="p-2 mt-2 w-full"
              value={city}
              onChange={handleCityChange}
            />

            <button className="bg-blue-500 p-2.5 text-white mt-2" onClick={handleSubmit}>
              <CiSearch size={20} />
            </button>
          </div>
        </div>

        <div className="mt-4 p-2">
          <div className="flex mb-4 rounded-md">
            <div className="w-1/2 bg-[#5ad6fcc5] h-16 rounded-l-lg flex justify-center items-center mb-2 text-xl">
              {weatherData.country_code ? weatherData.country_code : "KOZHIKODE"}
            </div>
            <div className="w-1/2 bg-[#5ad6fc95] h-16 flex justify-center items-center rounded-r-lg">
              {climate && <FaCloudRain color='white' size={40} />}
              {minusdegree && <FaSnowman color='white' size={40} />}
              {!climate && !minusdegree && <FaCloudSun color='white' size={40} />}
            </div>
          </div>
          <p className='bg-[#e6f1c9] flex justify-center items-center mb-2 text-xl'>Temperature :  {weatherData.temp}<FaTemperatureHalf size={20} /> </p>
          <p className='bg-[#e6f1c9] flex justify-center items-center mb-2 text-xl'>Humidity : {weatherData.humidity}%<IoWater /></p>
          <p className='bg-[#e6f1c9] flex justify-center items-center mb-2 text-xl'>Visibility : {weatherData.visibility} mi</p>
          <p className='bg-[#e6f1c9] flex justify-center items-center mb-2 ml text-xl'>Wind Speed : {weatherData.speed} km/h</p>
          <p className='bg-[#e6f1c9] flex justify-center items-center mb-2 text-xl'>Description :  {weatherData.description} </p>
        </div>
      </div>

      {climate && <Rain />}
      {minusdegree && <Snowfal />}
      {!climate && !minusdegree && <Bg />}
    </div>
  );
}

export default Home;
