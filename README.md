# Frontend Mentor - Interactive comments section solution

This is a solution to the [Interactive comments section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments
- **Bonus**: If you're building a purely front-end project, use `localStorage` to save the current state in the browser that persists when the browser is refreshed.
- **Bonus**: Instead of using the `createdAt` strings from the `data.json` file, try using timestamps and dynamically track the time since the comment or reply was posted.

### Screenshot

![](https://i.imgur.com/zaRyilM.png)

### Links

- [Solution URL](https://github.com/niemal/frontendmentor_2)
- [Live Site URL](https://niemal.github.io/frontendmentor_2/)

## My process

### Built with

- [React](https://reactjs.org/) - JS library
- [styled-components](https://styled-components.com/)

### What I learned

I think the code formatting is a bit compressed into one giant component (Comment), but I personally think it's fine.

I learned that `gh-pages` is actually a very useful tool to post front-end react apps on github. Furthermore I got to exercise styled-components, along with recursive-tree functions for the CRUD operations. I added some very simple animations for upvoting/downvoting with `drop-filter` (kind of heavy but still very limited/small pixel rendering so I presume it's fine!), as well as a `box-shadow` animation when a new post is created/updated and a a slide-in and slide-out `keyframe`.

Feel free to comment on frontendmentor!
