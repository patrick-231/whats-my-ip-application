import axios from "axios";
import { useEffect, useState } from "react";
import Map from "./Map";
import UserCountry from "./UserCountry";

function UserIP() {
  const [ip, setIp] = useState("");
  const [countryCode, setCountryCode] = useState("");

  const instance = axios.create({
    baseURL: "https://geo.ipify.org/api/v2",
    params: {
      apiKey: import.meta.env.VITE_API_KEY,
    },
  });

  useEffect(() => {
    instance.get("/country,city", {
      params: {
        ipAddress: "",
      },
    })
     .then(({ data }) => {
        setIp(data.ip);
        setCountryCode(data.location.country);
      })
     .catch((error) => {
        console.log(error);
      })
     .finally(() => {
        // Cleanup function
      });
  }, []);

  return (
    <>
      <div className="hero">
        <h1>What is your IP Address and Location?</h1>
        <h2>Your IP address is: {ip}</h2>
        {countryCode && <UserCountry countryCode={countryCode} />}
      </div>
      <div id="map">
        <h2>Map Location</h2>
        <Map position={[48.8414, 12.9572]} />
      </div>
    </>
  );
}

export default UserIP;