# CS465-FullStack
CS-465 Full Stack Development with MEAN

Travlr Getaways needs a modern web platform that lets customers browse and book trips while giving staff a secure, streamlined dashboard to manage inventory, reservations, and content. To meet these goals, we will deliver a MEAN stack solution (MongoDB, Express.js, Angular, and Node.js) deployed to cloud infrastructure.

•	Customer facing website (Angular SPA): A single page application served from a CDN. Visitors can search destinations, build itineraries, and complete bookings through a guided checkout flow that communicates with back end services over HTTPS.

•	Administrator SPA (Angular): A separate, identity protected dashboard that reuses shared UI components via a private npm workspace. Staff can add or edit packages, approve or cancel bookings, and review real time analytics.

•	Service layer (Node + Express): An API gateway fronts micro services for authentication, booking logic, and content management, all running in Docker containers on an auto scaling Kubernetes cluster.

•	Data layer (MongoDB + Redis + Object Storage): A sharded MongoDB cluster stores core data, Redis accelerates high traffic lookups, and cloud object storage keeps images and invoices.

This architecture gives Travlr Getaways a scalable, secure, and easily maintainable platform that can grow without major rewrites.

1.	Client Layer
   
•	Web Browser hosts the Angular code and initiates all interactions.

•	Client Session manages JWT tokens and session storage.

•	Traveler Portfolio presents personalized trip data and calls down to the Graphic Library for rich image rendering.

•	Interfaces: The browser talks to both the Client Session and Traveler Portfolio. Traveler Portfolio consumes the Graphic Library and issues secure requests to the server tier.

2.	Server Layer
   
•	Authentication Server validates credentials and issues JWTs.

•	Server Session holds transient state and brokers requests between the client and data tier.

•	Mongoose ODM translates JavaScript models into MongoDB operations.

•	Traveler Database component encapsulates business queries and aggregation logic.

•	Required interface symbols highlight that Server Session relies on Mongoose ODM, which in turn depends on MongoDB.

3.	Database Layer
   
•	MongoDB (replica set cluster) persists users, destinations, and reservations. Indexed collections and change streams support analytics and high volume reads.

Relationships:

•	The Client Session exchanges tokens with the Authentication Server before forwarding user requests to Server Session.

•	Server Session coordinates with Traveler Database via Mongoose ODM, which issues low level operations to MongoDB.

•	Graphic heavy pages pull assets through the Graphic Library to keep the browser rendering pipeline smooth.

