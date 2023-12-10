const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors middleware
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://127.0.0.1:27017/schoolVanTrackingSystem";

// Use the cors middleware
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (error) => {
  console.error("Error connecting to MongoDB:", error);
});

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Mongoose schemas and models for users, drivers, and vehicles
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  email: String,
  nic: String,
  numberOfChildren: Number,
  children: [
    {
      name: String,
      pickupLocation: String,
      destinationPoint: String,
    },
  ],
});

const driverSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  email: String,
  nic: String,
  licenseNumber: String,
  assignedVehicleId: mongoose.Types.ObjectId,
});

const vehicleSchema = new mongoose.Schema({
  vehicleNumber: String,
  maxCapacity: Number,
  assignedRoute: [String],
  driverNIC: String, // Updated to use NIC instead of ObjectId
  assignedPassengers: [String],
});

const User = mongoose.model("users", userSchema);
const Driver = mongoose.model("drivers", driverSchema);
const Vehicle = mongoose.model("vehicles", vehicleSchema);

// Endpoint to fetch users
app.get("/users", async (req, res, next) => {
  try {
    const users = await User.find();
    console.log("Retrieved Users:", users);
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
    next(error);
  }
});

// Endpoint to fetch drivers
app.get("/drivers", async (req, res, next) => {
  try {
    const drivers = await Driver.find();
    console.log("Retrieved Drivers:", drivers);
    res.json({ drivers });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
    next(error);
  }
});

// Endpoint to fetch vehicles
app.get("/vehicles", async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find();
    console.log("Retrieved Vehicles:", vehicles);
    res.json({ vehicles });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
    next(error);
  }
});

app.post("/adddriver", async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      nic,
      licenseNumber,
      assignedVehicleId, // Assuming this is the vehicle number
    } = req.body;

    let assignedVehicleObjectId = null;

    // Check if assignedVehicleId is provided
    if (assignedVehicleId) {
      // Perform a lookup to find the corresponding vehicle ObjectId
      // This assumes that you have a "vehicles" collection with a unique "vehicleNumber" field
      const vehicle = await Vehicle.findOne({
        vehicleNumber: assignedVehicleId,
      });

      // If the vehicle is found, assign its ObjectId
      if (vehicle) {
        assignedVehicleObjectId = vehicle._id;
      } else {
        // Handle the case where the vehicle is not found
        return res.status(400).json({ error: "Vehicle not found" });
      }
    }

    // Create a new driver with the assignedVehicleId
    const newDriver = new Driver({
      firstName,
      lastName,
      phoneNumber,
      email,
      nic,
      licenseNumber,
      assignedVehicleId: assignedVehicleObjectId,
    });

    // Save the new driver to the database
    const savedDriver = await newDriver.save();

    res.json(savedDriver);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
    next(error);
  }
});

app.get("/vehicles/:vehicleNumber", async (req, res, next) => {
  try {
    const { vehicleNumber } = req.params;
    const vehicle = await Vehicle.findOne({ vehicleNumber });

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    // Include assignedRoute and assignedPassengers in the response
    res.json({
      vehicle: {
        vehicleNumber: vehicle.vehicleNumber,
        maxCapacity: vehicle.maxCapacity,
        assignedRoute: vehicle.assignedRoute || [], // Use an empty array if undefined
        driverId: vehicle.driverId,
        assignedPassengers: vehicle.assignedPassengers || [], // Use an empty array if undefined
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
});

// Define the Vehicle schema

app.put("/vehicles/:vehicleNumber", async (req, res, next) => {
  const vehicleNumber = req.params.vehicleNumber;
  const { newCapacity, newRoute, newDriverNIC, newPassengers } = req.body;

  try {
    const vehicle = await Vehicle.findOne({ vehicleNumber });

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    // Update the vehicle properties
    if (newCapacity !== undefined) {
      vehicle.maxCapacity = newCapacity;
    }
    if (newRoute !== undefined) {
      vehicle.assignedRoute = newRoute;
    }
    if (newDriverNIC !== undefined) {
      vehicle.driverNIC = newDriverNIC;
    }
    if (newPassengers !== undefined) {
      // Assuming newPassengers is an array
      vehicle.assignedPassengers = newPassengers;
    }

    // Save the updated vehicle
    await vehicle.save();

    res.json({ message: "Vehicle updated successfully", vehicle });
  } catch (error) {
    console.error("Error updating vehicle:", error);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
});
// Validation functions
function isValidDriverId(driverId) {
  // Implement your validation logic for driverId
  // Example: Check if it's a string and has a specific format
  return typeof driverId === "string" && /^[a-zA-Z0-9]+$/.test(driverId);
}

function isValidPassengers(passengers) {
  // Implement your validation logic for passengers
  // Example: Check if it's an array and each element has a specific format
  return (
    Array.isArray(passengers) &&
    passengers.every(
      (passenger) =>
        typeof passenger === "string" && /^[a-zA-Z]+$/.test(passenger)
    )
  );
}

// Close MongoDB connection on process termination
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed");
    process.exit(0);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
