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

<!-- HTML video container with embedded YouTube video -->
<div class="video-container">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/kSWzrJRMY2I" frameborder="0" allowfullscreen></iframe>
</div>

<!-- CSS styles for responsive video container -->
<style>
  .video-container {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    padding-top: 25px;
    height: 0;
  }

  .video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>



## Team
-  e19133, A.Harishanth, [email](mailto:e19133@email.com)
-  e19137, Hayanan T., [email](mailto:e19137@email.com)
-  e19247, S.M. Musthak, [email](mailto:e19247@email.com)
-  e19371, Shantosh M., [email](mailto:e19371@email.com)
-  e19455, Yashan W.V. , [email](mailto:e19455@email.com)

<!-- Image (photo/drawing of the final hardware) should be here -->

<!-- This is a sample image, to show how to add images to your page. To learn more options, please refer [this](https://projects.ce.pdn.ac.lk/docs/faq/how-to-add-an-image/) -->

<!-- ![Sample Image](./images/sample.png) -->

#### Table of Contents
1. [Introduction](#introduction)
2. [Solution Architecture](#solution-architecture )
3. [Hardware & Software Designs](#hardware-and-software-designs)
4. [Testing](#testing)
5. [Detailed budget](#detailed-budget)
6. [Conclusion](#conclusion)
7. [Links](#links)

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
  <img src="https://github.com/cepdnaclk/e19-3yp-School-Van-Tracking-System/raw/main/docs/images/IMG-20231209-WA0013.jpg" alt="Image 1" width="200" height="400" style="margin: 5px;">
  <img src="https://github.com/cepdnaclk/e19-3yp-School-Van-Tracking-System/raw/main/docs/images/IMG-20231209-WA0014.jpg" alt="Image 2" width="200" height="400" style="margin: 5px;">
  <img src="https://github.com/cepdnaclk/e19-3yp-School-Van-Tracking-System/raw/main/docs/images/IMG-20231209-WA0015.jpg" alt="Image 3" width="200" height="400" style="margin: 5px;">
</div>

<!-- Second row of images -->
<div align="center">
  <img src="https://github.com/cepdnaclk/e19-3yp-School-Van-Tracking-System/raw/main/docs/images/IMG-20231209-WA0016.jpg" alt="Image 4" width="200" height="400" style="margin: 5px;">
  <img src="https://github.com/cepdnaclk/e19-3yp-School-Van-Tracking-System/raw/main/docs/images/IMG-20231209-WA0017.jpg" alt="Image 5" width="200" height="400" style="margin: 5px;">
  <img src="https://github.com/cepdnaclk/e19-3yp-School-Van-Tracking-System/raw/main/docs/images/IMG-20231209-WA0018.jpg" alt="Image 6" width="200" height="400" style="margin: 5px;">
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


<!-- Video -->
<!-- HTML video container with embedded YouTube video -->
<div class="video-container">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/kSWzrJRMY2I" frameborder="0" allowfullscreen></iframe>
</div>


<!-- HTML video container with embedded YouTube video -->
<div class="video-container">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/OFZYYbICIK4" frameborder="0" allowfullscreen></iframe>
</div>

 <!-- Detailed designs with many sub-sections -->

## Hardware Circuit Diagram
![Alt text](https://github.com/cepdnaclk/e19-3yp-School-Van-Tracking-System/blob/main/docs/images/Circuit.jpg?raw=true)

Presenting our meticulously engineered hardware design! This compact yet powerful setup integrates the SIM 800L, NEO 6M, ADXL, and an I2C module, all powered by a 9V battery. The design ensures seamless connectivity and optimal performance, making it the heart of our school van tracking system. It's not just a schematic; it's the blueprint of safety and reliability!

# Data Security in Our System

In our school van tracking system, we prioritize data security as a fundamental aspect. We understand the importance of protecting sensitive information, such as the real-time location of school vans and student attendance records. Our system employs advanced security measures, including data encryption and secure transmission protocols, to ensure that this data remains confidential and secure. We're committed to continuously updating our security practices to safeguard against emerging threats and vulnerabilities.

![Alt text](https://github.com/cepdnaclk/e19-3yp-School-Van-Tracking-System/blob/main/docs/images/data%20security.jpg?raw=true)


## Testing
<!-- Testing done on hardware and software, detailed + summarized results --> 

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

<!-- What was achieved, future developments, commercialization plans -->

## Links

- [Project Repository](https://github.com/cepdnaclk/{{ page.repository-name }}){:target="_blank"}
- [Project Page](https://cepdnaclk.github.io/{{ page.repository-name}}){:target="_blank"}
- [Department of Computer Engineering](http://www.ce.pdn.ac.lk/)
- [University of Peradeniya](https://eng.pdn.ac.lk/)

[//]: # (Please refer this to learn more about Markdown syntax)
[//]: # (https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
