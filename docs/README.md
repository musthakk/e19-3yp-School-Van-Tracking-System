---
layout: home
permalink: index.html

repository-name: e19-3yp-School-Van-Tracking-System
title: School van Tracking & Monitoring System
---

[comment]: # "This is the standard layout for the project, but you can clean this and use your own template"

<h1>
  <img src="https://github.com/cepdnaclk/e19-3yp-School-Van-Tracking-System/raw/main/docs/images/Logo.jpg" alt="Logo" width="90" height="90" style="border-radius: 50%; margin-right: 15px;">
  School Van Tracking & Monitoring System
</h1>


---

## Get to know SUREWAY!!
<!-- Thumbnail image with play button overlay -->
<a href="https://www.youtube.com/watch?v=kSWzrJRMY2I" target="_blank" onclick="window.open(this.href,'_blank');return false;">
  <img src="https://img.youtube.com/vi/kSWzrJRMY2I/maxresdefault.jpg" alt="Video Thumbnail">
</a>


## Team
-  e19133, A.Harishanth, [email](mailto:e19133@email.com)
-  e19137, Hayanan T., [email](mailto:e19137@email.com)
-  e19247, S.M. Musthak, [email](mailto:e19247@email.com)
-  e19371, Shantosh M., [email](mailto:e19371@email.com)
-  e19455, Yashan W.V. , [email](mailto:e19455@email.com)

<!-- Image (photo/drawing of the final hardware) should be here -->

