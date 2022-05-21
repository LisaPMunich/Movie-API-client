# Movie-API-Client "Green Screen"
<img src="https://user-images.githubusercontent.com/99111208/168389863-4e73738e-3d5d-4d84-b2d5-e03d08048b66.png">

## Description
This project is using React, Bootstrap and Redux to build the client-side for a movie application. It complements the  server-side (REST API and database). You can see the GitHub repo [here](https://github.com/LisaPMunich/Movie-API.git).
The server- and the client-side use the MERN stack.

## How to run and use the project ...

### clone it

1. First clone the file. For instructions, how to clone a github repository, [click here.](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)

2. Go to your local directory, where you stored the cloned file and click the index.html to open in the browser.

### use it live


<table>
<tr>
<td>
<img src="https://user-images.githubusercontent.com/99111208/163397361-5126a0ff-a116-4a57-9773-c1878285b045.svg" alt="Heroku icon" width="30">
</td>
<td>
<a href="https://green-screen-app.herokuapp.com/">Click here to see my live page on Heroku</a>
</td>
</tr>
<tr>
<td>
<img src="https://user-images.githubusercontent.com/99111208/168454994-f5f73e83-d6a7-4b83-a7ab-66acc9ac1766.png" alt="Heroku icon" width="30">
</td>
<td>
<a href="https://green-screen-movies.netlify.app/">Click here to see my live page on Netlify</a>
</td>
</tr>
</table>

## File Tree

<img src="https://user-images.githubusercontent.com/99111208/168390914-f8b169ce-0157-4079-8518-f0994f4ac287.png"/>

## User Stories

* As a user, I want to be able to access information on movies, directors, and genres so that I can learn more about movies I have watched or am interested in.
* As a user, I want to be able to create a profile, so that I can save data about my favorite movies.


## Key Features

This single-page-application provides the following major views - NavBar, Footer excluded:

### Registration

Registering for new users (username, password, email, birthday)

<img src="https://user-images.githubusercontent.com/99111208/168389871-94639e87-7dbc-423f-938b-ef236c2f4a9c.png">


### Login

log in with a username and password

<img src="https://user-images.githubusercontent.com/99111208/168389858-c3ced003-58dd-47f6-9b86-2774147fdd39.png">

### Main / Home

* List of ALL movies
* Filtering by movie title (visibilityFilter)

<img src="https://user-images.githubusercontent.com/99111208/168389863-4e73738e-3d5d-4d84-b2d5-e03d08048b66.png">

### Single movie
* Clicking on one movie in the movie list (main) returns a single movie (image, description, genre, director)
* allows user to add and remove (toggle) a movie to their list of favorites by clicking a star icon

<img src="https://user-images.githubusercontent.com/99111208/168389872-ab21a3f6-e86e-460a-ae2e-12edef9cb8bf.png">

### Genre
Clicking on a link in the Single movie view returns data about the genre of the movie (name, description)

<img width="1760" alt="Screenshot_README_GenreView" src="https://user-images.githubusercontent.com/99111208/168395381-27a6fcf5-376e-44e2-9583-74eb7db3af69.png">

### Director
Clicking on a link in the Single movie view returns data about the director of the movie (name, bio, birth year, death year)

<img width="1760" alt="Screenshot_README_DirectorView" src="https://user-images.githubusercontent.com/99111208/168395373-f2cd2bcf-ce36-4ab5-8361-b4a1bd0f627c.png">

### Profile

* Users can update their user info (username, password, email, date of birth)
* Users can delete their profile / deregister
* Display of links to favorite movies, which were selected by clicking the star icon in the Single Movie view

<img src="https://user-images.githubusercontent.com/99111208/168389870-be6bdee5-8808-425e-ae84-028a97892c5b.png">

## Project Dependencies

<img src="https://user-images.githubusercontent.com/99111208/168397268-597c799a-3a3e-4fd5-9146-def80597686f.png">


## What challenges did I face, what did I learn?

### ... from installing React
* in 2021 React 18 introduced a new root API, namely ReactDOM.createRoot. It is no longer necessary to pass the container into the render. This means that one needs to  replace render with createRoot. For more information, click here https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html

### ... from installing Parcel
* Project setup: in the package.json the entry point may not be "main", because main is used as the output file of the build. Instead define the source code for the library as follows:
```bash
"source": "src/index.html"
```

* Parcel: the command parcel src/index.html threw an error, saying
```bash
@parcel/package-manager: Could not find module "@parcel/transformer-sass" satisfying 2.0.0-rc.0
```
the solution was to remove the @oarcel/transformer-sass:^2.4.1 from the package.json,  deleting node-modules and package-lock.json file and then run npm install. As a result the version 2.0.0-rc.0 was installed and added as a dependencies.

* Parcel build process threw error, which was solved by adding type="module" to script tag in index.html
* add to package.json
```bash
"start": "parcel", // parcel watch + dev server
"watch": "parcel watch", // parcel build + automatic reload
"build": "parcel build"
```

### ... from implementing Redux

Architectural Diagram before implementation
<img src="https://user-images.githubusercontent.com/99111208/168394065-c3b6fc50-9f48-4b31-9391-af263209037e.png">

At first, I wanted to implement Actions, Reducers and Store. My IDE told me, that createStore() was recently deprecated, that I could import Legacy_createStore, but it was advised to use configureStore() instead. Since this approach was not as well documented yet, I read and listened to many tutorials trying to find the best combination for the new methods. My resume: It is a lot of boilerplate code for an application, which would not necessarily have needed it for the current complexity. Since Redux was the first library to introduce this store-system, it was good to try it out. But given the choice I would probably choose another less complicated library like Recoil (https://javascript.plainenglish.io/moving-from-redux-to-recoil-42aa9d9cfaad).

### ... from Deploying on Netlify

First I thought it went very smoothly, but after deployment I realized that reloading pages did lead to a 404 error and the Profile View did not open from the start. I tried all approaches I could find online
* replace BrowserRouter with HashRouter,
* add _redirects file,
* use react-scripts to build the app,
* add netlify.toml file with general redirect command.

After a lengthy trial-and-error of possible solutions, I specified a netlify.toml file and specified build command, publish folder and wrote Redirects for all routes (e.g. from = "/users/me" to = "/") and Rewrites (status=200). After cleaning cache and redeployment it finally worked.
My learning is that parcel and netlify do seem to lead to conflicts. Also, deployment on Heroku is more straightforward - I also deployed there, just to check, if it would work.
The see the live app on heroku please <a href="https://green-screen-app.herokuapp.com/">click here</a>. 
