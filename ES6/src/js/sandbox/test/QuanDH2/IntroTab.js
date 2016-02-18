import React, { Component } from 'react';

export default class Intro extends Component  {
  constructor() {
    super();
    this.state = {};
  }

  render () {
    return(
    <div>

          <div>My name is Quan</div>
          <div>ReactJS General</div>
          <div>
            <ul>
              <li>What is Grommet</li>
              <p>The most advanced open source UX framework for enterprise applications.</p>
              <p>Content:
                  Hello world
              </p>
              <li>What is NodeJS? How it relate to Grommet?</li>
              <p>Node.js is a very powerful JavaScript-based framework/platform built on Google Chromes JavaScript V8 Engine.
               It is used to develop I/O intensive web applications like video streaming sites,
               single-page applications, and other web applications.</p>
               <p>Node.js is an open source, cross-platform runtime environment for developing server-side and networking applications.
               Node.js applications are written in JavaScript, and can be run within the Node.js runtime on OS X, Microsoft Windows, and Linux.
              </p>

              <li>What is Gulp? How it relate to Grommet?</li>
              <p>gulp is a toolkit that will help you automate painful or time-consuming tasks in your development workflow. For web development (if thats your thing) it can help you by doing CSS preprocessing, JS transpiling, minification, live reloading, and much more. Integrations are built into all major IDEs and people are loving gulp across PHP, .NET, Node.js, Java, and more. With over 2000 plugins (and plenty you can do without plugins), gulp lets you quit messing with build systems and get back to work.</p>
              <li>What is Webpack? How it relate to Grommet?</li>
            </ul>
          </div>
          <div>Simple example with Grommet</div>
          <div>DOM interact using JS</div>
          <div>DOM interact using JQuery</div>
    </div>
  );
  }
}
