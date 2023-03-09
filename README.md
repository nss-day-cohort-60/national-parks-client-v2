# National Parks 
### All things National Parks in one place!

 ###### * a full-stack group learning project *
 Requirements were: 

  1. Support CRUD operations on 1, or more, features
  2. Implement one or more 1 -> ∞ relationships, and one or more ∞ -> ∞ relationships.
  3. At least one creation form must have a dropdown/radio button group/checkbox group to attached related resources to it.
  4. One of the lists of resources must implement a filtering mechanism in the UI. The filtering must happen at the server, not in the client.
  5. Login and register must be implemented to track data for multiple users.
  6. Users should only be able to edit/delete their own data.


Our team of five spent two days creating the concept, wireframe, ERD and gathering/creating seed data and models 

[Planning ERD & Wireframe on miro](https://miro.com/app/board/uXjVPwu3sLM=/?share_link_id=948251926765)

Two Agile scrum sprints were completed, during which the project client and server were built:

  * Week 1 concluded with a client exceeding our MVP requirements and a server built in python and SQL queries 
  * Week 2 (client side) concluded with a further updated client with improved styling and a near-fully responsive layout
  * Week 2 (server side) rebuilding the server to utilize Django REST framework instead of pure python/SQL
 
We were given leeway to develop our own project management and ticketing strategies, which was perhaps the toughest part of the project 😅

## Project Overview

National Parks is a responsive web application intended to allow park visitors to have one place with all the resources and information about US national parks.
Users should be able to view and/or interact with a variety of park information and create and view public blog posts.
The front end is coded with React18 and ES6, styled with Bootstrap and CSS.

## Feature Highlights

#### Switch between map and card views for national parks:
![Park map/cards demo](https://github.com/nss-day-cohort-60/national-parks-client-v2/blob/main/parkmap.gif)

#### View details about specific parks like location, history, wildlife and amenities:
![Park map/cards demo](https://github.com/nss-day-cohort-60/national-parks-client-v2/blob/main/parkpage.gif)

#### View, create and favorite blogs about each park then update or delete personal blogs:
![Park map/cards demo](https://github.com/nss-day-cohort-60/national-parks-client-v2/blob/main/blogs.gif)

#### View, add, favorite and register for park events:
##### (Staff can modify and delete events)
![Park map/cards demo](https://github.com/nss-day-cohort-60/national-parks-client-v2/blob/main/events.gif)

#### View all favorites on one page:
![Park map/cards demo](https://github.com/nss-day-cohort-60/national-parks-client-v2/blob/main/userhub.gif)

#### Responsive design:
![Park map/cards demo](https://github.com/nss-day-cohort-60/national-parks-client-v2/blob/main/phoneview.gif)

## Installation
Follow the steps below to download and run this project on your computer
- [ ] Server is required for full functionality. [View server repo here](https://github.com/nss-day-cohort-60/national-parks-django-api)
- [ ] Clone this repo
- [ ] From repo directory, run "npm install react"
- [ ] Run something about leaflet and another thing and bootstrap maybe
- [ ] Run "npm start"


## Tech Stack

![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

## Credits & Acknowledgements

|<h3>Hazel Preza</h3>  |<h3>John Doll</h3>  |<h3>Maia Dutta</h3> |<h3>Shaina Couch</h3>|<h3>Vanessa Spear</h3> |
|:--------------------:|:------------------:|:------------------:|:-------------------:|:---------------------:|
|[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/segadreamgirl) [![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/hazelpreza) |       [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://www.github.com/JohnMDoll) [![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/john-m-doll)|     [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mvdutta)[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/hazelpreza) |        [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/shaibird) [![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shaina-couch)|      [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/vanessaspear)[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/vanessavspear) |
|Reusable Photo carousel, wireframing, CSS styling    |    Search & filter functions    |    Wildlife and Amenities entries    |    Blogs page       |    Parks list component      |
|Favoriting, favorite button           |    Blog editing and deleting     |    Bootstrap incorporation and CSS refactoring   |Events page      |  Parks map component |
|User Hub             |  Contributor to Events CRUD functions |   Login & Registration modals    |Campgrounds entries    |    Reviewed pull requests and performed code reviews    |
|Individual Park Page |     README           |     Navigation Bar                      |                   |                     |
 



