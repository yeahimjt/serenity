<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/yeahimjt.movieapp">
    <img src="public/fr.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Serenity Peace</h3>

  <p align="center">
    A safeplace on the internet for people to share their stories regarding their mental health to empower themselves and inspire others
    <br />
    <br />
    <a href="https://www.serenity-peace-api.com/">View Live</a>
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
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://yeahimjt.github.io/movieapp)

This projects main goal was to concrete my knowledge with working with APIs, Tailwind CSS and Redux. This involved handling errors, managing the data, and displaying the data cleanly for the best UX/UI experience. This project acheived it all.

Here's why:
* User is met with a clean and easily navigatable UI upon first load.
* User experience is clear enough where the user knows what to click and what they will receive upon clicking.
* Errors are handled by Front End by simply not loading the specific errored component if it does not receive specific data. For example: If the movie does not have an Official Trailer it will not load the Youtube Media Component as it would just display an error.
* Built components handle data efficiently where a limit to the data received can be set to avoid displaying too much data back to the user that could potentially overload them.
* Filter for each respective page
* Pagination for each respective page
* Search for movies, tv shows, and people at the same time and allow filter to let user know if their search query has any data for that specific filter

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* ![React][React.js]
* ![Redux][Redux]
* ![HTML5][HTML5]
* ![TailwindCSS][TailwindCSS]
* ![Git][Git]



<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free API Key for The Movie Database API by following instructions at: [https://www.themoviedb.org/documentation/api?language=en-US](https://www.themoviedb.org/documentation/api?language=en-US)
2. Clone the repo
   ```sh
   git clone https://github.com/yeahimjt/movieapp.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API located in file `/src/assets/CONSTANTS.js`
   ```js
   const APIKEY = 'REPLACE WITH YOUR API';
   ```
5. Run command to start project locally
    ```sh
    npm start
    ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

* Click Discover, change filter from Movies -> Tv Shows. Load new results by clicking pagination arrows. Click on card to display more information on item
* Click Trending, change filter from Movies -> Tv Shows. Load new results by clicking pagination arrows. Click on card to display more information on item
* Click People, load new results by clicking pagination arrows. Click on card to display more information on item
* Enter query in search bar for what you desire to find, upon pressing enter click desired filter (Movie, Tv Show, People) and click on the correct movie/tv shows/person card to see more information.


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Add Search
- [ ] Add reviews
- [ ] Learn how to switch language to
    - Spanish


<p align="right">(<a href="#readme-top">back to top</a>)</p>



Email - jonathanandrewtrevino@gmail.com 

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Some of the documentation and applications I used to increase roll out for project.

* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/jonathanandrewtrevino
[product-screenshot]: /src/assets/movieapp.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[Redux]: https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white
[HTML5]: https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white
[TailwindCSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Git]: https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white
