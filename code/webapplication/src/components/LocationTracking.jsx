import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";

const SocketClient = (props) => {
  const { bus } = props.location.state || {}; // Add default value for destructuring
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Replace 'http://localhost:3001' with the URL where your Socket.IO server is running
    const socket = io("http://13.51.79.199:3001");

    // Event handler for receiving messages from the server
    socket.on(bus?.ThingName, (message) => {
      console.log("Received message from server:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Event handler for connecting to the Socket.IO server
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    // Event handler for potential errors
    socket.on("error", (error) => {
      console.error("Socket.IO error:", error);
      // Handle the error as needed
    });

    // Cleanup on component unmount
    return () => {
      console.log("Disconnecting from Socket.IO server");
      socket.disconnect();
    };
  }, []); // Empty dependency array ensures that the effect runs only once

  // Log the current state of messages whenever it changes
  useEffect(() => {
    console.log("Current messages state:", messages);
  }, [messages]);

  const possition = { lat: 6.801803, lng: 79.922684 };

  return (
    <div style={{ height: "80vh", width: "100%" }}>
      {/* <h1>Received AWS IoT Messages:</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{JSON.stringify(message)}</li>
        ))}
      </ul> */}
      <APIProvider apiKey="AIzaSyD3iZ52fsbEPy64MJPTVxJLlePde16xAMc">
        <Map
          center={possition}
          zoom={12}
          mapId="5e1c67490bdc79a3"
          // fullscreenControl={false}
        ></Map>
      </APIProvider>
    </div>
  );
};

export default SocketClient;
