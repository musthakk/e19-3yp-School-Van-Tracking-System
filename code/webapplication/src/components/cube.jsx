//import React from "react";
import { THREE } from "three";

const Cube = () => {
  let scene, camera, renderer, cube;

  function parentWidth(elem) {
    return elem.parentElement.clientWidth;
  }

  function parentHeight(elem) {
    return elem.parentElement.clientHeight;
  }

  function init3D() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    camera = new THREE.PerspectiveCamera(
      75,
      parentWidth(document.getElementById("3Dcube")) /
        parentHeight(document.getElementById("3Dcube")),
      0.1,
      1000
    );

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      parentWidth(document.getElementById("3Dcube")),
      parentHeight(document.getElementById("3Dcube"))
    );

    document.getElementById("3Dcube").appendChild(renderer.domElement);

    // Create a geometry
    const geometry = new THREE.BoxGeometry(5, 1, 4);

    // Materials of each face
    var cubeMaterials = [
      new THREE.MeshBasicMaterial({ color: 0x03045e }),
      new THREE.MeshBasicMaterial({ color: 0x023e8a }),
      new THREE.MeshBasicMaterial({ color: 0x0077b6 }),
      new THREE.MeshBasicMaterial({ color: 0x03045e }),
      new THREE.MeshBasicMaterial({ color: 0x023e8a }),
      new THREE.MeshBasicMaterial({ color: 0x0077b6 }),
    ];

    const material = new THREE.MeshFaceMaterial(cubeMaterials);

    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;
    renderer.render(scene, camera);
  }

  // Resize the 3D object when the browser window changes size
  function onWindowResize() {
    camera.aspect =
      parentWidth(document.getElementById("3Dcube")) /
      parentHeight(document.getElementById("3Dcube"));
    camera.updateProjectionMatrix();
    renderer.setSize(
      parentWidth(document.getElementById("3Dcube")),
      parentHeight(document.getElementById("3Dcube"))
    );
  }

  window.addEventListener("resize", onWindowResize, false);

  // Create the 3D representation
  init3D();

  // Connect to the socket server
  const socket = io.connect("http://13.51.79.199:3001");

  // Listen for gyro data from the socket server
  // Listen for gyro data from the socket server
  // Listen for gyro data from the socket server
  socket.on("SN0013", (data) => {
    console.log("Received data:", data);

    try {
      // Use the received data directly
      const { angularX, angularY, angularZ } = data;

      // Update the HTML content
      document.getElementById("gyroX").innerHTML = angularX;
      document.getElementById("gyroY").innerHTML = angularY;
      document.getElementById("gyroZ").innerHTML = angularZ;

      // Change cube rotation after receiving the readings
      cube.rotation.x = angularY;
      cube.rotation.z = angularX;
      cube.rotation.y = angularZ;

      // Render the scene
      renderer.render(scene, camera);
    } catch (error) {
      console.error("Error processing data:", error);
    }
  });
};

export default Cube;