<!-- This is a sample image, to show how to add images to your page. To learn more options, please refer [this](https://projects.ce.pdn.ac.lk/docs/faq/how-to-add-an-image/) -->

<!-- ![Sample Image](./images/sample.png) -->

## Table of Contents
1. [Get to know SUREWAY!!](#get-to-know-sureway)
2. [Team](#team)
3. [Introduction](#introduction)
4. [Solution Architecture](#solution-architecture)
   1. [Hardware Components](#hardware-components)
   2. [Data Processing and Transmission](#data-processing-and-transmission)
   3. [Server and Client Application](#server-and-client-application)
5. [Hardware and Software Designs](#hardware-and-software-designs)
   - [SureWay: A User-Friendly Mobile App for School Van Tracking](#sureway-a-user-friendly-mobile-app-for-school-van-tracking)
   1. [Key Features](#key-features)
   2. [Enhancing Usability](#enhancing-usability)
   - [Detailed designs with many sub-sections](#detailed-designs-with-many-sub-sections)
6. [Testing](#testing)
7. [Detailed budget](#detailed-budget)
8. [Navigating the Challenges: Limitations of Our System](#navigating-the-challenges-limitations-of-our-system)
9. [Conclusion](#conclusion)
10. [Links](#links)

## Introduction

Introducing our revolutionary School Van Monitoring System, a robust solution designed to empower parents and enhance the safety of children during their daily commute. With a comprehensive approach, we have developed a state-of-the-art system that combines real-time tracking, accident monitoring, and proactive alerts for law violations.

Our system prioritizes transparency and ease of use. For parents, we offer a dedicated mobile app that provides seamless real-time tracking of their child's school van. This intuitive app allows parents to stay informed about the van's location, ensuring they have visibility into their child's journey. The user-friendly interface provides a hassle-free experience, making it accessible for parents of all tech backgrounds.

To augment the safety measures, we have implemented accident monitoring technology. In the unfortunate event of an accident, our system promptly sends alerts to parents, keeping them informed about any untoward incidents. This feature adds an extra layer of security and ensures that parents are immediately aware of potential concerns.

Furthermore, our system actively monitors and notifies parents about law violations that may compromise the safety of the children. From smoking and drinking to overspeeding, our technology detects these violations and sends timely alerts, allowing parents to address and act upon these issues promptly. This proactive approach to safety sets our School Van Monitoring System apart, demonstrating our commitment to providing a secure commuting environment for every child.

On the administrative side, we have developed a robust web app for monitoring and tracking. This tool empowers school administrators with the ability to oversee the entire fleet of school vans. From route optimization to ensuring adherence to safety protocols, the web app provides administrators with a comprehensive view of the school van operations.

In conclusion, our School Van Monitoring System combines cutting-edge technology with a user-centric approach to create a secure and transparent environment for children during their daily commute. With a dedicated mobile app for parents and a powerful web app for administrators, we are revolutionizing school transportation safety.


## Solution Architecture

<!--  High level diagram + description -->
![Alt text](https://github.com/cepdnaclk/e19-3yp-School-Van-Tracking-System/blob/main/docs/images/Screenshot%202023-12-11%20084138.png?raw=true)

This diagram represents the solution architecture for our school van tracking system. The system is designed to provide real-time tracking and safety features for school vans.

#### Hardware Components

The system uses various hardware components installed in the school van. These include:

- **Push Button**: Allows manual input from the van driver or other personnel. This button is used to stop the accident alert message from being sent to the admin if it is a false alarm within a 30-second time period.
- **Dash Cam**: Provides visual monitoring of the van's interior and exterior.
- **Accelerometer**: Monitors the van's speed and movement.
- **GPS**: Tracks the van's geographical location.
- **LEDs and LED Display**: Provide visual indicators for various system states and notify the driver when an accident has been detected.
- **Buzzer**: Used to indicate to the driver when an accident is detected.

These components are connected to an ESP32 board, which processes the data they generate.

#### Data Processing and Transmission

The ESP32 board processes the data from the hardware components. If an accident is detected, it sends a control signal to the buzzer to alert the driver and neutralizes the threat if the push button is pressed within 30 seconds. The processed data is then transmitted to an EC2 virtual server via the MQTT protocol.

#### Server and Client Application

The EC2 virtual server, running Node.js, receives the data from the ESP32 board. It processes this data and makes it accessible through an API.

On the client side, users can access real-time information about the van’s route, speed, and location through a mobile app developed with React Native. The app also provides live updates on speed exceptions and alerts.

This architecture allows for efficient tracking and monitoring of school vans, enhancing the safety and reliability of school transportation.


## Hardware and Software Designs

<!-- First row of images -->
<div align="center">
  <img src="https://github.com/cepdnaclk/e19-3yp-School-Van-Tracking-System/blob/main/docs/images/IMG-20231209-WA0013.jpg" alt="Image 1" width="200" height="400" style="margin: 5px;">
  <img src="https://github.com/cepdnaclk/e19-3yp-School-Van-Tracking-System/blob/main/docs/images/IMG-20231209-WA0014.jpg" alt="Image 2" width="200" height="400" style="margin: 5px;">
  <img src="https://github.com/cepdnaclk/e19-3yp-School-Van-Tracking-System/blob/main/docs/images/IMG-20231209-WA0015.jpg" alt="Image 3" width="200" height="400" style="margin: 5px;">
</div>
<!-- Second row of images -->
<div align="center">
  <img src="https://github.com/cepdnaclk/e19-3yp-School-Van-Tracking-System/blob/main/docs/images/IMG-20231209-WA0016.jpg" alt="Image 4" width="200" height="400" style="margin: 5px;">
  <img src="https://github.com/cepdnaclk/e19-3yp-School-Van-Tracking-System/blob/main/docs/images/IMG-20231209-WA0017.jpg" alt="Image 5" width="200" height="400" style="margin: 5px;">
  <img src="https://github.com/cepdnaclk/e19-3yp-School-Van-Tracking-System/blob/main/docs/images/IMG-20231209-WA0018.jpg" alt="Image 6" width="200" height="400" style="margin: 5px;">
</div>


<!-- Fourth row of images -->
<div align="center">
  <img src="https://github.com/cepdnaclk/e19-3yp-School-Van-Tracking-System/blob/main/docs/images/Mobile%20App/with%20wrong%20input%20field.jpg" alt="Image 7" width="200" height="400" style="margin: 5px;">
</div>




### SureWay: A User-Friendly Mobile App for School Van Tracking

Introducing "SureWay," our mobile app designed with a focus on user-friendliness and intuitive navigation. The app features a clean and vibrant interface with an eye-catching orange color scheme that enhances user engagement.

#### Key Features

- **Real-Time Tracking**: The app provides real-time tracking of your child's school van. The map interface at the top allows you to monitor the van's current location, ensuring your child's safety.

- **Detailed Information**: With just a tap on the "Tap for Details" button, you can access more detailed information about the van's route, speed, and more.

- **Easy Access to Features**: The app's home screen provides quick access to its key features—Tracking, Attendance, Configure, and Stream—through large, easy-to-tap icons.

- **Settings**: The gear icon at the bottom right corner takes you to the app's settings, allowing you to customize the app according to your preferences.

#### Enhancing Usability

While the current design is efficient and user-friendly, there's always room for improvement. Here are some suggestions:

- **Contrasting Colors for Text**: To improve readability, consider using contrasting colors for text.

- **Enlarge 'Tap for Details' Button**: To make the app more touch-friendly, consider increasing the size of the "Tap for Details" button.

- **Labels or Tooltips for Icons**: To provide clarity on the functions of different icons, consider adding labels or tooltips.

SureWay is not just an app; it's a commitment to ensuring the safety and well-being of your child during their school commute.


<!-- Video 1 -->
<div style="width: 90%;">
  <a href="https://www.youtube.com/watch?v=TFKJW1s2-AE" target="_blank">
    <img src="https://github.com/cepdnaclk/e19-3yp-School-Van-Tracking-System/blob/main/docs/images/full.jpg?raw=true" alt="Video 1 Thumbnail" style="width: 100%;">
  </a>
  <h4 style="margin-bottom: 0;">Embark on a Visual Journey</h4>
  <p>Embark on a visual journey with this video that showcases the outline design and structure of our product. Experience firsthand how our school van tracking system is not just about advanced technology, but also about easy handling and user-friendly features. This video highlights the thoughtful design that makes our product accessible to users while packing in a host of powerful features. It's a testament to our commitment to delivering a product that marries simplicity with functionality.</p>
</div>

<!-- Video 2 -->
<div style="width: 90%;">
  <a href="https://www.youtube.com/watch?v=OFZYYbICIK4" target="_blank">
    <img src="https://github.com/cepdnaclk/e19-3yp-School-Van-Tracking-System/blob/main/docs/images/transparent.jpg?raw=true" alt="Video 2 Thumbnail" style="width: 100%;">
  </a>
  <h4 style="margin-bottom: 0;">Dive into the Intricate Details</h4>
  <p>Dive into the intricate details of our product with this transparent view design video. Witness how every component comes together to create a system that's efficient, reliable, and user-friendly. From hardware assembly to software integration, get a behind-the-scenes look at what makes our school van tracking system stand out. It's not just about understanding our product; it's about appreciating the thought, innovation, and dedication that goes into building it.</p>
</div>



 <!-- Detailed designs with many sub-sections -->

## Hardware Circuit Diagram
![Alt text](https://github.com/cepdnaclk/e19-3yp-School-Van-Tracking-System/blob/main/docs/images/Circuit.jpg?raw=true)

Presenting our meticulously engineered hardware design! This compact yet powerful setup integrates the SIM 800L, NEO 6M, ADXL, and an I2C module, all powered by a 9V battery. The design ensures seamless connectivity and optimal performance, making it the heart of our school van tracking system. It's not just a schematic; it's the blueprint of safety and reliability!

## Hardware Processing...
In the pursuit of creating an efficient and comprehensive School Van Tracking System, our project team embarked on the integration of crucial hardware components. This meticulous process involved the individual testing and verification of each component to ensure optimal functionality before the amalgamation of the entire system. The components under scrutiny include the GPS NEO 6M module, the MPU6050 accelerometer, the ESP32 camera module, the ESP8266 microcontroller, an LED display, and the SIM900A module.

<div align="center">
  <img src="https://github.com/cepdnaclk/e19-3yp-School-Van-Tracking-System/raw/main/docs/images/circuit_final.jpg" alt="Image 1" width="200" height="400" style="margin: 5px;">
</div>

<div>
  <a href="https://youtu.be/Gqk0iZkY1xY" target="_blank">
    <img src="https://github.com/cepdnaclk/e19-3yp-School-Van-Tracking-System/blob/main/docs/images/circuit_full.jpg alt="DEMONSTATION">
  </a>

#### GPS NEO 6M Module:
The GPS NEO 6M module was rigorously tested to guarantee accurate and reliable location data acquisition. Its compatibility with the overall system was assessed, considering factors such as signal strength and satellite connectivity.

####  MPU6050 Accelerometer:
The MPU6050 accelerometer underwent extensive testing to ensure precise motion tracking. Acceleration, tilt, and rotation data were meticulously analyzed to ascertain the accelerometer's capability to provide real-time vehicle movement information.

####  ESP32 Camera Module:
The ESP32 camera module, a pivotal component for capturing visual data, was individually examined for proper initialization and image acquisition. Image quality, resolution, and compression capabilities were scrutinized to meet the project's stringent requirements.

#### ESP8266 Microcontroller:
The ESP8266 microcontroller, serving as the central processing unit, was tested for its ability to efficiently manage and process data from various sensors. Its power requirements were considered in relation to the overall power management strategy.

### Power Management
Addressing the diverse power requirements of the integrated components, a comprehensive power management strategy was adopted. A 7.4V power supply was selected and regulated using a buck converter to provide the specific voltages required by each component. The ESP8266 operated at 3.3V, the ESP32 camera module at 5V, the LED display at 5V, and the SIM900A module at 4V. This meticulous power management approach ensures optimal performance and longevity of the entire system.

## AWS IoT Core and MQTT in Our Project
In the intricate web of our School Van Tracking System, the marriage of AWS IoT Core and the MQTT (Message Queuing Telemetry Transport) protocol assumes a crucial role, ensuring seamless and secure communication between our embedded devices and the expansive cloud infrastructure.

### AWS IoT Core 
In the realm of IoT, AWS IoT Core emerges as the linchpin, offering an array of robust tools and services tailored for the development of scalable, secure, and reliable IoT applications. It stands as the guardian of our system, providing end-to-end security through device authentication, authorization, and data encryption. The scalability it brings to the table is pivotal for accommodating the dynamic growth of our project. Additionally, AWS IoT Core simplifies device management, allowing for remote monitoring, control, and updates, while facilitating efficient data processing and analytics through seamless integration with other AWS services.

### MQTT Protocol
At the heart of our communication architecture lies the MQTT protocol, a lightweight and efficient messaging solution that plays a fundamental role in the exchange of information between the various components of our School Van Tracking System. MQTT's design, characterized by low bandwidth overhead, aligns perfectly with the need for efficient data transmission in our IoT application. Embracing a publish-subscribe model, MQTT fosters smooth communication, enabling devices to publish data and subscribe to relevant topics. Its asynchronous nature empowers devices to communicate independently, enhancing system responsiveness, especially in scenarios demanding real-time updates.

In the intricate dance of our School Van Tracking System, AWS IoT Core and MQTT seamlessly interconnect the ESP8266, ESP32 camera module, GPS NEO 6M, accelerometer MPU6050, and the AWS cloud. Employing MQTT as the communication protocol, our devices publish data to specific topics, and AWS IoT Core, acting as the diligent broker, orchestrates the secure and efficient delivery of messages to their intended destinations.


# Mobile Application
The School Van Tracking System project has achieved significant milestones in developing a mobile app that enhances student transportation safety. The system employs AWS IoT Core for real-time location tracking and integrates Google APIs for mapping services. Key accomplishments include the implementation of a secure user registration system with email verification using JWT authentication, ensuring the privacy and integrity of user data. Real-time location tracking is enabled through AWS IoT Core, and the Google APIs provide users with an intuitive map interface to visualize van locations. In the next phase, the focus will be on developing a driver module, allowing users to access relevant driver details. The ongoing refinement of the user interface, rigorous testing, and documentation efforts aim to create a reliable and user-friendly School Van Tracking System.

<div align="center">
  <img src="https://github.com/cepdnaclk/e19-3yp-School-Van-Tracking-System/raw/main/docs/images/Login.jpg" alt="Image 1" width="200" height="400" style="margin: 5px;">
  <img src="https://github.com/cepdnaclk/e19-3yp-School-Van-Tracking-System/raw/main/docs/images/register.jpg" alt="Image 2" width="200" height="400" style="margin: 5px;">
  <img src="https://github.com/cepdnaclk/e19-3yp-School-Van-Tracking-System/raw/main/docs/images/checking.jpg" alt="Image 3" width="200" height="400" style="margin: 5px;">
  <img src="https://github.com/cepdnaclk/e19-3yp-School-Van-Tracking-System/raw/main/docs/images/email.jpg" alt="Image 3" width="200" height="400" style="margin: 5px;">
</div>


# Data Security in Our System

In our school van tracking system, we prioritize data security as a fundamental aspect. We understand the importance of protecting sensitive information, such as the real-time location of school vans and student attendance records. Our system employs advanced security measures, including data encryption and secure transmission protocols, to ensure that this data remains confidential and secure. We're committed to continuously updating our security practices to safeguard against emerging threats and vulnerabilities.

![Alt text](https://github.com/cepdnaclk/e19-3yp-School-Van-Tracking-System/blob/main/docs/images/data%20security.jpg?raw=true)


## Testing

### Hardware Testing

Hardware testing is a crucial aspect of our development process. We conduct rigorous testing to ensure that all components of our school van tracking system function as expected under various conditions.

- **Component Testing**: Each hardware component, such as the GPS, accelerometer, and push button, is tested individually for functionality and performance.

- **Integration Testing**: After individual testing, we integrate all the components and test the system as a whole. This helps us identify any issues that arise when the components interact with each other.

- **Stress Testing**: We subject our hardware to extreme conditions to ensure it can withstand high temperatures, vibrations, and other harsh environmental factors.

- **Safety Testing**: Safety is our top priority. We conduct thorough safety tests to ensure our system poses no hazards.

### Software Testing

Software testing is equally important to ensure that our tracking system works seamlessly.

- **Unit Testing**: We test individual units of our software separately to ensure each part is working correctly.

- **Integration Testing**: After unit testing, we combine the software units and test them as a group. This allows us to identify and fix any issues that occur during the interaction of different software units.

- **System Testing**: We test our software as a complete system to ensure it meets all specified requirements.

- **Usability Testing**: We conduct usability tests to ensure our software is user-friendly and intuitive. This involves testing the user interface and the user experience.

Through rigorous hardware and software testing, we aim to provide a reliable and efficient school van tracking system.


### Hardware Testing

Hardware testing is a crucial aspect of our development process. We conduct rigorous testing to ensure that all components of our school van tracking system function as expected under various conditions.

- **Component Testing**: Each hardware component, such as the GPS, accelerometer, and push button, is tested individually for functionality and performance.

- **Integration Testing**: After individual testing, we integrate all the components and test the system as a whole. This helps us identify any issues that arise when the components interact with each other.

- **Stress Testing**: We subject our hardware to extreme conditions to ensure it can withstand high temperatures, vibrations, and other harsh environmental factors.

- **Safety Testing**: Safety is our top priority. We conduct thorough safety tests to ensure our system poses no hazards.

### Software Testing

Software testing is equally important to ensure that our tracking system works seamlessly.

- **Unit Testing**: We test individual units of our software separately to ensure each part is working correctly.

- **Integration Testing**: After unit testing, we combine the software units and test them as a group. This allows us to identify and fix any issues that occur during the interaction of different software units.

- **System Testing**: We test our software as a complete system to ensure it meets all specified requirements.

- **Usability Testing**: We conduct usability tests to ensure our software is user-friendly and intuitive. This involves testing the user interface and the user experience.

Through rigorous hardware and software testing, we aim to provide a reliable and efficient school van tracking system.


## Detailed budget
![Alt text](https://github.com/cepdnaclk/e19-3yp-School-Van-Tracking-System/blob/main/docs/images/Screenshot%202023-12-11%20084902.png?raw=true)
<!--  All items and costs -->

<!--
| Item          | Quantity  | Unit Cost  | Total  |
| ------------- |:---------:|:----------:|-------:|
| Sample item   | 5         | 10 LKR     | 50 LKR |
-->

# Navigating the Challenges: Limitations of Our System

While our school van tracking system, "SureWay," is designed with meticulous attention to detail, we believe in transparency and acknowledge that there are certain limitations. Here's a candid look at them:

- **Camera Visibility**: Like all camera-based systems, our dash cam's performance can be affected by factors such as lighting conditions and obstructions. We're continually working on enhancing its capabilities to provide clear visibility under various conditions.

- **False Alarm Detection**: Our system relies on the driver's manual response to false alarms. While this allows for human discretion, it also introduces the possibility of delays or errors in response.

- **Manual Marking of Student Attendance**: The driver manually marks student attendance, which could lead to human errors. We're exploring automated solutions to minimize this.

- **Admin Responsibility**: The system's effectiveness depends on the admin's active role in checking and monitoring all system activities. We're developing features to streamline this process and reduce the admin's workload.

- **Maintenance Downtime**: Like any tech solution, our system may require downtime for maintenance or face occasional device failures. We strive to keep these to a minimum and ensure they cause minimal disruption.

- **Signal Reliability**: Weather conditions and the geographical area can affect the reliability of the signals. We're constantly optimizing our system to perform reliably under various conditions.

We see these limitations not as roadblocks, but as stepping stones towards making "SureWay" the most reliable and efficient school van tracking system. Your feedback and suggestions are always welcome as we navigate these challenges together!


## Conclusion

In conclusion, our school van tracking system, "SureWay," represents a significant advancement in ensuring the safety and efficiency of school transportation. By leveraging state-of-the-art technology and user-friendly design, we've created a system that not only addresses the challenges of tracking school vans but also provides peace of mind to parents and school administrators.

From real-time tracking to accident detection, every feature of "SureWay" has been meticulously designed with the end-user in mind. However, we understand that there's always room for improvement. We're committed to continuously refining our system based on user feedback and technological advancements.

We believe that "SureWay" is more than just a product; it's a testament to our dedication to enhancing safety and accountability in school transportation. We're excited about the journey ahead and look forward to making "SureWay" an integral part of school transportation systems worldwide.


## Links

- [Project Repository](https://github.com/cepdnaclk/{{ page.repository-name }}){:target="_blank"}
- [Project Page](https://cepdnaclk.github.io/{{ page.repository-name}}){:target="_blank"}
- [Department of Computer Engineering](http://www.ce.pdn.ac.lk/)
- [University of Peradeniya](https://eng.pdn.ac.lk/)

[//]: # (Please refer this to learn more about Markdown syntax)
[//]: # (https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
