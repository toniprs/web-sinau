<template>
  <div>
    <router-view></router-view>
  </div>
</template>




<style lang="scss">
// @import url("https://fonts.googleapis.com/css?family=Montserrat:500&display=swap");

// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
//
</style>


<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat:500&display=swap");

* {
  box-sizing: border-box;
}

body {
  padding: 0px;
  margin: 0px;
  background-color: #edf1f8;
  font-family: "Montserrat", sans-serif;
}

header {
  background: white;
  height: 66px;
}

header * {
  color: #01111c;
}

header .logo {
  float: left;
  height: inherit;
  margin-left: 2em;
}

header .logo img {
  height: 80%;
}

header .logo a {
  text-decoration: none;
}

header .logo-text {
  margin: 9px;
}

header ul {
  float: right;
  margin: 0px;
  padding: 0px;
  list-style: none;
  height: inherit;
}

header ul li {
  float: left;
  position: relative;
  height: inherit;
}

header ul li a {
  display: block;
  padding: 21px;
  font-size: 1.11em;
  text-decoration: none;
  height: inherit;
}

header ul li a:hover {
  background: #df208b;
  transition: 0.5s;
  color: #edf1f8;
}

header ul li ul {
  position: absolute;
  top: 66px;
  right: 0px;
  width: 180px;
  display: none;
}

header ul li:hover ul {
  display: block;
}

header ul li ul li {
  width: 100%;
}

header ul li ul li a {
  padding: 10px;
  background: white;
  color: black;
}

header ul li ul li a.logout {
  background: white;
  color: red;
}

header ul li ul li a:hover {
  background: grey;
}

.login-page {
  height: 100vh;
  position: relative;
}

.login-page .box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  width: 320px;
}

.login-page .box .form-head h2 {
  text-align: center;
  margin: 10px 0px;
  color: #01111c;
  margin-bottom: 2rem;
}

.login-page .box .form-head p {
  text-align: center;
  margin: 10px 0px;
  color: darkgrey;
  margin-bottom: 3rem;
}

.login-page .box .form body {
  display: flex;
  flex-direction: column;
}

.login-page .box .form-body input {
  height: 40px;
  margin-bottom: 20px;
  border: 1px solid white;
  width: 100%;
  border-radius: 5px;
  padding-left: 1rem;
  transition: box-shadow 0.5s ease;
}

.login-page .box .form-body input:focus {
  box-shadow: 0px 0px 10px lightseagreen;
}

.login-page .box .form-body input::placeholder {
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  color: darkgrey;
}

.login-page .box .form-footer button {
  height: 40px;
  width: 100%;
  border-radius: 5px;
  padding: 0 50px;
  color: #edf1f8;
  background-color: #df205b;
  border: none;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

.login-page .box .form-footer button:hover {
  box-shadow: 0px 0px 10px crimson;
  background-color: crimson;
}
</style>
