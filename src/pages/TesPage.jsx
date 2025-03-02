import React, { useState, useEffect } from 'react';
import { FaGlobe, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaCopy, FaCheckCircle } from 'react-icons/fa';
import { fetchIp, fetchLocation, fetchWeather } from './../utils/axiosUrl';

const Footer = () => {
    const [ip, setIp] = useState('');
    const [location, setLocation] = useState({});
    const [weather, setWeather] = useState(null); // Initialize weather as null
    const [dateTime, setDateTime] = useState(new Date());
    const [isCopied, setIsCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const ip = await fetchIp(); // Fetch IP
                setIp(ip);

                const location = await fetchLocation(ip); // Fetch location
                setLocation(location);

                const weather = await fetchWeather(location.city, location.countryCode); // Fetch weather
                setWeather(weather);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false); // Stop loading
            }
        };

        fetchData();
    }, []);

    // Update date and time every second
    useEffect(() => {
        const interval = setInterval(() => {
            setDateTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Copy IP to clipboard
    const copyToClipboard = () => {
        navigator.clipboard.writeText(ip).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
        });
    };

    // Get weather icon URL
    const getWeatherIconUrl = (iconCode) => {
        return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    };

    return (
        <footer className="bg-gray-900 text-white py-8 appbody">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* First Column: IP, Location, Weather */}
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold mb-4 flex items-center justify-center md:justify-start">
                            <FaGlobe className="mr-2 text-blue-400" /> Your Info
                        </h3>
                        <div className="space-y-3">
                            {/* IP Address */}
                            <p className="flex items-center">
                                <FaMapMarkerAlt className="mr-2 text-green-400" /> IP: {ip}
                                <button onClick={copyToClipboard} className="ml-2">
                                    {isCopied ? (
                                        <FaCheckCircle className="text-green-500" />
                                    ) : (
                                        <FaCopy className="text-blue-400 hover:text-blue-300 cursor-pointer" />
                                    )}
                                </button>
                            </p>

                            {/* Location */}
                            <p className="flex items-center">
                                <FaMapMarkerAlt className="mr-2 text-green-400" /> Location: {location.city}, {location.country}
                            </p>

                            {/* Weather */}
                            <div className="flex items-center">
                                {isLoading ? (
                                    <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
                                ) : weather ? (
                                    <>
                                        <img
                                            src={getWeatherIconUrl(weather.weather?.[0]?.icon)}
                                            alt="Weather Icon"
                                            className="w-8 h-8"
                                        />
                                        <p className="ml-2">
                                            {weather.main?.temp}°C, {weather.weather?.[0]?.description}
                                        </p>
                                    </>
                                ) : (
                                    <p className="text-red-500">Weather data unavailable</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Second Column: Empty or Additional Content */}
                    <div className="text-center">
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#home" className="hover:text-blue-400">Home</a></li>
                            <li><a href="#about" className="hover:text-blue-400">About</a></li>
                            <li><a href="#contact" className="hover:text-blue-400">Contact</a></li>
                        </ul>
                    </div>

                    {/* Third Column: Date and Time */}
                    <div className="text-center md:text-right">
                        <h3 className="text-xl font-bold mb-4 flex items-center justify-center md:justify-end">
                            <FaCalendarAlt className="mr-2 text-purple-400" /> Date & Time
                        </h3>
                        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                            <p className="flex items-center justify-center md:justify-end">
                                <FaCalendarAlt className="mr-2 text-purple-400" /> Date: <span className="text-blue-400 ml-1">{dateTime.toLocaleDateString()}</span>
                            </p>
                            <p className="flex items-center justify-center md:justify-end mt-2">
                                <FaClock className="mr-2 text-purple-400" /> Time: <span className="text-blue-400 ml-1">{dateTime.toLocaleTimeString()}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;