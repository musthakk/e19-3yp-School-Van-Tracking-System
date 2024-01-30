import React, { useEffect, useState, useRef, memo } from "react";
import { Route } from "react-router-dom";
//import { gettVehicleSnap } from "../services/snapService";
import { gettingPickupaddresses } from "../services/busService";
import { triggerSnap } from "../services/snapService";
import io from "socket.io-client";
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
  Marker,
} from "@vis.gl/react-google-maps";

const SocketClient = (props) => {
  const { bus } = props.location.state || {}; // Add default value for destructuring
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Replace 'http://localhost:3001' with the URL where your Socket.IO server is running
    const socket = io("http://13.51.79.199:3001");

    // Event handler for receiving messages from the server
    socket.on(bus?.ThingName, (message) => {
      //console.log("Received message from server:", message);
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
    //console.log("Current messages state:", messages);
  }, [messages]);

  //export default function LocationTracking() {
  const cent = { lat: 7.291418, lng: 80.636696 };

  return (
    <>
      <div
        style={{
          height: "80vh",

          marginLeft: "30px",
          marginRight: "30px",
        }}
      >
        <APIProvider apiKey="AIzaSyD3iZ52fsbEPy64MJPTVxJLlePde16xAMc">
          <Map
            center={cent}
            zoom={12}
            mapId="5e1c67490bdc79a3"
            fullscreenControl={false}
            //provideRouteAlternatives={true}
          >
            {messages.map((message, index) => (
              <DynamicMarker
                key={index}
                position={{ lat: message?.latitude, lng: message?.longitude }}
              />
            ))}
            {/* <AnimatedMarker positions={messages} /> */}
            <div
              className="card"
              style={{
                margin: "30px",
                marginTop: "60px",
                marginLeft: "10px",
                cornerRadius: "0",
                padding: "15px",
                borderRadius: "0px",
                height: "60px",
                width: "300px",
                border: "none",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#ffffff",
                transition: "transform 0.2s, background-color 0.2s",
                fontWeight: "bold",
              }}
            >
              <h1 style={{ fontSize: "20px" }}>
                Current Speed:{" "}
                <p1>{messages[messages.length - 1]?.speed} m/s</p1>
              </h1>
            </div>
          </Map>
          <div>
            <Directions endAddress={bus?.SchoolAddress} bus={bus} />
          </div>
        </APIProvider>
      </div>

      {/* <div className="card" style={{ width: "200px" }}>
        <h1>Directions</h1>
        <p1>Distance: {Directions(bus?.SchoolAddress)?.[0]}</p1>
        <p1>Duration: {Directions(bus?.SchoolAddress)?.[1]}</p1>
      </div> */}

      <div
        className="card"
        style={{
          margin: "30px",
          marginTop: "30px",
          padding: "15px",
          borderRadius: "10px",
          height: "155px",
          width: "350px",
          border: "none",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffff",
          transition: "transform 0.2s, background-color 0.2s",
          fontWeight: "bold",
        }}
      >
        <h1>POSITION</h1>
        <p1>Position X: {messages[messages.length - 1]?.angularX}</p1>
        <p1>Position Y: {messages[messages.length - 1]?.angularY}</p1>
        <p1>Position Z: {messages[messages.length - 1]?.angularZ}</p1>
      </div>

      <button
        type="button"
        class="btn btn-warning"
        onClick={() => triggerSnap({ thingName: bus?.ThingName })}
        style={{ marginLeft: "30px", marginTop: "0px", width: "150px" }}
      >
        Snap
      </button>
      <Route
        to="/vehicleSnap"
        render={(props) => (
          <a
            href="/vehicleSnap"
            className="btn btn-warning"
            onClick={() => props.history.push("/vehicleSnap", { bus })}
            style={{ marginLeft: "30px", marginTop: "0px", width: "150px" }}
          >
            See Last Snap
          </a>
        )}
      />
      <div>
        <h1>Received AWS IoT Messages:</h1>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{JSON.stringify(message)}</li>
          ))}
        </ul>
      </div>
    </>
  );
};
//};

