![Angular Movie Site](http://onehungrymind.com/wp-content/uploads/2016/02/background-skinny.jpg)

#Angular Movie Site

Welcome to the Angular Movie Site! This is a website template using AngularJS and the GreenSock Animation Platform (GSAP) from which you can design and build a stunning movie showcase. I have personally used many variations of this template to create sites for popular movies (such as *The Hobbit* and *Transformers 4*) for over $20,000! Read on to get started.

# Getting Started

To run the website, you will need to have NodeJs and NPM installed via either Homebrew (`brew install node`) or [nodejs.org](https://nodejs.org/en/).

After you have installed Node and NPM, run `npm i -g serve`, which will install the NPM package `serve` globally. This package allows you to serve your content on localhost with one command.

All that's left to do is run the following:

```
$ git clone https://github.com/simpulton/angular-movie.git
$ cd angular-movie
$ serve src/
```

Then navigate to [http://localhost:3000](http://localhost:3000) in your browser and you are done!

> **Note: ** if you are getting `EADDRINUSE` errors when you run `serve`, then you need to specify a different port than `3000`. Accomplish this by using the `--port` flag like so: `serve src/ --port 3001`.
