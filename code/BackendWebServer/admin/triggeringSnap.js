const express = require("express");
const bodyParser = require("body-parser");
const awsIot = require("aws-iot-device-sdk");
const fs = require("fs");

const triggeringSnap = express.Router(); // Create an instance of express.Router()
triggeringSnap.use(bodyParser.json());

// Configure AWS IoT
const endpoint = "a2acc7p4itkz1x-ats.iot.eu-north-1.amazonaws.com";
const thingName = "ESP32";
const rootCAPath = "./permissions/rootCA.pem";
const privateKeyPath = "./permissions/private.key";
const certificatePath = "./permissions/cert.crt";

// Function to create an AWS IoT device
function createDevice() {
  return awsIot.device({
    clientId: thingName,
    host: endpoint,
    port: 8883,
    keyPath: privateKeyPath,
    certPath: certificatePath,
    caPath: rootCAPath,
  });
}

// Create an AWS IoT device
let device = createDevice();

// Callback function for handling received messages
function onMessage(topic, payload) {
  try {
    if (topic === "esp32/pub") {
      // Handle image messages
      console.log(`Received image on topic ${topic}`);

      // Assuming the payload is a binary image data
      // You may need to implement the logic to save/process the image data
      fs.writeFileSync("received_image.jpg", payload);
    } else {
      // Handle other types of messages
      const messagePayload = JSON.parse(payload.toString());
      console.log(`Received message on topic ${topic}:`, messagePayload);
    }
  } catch (error) {
    console.error(`Error handling message on topic ${topic}:`, error.message);
  }
}

// Connect to AWS IoT
device.on("connect", function () {
  console.log("AWS IoT Connected!");

  // Subscribe to a topic
  const subscribeTopic = "esp32/pub";
  device.subscribe(subscribeTopic, { qos: 1 }, function (err, granted) {
    if (!err) {
      console.log(`Subscribed to topic ${subscribeTopic}`);
    } else {
      console.error("Subscription error:", err);
    }
  });

  // Handle received messages
  device.on("message", onMessage);
});

// API endpoint to publish a message under the topic esp32/sub
triggeringSnap.post("/triggeringSnap", (req, res) => {
  const publishTopic = "esp32/sub";
  const message = { action: "trigger_publish" };
  device.publish(
    publishTopic,
    JSON.stringify(message),
    { qos: 1 },
    function (err) {
      if (!err) {
        console.log(`Published message to topic ${publishTopic}:`, message);
        res
          .status(200)
          .json({ success: true, message: "Message published successfully" });
      } else {
        console.error("Publish error:", err);
        res
          .status(500)
          .json({ success: false, error: "Internal server error" });
      }
    }
  );
});

// Handle disconnect events
device.on("close", function () {
  console.log("Connection closed. Attempting to reconnect...");
  setTimeout(() => {
    device.end();
    device = createDevice(); // Create a new device instance for reconnection
  }, 5000); // 5 seconds delay before attempting to reconnect
});

// Handle errors
device.on("error", function (error) {
  console.error("Error:", error.message);
  if (error.message === "Not authorized") {
    console.error("Check your AWS IoT credentials and permissions.");
  }
});

// Handle SIGINT (Ctrl+C) to disconnect gracefully
process.on("SIGINT", function () {
  console.log("Disconnecting...");
  device.end();
  process.exit();
});

// Additional error handling for unexpected errors
process.on("uncaughtException", function (error) {
  console.error("Uncaught Exception:", error);
  // You may want to perform additional cleanup or logging here
  process.exit(1); // Exit the process with an error code
});

// Additional error handling for unhandled promise rejections
process.on("unhandledRejection", function (reason, promise) {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // You may want to perform additional cleanup or logging here
  process.exit(1); // Exit the process with an error code
});

// Export the Express router and the device instance
module.exports = { triggeringSnap };