function Directions({ endAddress, bus }) {
  const map = useMap();
  let distance = 0;
  let duration = 0;
  const [waypoints, setWaypoints] = useState([]);
  const routesLibrary = useMapsLibrary("routes");
  const [directionService, setDirectionService] = useState();
  const [directionsRenderer, setDirectionsRenderer] = useState();
  const [routes, setRoutes] = useState([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];
  //const pickUpAddresses = gettingPickupaddresses({ vehicleID: bus?.vehicleID });
  //console.log("Selected legs are", selected?.legs);
  console.log("Routes are", routes);

  useEffect(() => {
    if (!map || !routesLibrary) return;
    setDirectionService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [map, routesLibrary]);

  useEffect(() => {
    // Fetch pickup addresses when the component mounts or when bus.vehicleID changes
    gettingPickupaddresses({ vehicleID: bus?.vehicleID })
      .then((addresses) => {
        console.log("pickup addresses are", addresses);
        const waypoints = addresses?.data.gettingPickupAddress.map(
          (address) => ({
            location: address.pickupAddress,
            stopover: true,
          })
        );
        setWaypoints(waypoints);
        //console.log("waypoints are", waypoints);
      })
      .catch((error) => {
        console.error("Error fetching pickup addresses:", error);
      });
  }, [bus?.vehicleID]);

  useEffect(() => {
    if (!directionService || !directionsRenderer) return;

    const start = {
      location:
        "University of Peradeniya, Prof. E. O. E. Pereira Mawatha, Kandy",
      stopover: true,
    };
    const end = { location: endAddress, stopover: true };

    // //{ location: "31, Colombo Road, Piliyandala 10300", stopover: true }, // Origin
    // {
    //   location: "Kingswood College, Randles Hill, Peradeniya Rd, Kandy 20000",
    //   stopover: true,
    // }, // Second destination
    // {
    //   location: "Sangaraja Mawatha, Kandy",
    //   stopover: true,
    // }, // Second destination
    // { location: "DS Senanayake Veediya, Kandy 20000", stopover: true },
    // //{ location: "Maradana Rd, Colombo 01000", stopover: true }, // First destination
    // // Add more waypoints with stopover: true for each
    // let waypoints = [];

    // for (let i = 0; i < pickUpAddresses?.length; i++) {
    //   waypoints[i] = {
    //     location: pickUpAddresses[i]?.pickupAddress,
    //     stopover: true,
    //   };
    // }

    console.log("waypoints are", waypoints);

    directionService
      .route({
        origin: start.location,
        destination: end.location,
        waypoints: waypoints.map((waypoint) => ({
          location: waypoint.location,
          stopover: waypoint.stopover,
        })), // Exclude origin and destination from waypoints array
        travelMode: "DRIVING",
        //provideRouteAlternatives: true,
        optimizeWaypoints: true,
      })
      .then((Response) => {
        directionsRenderer.setDirections(Response);
        //console.log("response is", Response);
        setRoutes(Response.routes);
      });
  }, [directionService, directionsRenderer, endAddress, waypoints]);

  //console.log("directionService", directionService);
  //console.log("selected route is", routes.selected);

  if (!leg) return null;

  {
    selected?.legs.map((leg) => (distance += leg.distance.value));
  }

  {
    selected?.legs.map((leg) => (duration += leg.duration.value));
  }

  const formattedDistance = (distance / 1000).toFixed(1);
  const formattedDuration = (duration / 60).toFixed(0);

  return (
    <div
      className="card"
      style={{
        margin: "30px",
        marginTop: "30px",
        marginLeft: "390px",
        marginRight: "30px",
        padding: "15px",
        borderRadius: "10px",
        height: "155px",
        width: "875px",
        border: "none",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#ffffff",
        transition: "transform 0.2s, background-color 0.2s",
        fontWeight: "bold",
        color: "#000000",
      }}
    >
      <h1>Directions</h1>
      <p1>Distance: {formattedDistance} KM</p1>
      <p1>Duration: {formattedDuration} mins</p1>
    </div>
  );

  //return [leg.distance.text, leg.duration.text];
}

// const DynamicMarker = ({ position }) => {
//   const map = useMap();
//   const markerRef = useRef(null);

//   useEffect(() => {
//     if (!map || !position) return;

//     // Create marker if it doesn't exist
//     if (!markerRef.current) {
//       markerRef.current = new window.google.maps.Marker({
//         position,
//         map,
//       });
//     } else {
//       // Update marker position if it exists
//       markerRef.current.setPosition(position);
//     }

//     return () => {
//       // Cleanup marker on unmount
//       markerRef.current.setMap(null);
//     };
//   }, [map, position]);

//   return null; // No need to render anything for the marker
// };

// const DynamicMarker = memo(({ position }) => {
//   // Memoize the DynamicMarker component
//   const map = useMap();
//   const markerRef = useRef(null);

//   useEffect(() => {
//     if (!map || !position) return;

//     // Create marker if it doesn't exist or update position
//     if (!markerRef.current) {
//       markerRef.current = new window.google.maps.Marker({
//         position,
//         map,
//       });
//     } else {
//       markerRef.current.setPosition(position);
//     }

//     return () => {
//       // Cleanup marker on unmount
//       markerRef.current.setMap(null);
//     };
//   }, [map, position]); // Only re-run effect if map or position changes

//   return null; // No need to render anything for the marker
// });

const DynamicMarker = memo(({ position }) => {
  const map = useMap();
  const markerRef = useRef(null);

  useEffect(() => {
    if (!map || !position) return;

    if (!markerRef.current) {
      markerRef.current = new window.google.maps.Marker({
        position,
        map,
      });
    } else {
      // Animate marker to new position
      animateMarker(markerRef.current, position);
    }

    return () => {
      markerRef.current.setMap(null);
    };
  }, [map, position]);

  const animateMarker = (marker, newPosition) => {
    const start = marker.getPosition();
    const end = new window.google.maps.LatLng(newPosition.lat, newPosition.lng);
    let t = 0;
    const duration = 1000; // Animation duration in milliseconds

    const animate = () => {
      if (t < duration) {
        const lat = start.lat() + ((end.lat() - start.lat()) * t) / duration;
        const lng = start.lng() + ((end.lng() - start.lng()) * t) / duration;
        const newPos = new window.google.maps.LatLng(lat, lng);
        marker.setPosition(newPos);
        t += 16; // 60 frames per second
        requestAnimationFrame(animate);
      } else {
        marker.setPosition(end);
      }
    };

    animate();
  };

  return null;
});

// const AnimatedMarker = ({ positions }) => {
//   const map = useMap();
//   const markerRef = useRef(null);

//   useEffect(() => {
//     if (!map || !positions || positions.length === 0) return;

//     const lat = positions[positions.length - 1].latitude;
//     const lng = positions[positions.length - 1].longitude;
//     const lastPosition = { lat, lng };
//     if (!markerRef.current) {
//       markerRef.current = new window.L.Marker(lastPosition).addTo(map);
//     } else {
//       animateMarker(markerRef?.current, lastPosition);
//     }

//     return () => {
//       markerRef.current.remove();
//     };
//   }, [map, positions]);

//   const animateMarker = (marker, newPosition) => {
//     const start = marker.getLatLng();
//     const end = new window.L.LatLng(newPosition.lat, newPosition.lng);
//     let t = 0;
//     const duration = 1000; // Animation duration in milliseconds

//     const animate = () => {
//       if (t < duration) {
//         const lat = start.lat + ((end.lat - start.lat) * t) / duration;
//         const lng = start.lng + ((end.lng - start.lng) * t) / duration;
//         const newPos = new window.L.LatLng(lat, lng);
//         marker.setLatLng(newPos);
//         t += 16; // 60 frames per second
//         requestAnimationFrame(animate);
//       } else {
//         marker.setLatLng(end);
//       }
//     };

//     animate();
//   };

//   return null;
// };

export default SocketClient;
