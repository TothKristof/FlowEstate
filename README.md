
<a id="readme-top"></a>
[![Issues][issues-shield]][issues-url]
[![Unlicense License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="./Frontend/src/assets/logo.svg" alt="Logo" width="120" height="120">
  </a>

  <h2 align="center">Flow Estate</h2>

  <p align="center">
    An real estate website with 3D navigation
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/othneildrew/Best-README-Template/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Flow Estate Screen Shot][product-screenshot]](https://example.com)

[product-screenshot]: ./Frontend/src/assets/screenshot.jpg

Flow Estate is a modern real estate web application featuring interactive 3D navigation for property exploration. Users can browse, filter, and view detailed listings, as well as register, log in, and upload their own properties with images and descriptions. The platform aims to provide a visually engaging and user-friendly experience for finding or advertising homes.

**What problems does this website solve?**
* Provides a clear and intuitive overview of the property's layout
* Enables targeted navigation between rooms and images for a better user experience

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![React][React.js]][React-url]
* [![Typescript][Typescript.img]][Typescript-url]
* [![Tailwind][Tailwind.img]][Tailwind-url]
* [![SpringBoot][SPRING.img]][Spring-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/users/TothKristof/projects/1/views/1
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555

[linkedin-url]: https://linkedin.com/in/othneildrew

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[Typescript.img]: https://img.shields.io/badge/Typescript-35495E?style=for-the-badge&logo=typescript&logoColor=3178c6
[Typescript-url]: https://www.typescriptlang.org/

[Tailwind.img]: https://img.shields.io/badge/Tailwind_CSS-grey?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC
[Tailwind-url]: https://tailwindcss.com/

[Spring.img]: https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=Spring&logoColor=white
[Spring-url]: https://spring.io/

[PostgreSql.img]: https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=Spring&logoColor=white
[PostgreSql-url]: https://www.postgresql.org/



<!-- GETTING STARTED -->
## Getting Started

### Manual Setup (Without Docker)
#### Prerequisites

* **Java Development Kit** 21 or above [Download](https://www.oracle.com/java/technologies/downloads/)
* **Apache Maven** [Download](https://maven.apache.org/download.cgi)
* **Node.js** [Download](https://nodejs.org/en/download)
* **PostgreSQL** [Download](https://www.postgresql.org/download/)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/github_username/repo_name.git
   ```

2. Get a free Embed Map API Key at [Google Cloud](https://cloud.google.com/gcp) (This is needed for property location)

3. Replace the placeholder api key to your api key inside `Frontend/env.example` and rename it to .env
   ```js
   VITE_GOOGLE_MAPS_API_KEY=yourapi;
   ```

4. Create PostgreSQL database

5. Fill out the backend .env file variables inside `Backend/env.example` and rename it to .env
   ```js
    GOOGLE_CLIENT_ID=your-google-client-id;
    GOOGLE_CLIENT_SECRET=your-google-client-secret;
    APP_BASE_URL=http://localhost:your-backend-port;
    DB_URL=jdbc:postgresql://localhost:your-db-port/;your-db-name;
    DB_USERNAME=your-db-username;
    DB_PASSWORD=your-db-password;
    SECRET_KEY=your-random-secret-key;
    EXPIRATION=your-expiration-time-in-ms;
   ```


7. Step inside the frontend folder and install NPM packages
   ```sh
   npm install
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Once the application is running, you can explore its features:

- **Browse Properties:** On the main page, you can see a list of available properties. Use the search bar and filters to narrow down the results by location, price, number of rooms, and other criteria.
- **View Property Details:** Click on any property to see its detailed page, which includes a gallery of images, a description, and key information.
- **3D Navigation:** Experience an interactive 3D tour of the property layout for a more immersive viewing experience.
- **User Authentication:** Register for a new account or log in with existing credentials to access personalized features.
- **Upload Your Property:** Authenticated users can upload their own properties by filling out a multi-step form with details, location, and images.



<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Make pages responsive
- [x] Validate form inputs
- [x] Filter properties
- [ ] Add floorplan and connect pictures with rooms
- [ ] Multi-language Support
    - [ ] Hungarian

See the [open issues](https://github.com/users/TothKristof/projects/1/views/1) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Kristof Toth 
- www.linkedin.com/in/tóth-kristóf-70068928b
- tothkrisz2000@gmail.com

Project Link: [Github projects link](https://github.com/users/TothKristof/projects/1/views/1)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments


* [Tool for responsive design](https://responsively.app/)
* [Icons I used for the project.](https://lucide.dev/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



