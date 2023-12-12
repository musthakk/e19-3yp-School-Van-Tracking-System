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
  <img src="https://github.com/cepdnaclk/e19-3yp-School-Van-Tracking-System/raw/main/docs/images/IMG-20231209-WA0013.jpg" alt="Image 1" width="200" style="margin: 5px;">
  <img src="https://github.com/cepdnaclk/e19-3yp-School-Van-Tracking-System/raw/main/docs/images/IMG-20231209-WA0014.jpg" alt="Image 2" width="200" style="margin: 5px;">
  <img src="https://github.com/cepdnaclk/e19-3yp-School-Van-Tracking-System/raw/main/docs/images/IMG-20231209-WA0015.jpg" alt="Image 3" width="200" style="margin: 5px;">
</div>

<!-- Second row of images -->
<div align="center">
  <img src="https://github.com/cepdnaclk/e19-3yp-School-Van-Tracking-System/raw/main/docs/images/IMG-20231209-WA0016.jpg" alt="Image 4" width="200" style="margin: 5px;">
  <img src="https://github.com/cepdnaclk/e19-3yp-School-Van-Tracking-System/raw/main/docs/images/IMG-20231209-WA0017.jpg" alt="Image 5" width="200" style="margin: 5px;">
  <img src="https://github.com/cepdnaclk/e19-3yp-School-Van-Tracking-System/raw/main/docs/images/IMG-20231209-WA0018.jpg" alt="Image 6" width="200" style="margin: 5px;">
</div>

<!-- Video -->
<div align="center">
  <video width="400" height="300" controls>
    <source src="https://raw.githubusercontent.com/cepdnaclk/e19-3yp-School-Van-Tracking-System/main/docs/images/product_transparent.mp4" type="video/mp4">
  </video>
</div>



 <!-- Detailed designs with many sub-sections -->

## Hardware Circuit Diagram
![Alt text](https://github.com/cepdnaclk/e19-3yp-School-Van-Tracking-System/blob/main/docs/images/Circuit.jpg?raw=true)

Presenting our meticulously engineered hardware design! This compact yet powerful setup integrates the SIM 800L, NEO 6M, ADXL, and an I2C module, all powered by a 9V battery. The design ensures seamless connectivity and optimal performance, making it the heart of our school van tracking system. It's not just a schematic; it's the blueprint of safety and reliability!


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

## Conclusion

<!-- What was achieved, future developments, commercialization plans -->

## Links

- [Project Repository](https://github.com/cepdnaclk/{{ page.repository-name }}){:target="_blank"}
- [Project Page](https://cepdnaclk.github.io/{{ page.repository-name}}){:target="_blank"}
- [Department of Computer Engineering](http://www.ce.pdn.ac.lk/)
- [University of Peradeniya](https://eng.pdn.ac.lk/)

[//]: # (Please refer this to learn more about Markdown syntax)
[//]: # (https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
