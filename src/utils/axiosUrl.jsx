import axios from 'axios';
import { IP_Api, Weather_Api } from './constants';

// Base configuration for APIs
export const axiosInstance = axios.create({
    baseURL: '/api',
});

// Fetch IP address
export const fetchIp = async () => {
    const response = await axios.get('https://api.ipify.org?format=json');
    return response.data.ip;
};

// Fetch location using IP (ipgeolocation.io)
export const fetchLocation = async (ip) => {
    const response = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${IP_Api}&ip=${ip}`);
    return response.data;
};

// Fetch weather using city and country
export const fetchWeather = async (city, countryCode) => {
    const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${Weather_Api}&units=metric`
    );
    return response.data;
};