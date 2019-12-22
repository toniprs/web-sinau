<template>
  <div class="wrapper">
        <div class="sidebar">
            <div class="brand">
                <img src="../assets/Logo.svg" alt="Logo" class="logo-text" />
            </div>

            <ul>
                <li>
                    <a href=""><i class="fas fa-home"></i>Dashboard</a>
                </li>
            </ul>
            <ul>
                <li class="active">
                    <a href=""><i class="fas fa-user"></i>Participant</a>
                </li>
            </ul>
            <ul>
                <li>
                    <a href=""><i class="fas fa-calendar"></i>Schedule</a>
                </li>
            </ul>
            <ul>
                <li>
                    <a href=""><i class="fas fa-graduation-cap"></i>Participant class</a>
                </li>
            </ul>
  </div>

  <div class="note">
    <div v-if="!note" class="table-wrapper">
      <!-- <button class="btn btn-sm btn-success" @click="() => doAddOrEdit()">Add</button>
      -->

      <div class="title">
        <h2>Participant</h2>
      </div>
      <div class="button">
        <input type="text" class="head-search" placeholder="Search" />
        <button @click="() => doAddOrEdit()">Add Participant</button>
      </div>

      <table class="content-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="data.length === 0">
            <td colspan="4">
              <span v-if="isLoading">Memuat data...</span>
              <span v-else>Ooops You don’t have participants</span>
            </td>
          </tr>
          <tr v-else v-for="(item, index) in data" :key="index">
            <td>{{item.title}}</td>
            <td>{{item.description}}</td>
            <td>{{item.content}}</td>
            <td class="button-action" width="20%">
              <button class="pass" @click="() => doAddOrEdit(item)">Edit</button>
              <button class="error" @click="() => doDelete(item)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <form v-else class="form-note" @submit="doSave">
      <h2 class="h2">{{note.id ? "Change note" : "Add new participant"}}</h2>
      <div class="form-add">
      <label for="email">
        <b>Insert Name</b>
      </label>
      <input
        v-model="note.title"
        type="text"
        placeholder="Insert Name"
        autofocus
        class="form-control"
        :class="{'is-invalid': hasSubmit && note.title.length === 0}"
      />
      <label for="phone">
        <b>Phone Number</b>
      </label>
      <input
        v-model="note.description"
        type="text"
        placeholder="Phone Number"
        class="form-control"
        :class="{'is-invalid': hasSubmit && note.description.length === 0}"
      />

      <label for="Addres">
        <b>Addres</b>
      </label>
      <textarea
        v-model="note.content"
        type="text"
        placeholder="Address"
        class="form-control"
        :class="{'is-invalid': hasSubmit && note.content.length === 0}"
      />
      </div>
      <div class="form-footer">
        <button class="cancel" type="button" @click="doReset">Cancel</button>
        <button class="save" type="submit">
          <template v-if="isLoading">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span class="sr-only">Loading...</span>
          </template>
          <template v-else>
            <span v-if="note.id">Update</span>
            <span v-else>Save</span>
          </template>
        </button>
      </div>
    </form>
  </div>
  </div>
  
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

import Note from "../entity/participant";
import User from "../entity/User";

@Component({ name: "note-page" })
export default class NotePage extends Vue {
  public data: Array<Note> = [];

  public note: Note | null = null;

  public isLoading: boolean = false;

  public hasSubmit: boolean = false;

  public get isValid(): boolean {
    return (
      this.note != null &&
      this.note.title !== "" &&
      this.note.description !== "" &&
      this.note.content !== ""
    );
  }

  public mounted() {
    this.doReset();
  }

  public doReset() {
    this.hasSubmit = false;
    this.isLoading = false;

    this.note = null;

    this.doFind();
  }

  public doFind() {
    this.isLoading = true;

    //@ts-ignore
    const user: User = this.$doCookieOperation("session");

    axios
      .get("http://192.168.0.152:9000/notes", {
        headers: { Authorization: user.token }
      })
      .then(response => {
        if (
          response.data.status == "200" &&
          Array.isArray(response.data.data)
        ) {
          this.data = response.data.data;
        }
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  public doAddOrEdit(note?: Note) {
    this.note = note ? note : new Note();
  }

  public doDelete(note: Note) {
    if (!this.isLoading && note.id) {
      if (confirm("are you sure to delete " + note.title + " ?")) {
        this.isLoading = true;

        //@ts-ignore
        const user: User = this.$doCookieOperation("session");

        this.handleResponse(
          axios.delete("http://192.168.0.152:9000/notes/" + note.id, {
            headers: { Authorization: user.token }
          })
        );
      }
    }
  }

  public doSave(event: Event): void {
    event.preventDefault();

    this.hasSubmit = true;

    if (!this.isLoading && this.note != null) {
      if (this.isValid) {
        this.isLoading = true;

        //@ts-ignore
        const user: User = this.$doCookieOperation("session");

        this.handleResponse(
          axios.request({
            url: "http://192.168.0.152:9000/notes",
            method: this.note.id ? "PUT" : "POST",
            headers: { Authorization: user.token },
            data: this.note
          })
        );
      } else {
        this.$notify({
          group: "default",
          type: "error",
          title: "Note",
          text: "Please fill all field"
        });
      }
    }
  }

  public handleResponse(promise: Promise<any>) {
    promise
      .then(() => {
        this.$notify({
          group: "default",
          type: "success",
          title: "Note",
          text: "Success!"
        });

        this.doReset();
      })
      .catch(error => {
        this.$notify({
          group: "default",
          type: "error",
          title: "Note",
          text: error.toString()
        });
      });
  }
}
</script>




<style >
@import url("https://fonts.googleapis.com/css?family=Montserrat:500&display=swap");

* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
  font-family: "Montserrat", sans-serif;
}

body {
  background-color: #edf1f8;
}

.wrapper {
  display: flex;
  position: relative;
}

.wrapper .sidebar {
  width: 250px;
  height: 100%;
  background: white;
  padding: 30px 0px;
  position: fixed;
}

.wrapper .sidebar .brand {
  color: whitesmoke;

  margin-bottom: 4em;
  margin-left: 1.2em;
  margin-right: 0.9em;
  display: block;
}

.wrapper .sidebar img {
  height: 30px;
}

.wrapper .sidebar ul li {
  padding: 20px;
}

.wrapper .sidebar ul li.active a {
  color: #df205b;
}

.wrapper .sidebar ul li a {
  color: lightblue;
  display: block;
}

.wrapper .sidebar ul li a .fas {
  width: 25px;
}

.wrapper .sidebar ul li:hover {
  background-color: lightcoral;
}

.wrapper .sidebar ul li:hover a {
  color: white;
}

.wrapper .main_content {
  width: 100%;
  margin-left: 260px;
}

.wrapper .main_content .container {
  margin: 60px;
  line-height: 25px;
  color: black;
}

.wrapper .main_content .container div {
  margin-bottom: 30px;
}

/*table ma broo*/
.container .semua {
  background-color: white;
  border-radius: 7px;
  position: relative;
  padding-bottom: 30px;
}

.container .semua .header-table {
  background: #f5f8fc;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  height: 80px;
}

.container .title {
  float: left;
  height: inherit;
  padding: 21px;
}

.container .button {
  float: right;
  width: 50%;
  padding: 21px;
  list-style: none;
  height: inherit;
  display: flex;
  flex-direction: row;
}

.header-table .button input {
  height: 40px;
  margin-bottom: 20px;
  border: 1px;
  color: 1px solid black;
  width: 80%;
  border-radius: 5px;
  padding-left: 1rem;
  transition: box-shadow 0.5s ease;
  margin-right: 15px;
}

.header-table .button input::placeholder {
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  font-size: 14px;
  color: lightblue;
}

.header-table .button button {
  height: 40px;
  padding: auto;
  width: 60%;
  border-radius: 5px;
  color: white;
  background-color: #36c4ed;
  border: none;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: box-shadow 0.5s ease;
}

.header-table .button button:hover {
  box-shadow: 0px 0px 10px #36c4ed;
  background-color: lightblue;
}

.content-table tbody button.error {
  background-color: crimson;
  border: none;
  color: white;
  font-size: 16px;
  padding: 4px;
  border-radius: 7px;
  text-decoration: none;
  cursor: pointer;
}

.content-table tbody button.error:hover {
  box-shadow: 0px 0px 10px red;
  background-color: crimson;
}

.content-table tbody .pass {
  background-color: #32b67f;
  border-radius: 5px;
  padding: 4px;
  padding-left: 7px;
  padding-right: 7px;
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;
  color: white;
  cursor: pointer;
}

.content-table {
  border-collapse: collapse;
  margin-top: 600pxs;
  margin-bottom: 10px;
  font-size: 0.9em;
 font-family: "Montserrat", sans-serif;
  min-width: 1000px;
  margin: 10px;
  margin-left: 300px;
  background-color: white;
  overflow: hidden;
}

.button{
  margin-left: 450px;
  margin-top: 150px;
}

.content-table thead tr {
  text-align: left;
}

.content-table thead tr th {
  font-weight: normal;
}

.content-table th,
.content-table td {
  padding: 12px 35px;
  font-weight: bold;
}


.form-add{

  display: flex;
  flex-direction: column;
  margin-left: 450px;
  margin-top: 20px;
  width: 90%;
  box-shadow: #36c4ed;
  font-family: "Montserrat", sans-serif;
 
  

}

.form-add input, textarea{
  height: 40px;
    margin-bottom: 20px;
    margin-top: 10px;
    border: 1px solid lightgray;
    width: 70%;
    border-radius: 5px;
    padding-left: 1rem;
    transition: box-shadow 0.5s ease;
    box-shadow: 0px 0px 10px lightseagreen;
    

}


.cancel{
    margin-left: 72%;
    margin-bottom: 20px;
    background-color: #e9b02a;
    padding: 9px;
    width: 130px;
    border-radius: 5px;
    font-family: "Montserrat", sans-serif;
    font-size: 14px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: box-shadow 0.5s ease;
    border: none;
    text-decoration: none;
        
    
    
} 

.cancel:hover{
    box-shadow:  0px 0px 10px #e9b02a;
    background-color:#e9b02a;
}

.save{
    background-color:#df205b;
    margin-left: 72%;
    padding: 9px;
    width: 130px;
    border-radius: 7px;
    font-family: "Montserrat", sans-serif;
    font-size: 14px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: box-shadow 0.5s ease;
    border: none;
    
}

.save:hover{
    box-shadow:  0px 0px 10px crimson;
    background-color: crimson;
}

.h2{
  font-size: 30px;
  color: gray;
  margin-left: 70%;
  padding: 30px;
  width: 60%;
  margin-top: 50px;
  font-weight: bolder;
}
.button button{
    height: 40px;
    padding: auto;
    width:20%;
    border-radius: 5px;
    color: white;
    background-color: #36c4ed;
    border: none;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: box-shadow 0.5s ease;
}

button:hover{
    box-shadow: 0px 0px 10px #36c4ed;
    background-color: lightblue;
}

.button input{
    height: 40px;
    margin-bottom: 20px;
    border: 1px;
    color: 1px solid black;
    width: 40%;
    border-radius: 5px;
    padding-left: 1rem;
    transition: box-shadow 0.5s ease;
    margin-right: 15px;
}

button.error{
    background-color: crimson;
    border: none;
    color: white;
    font-size: 16px;
    padding: 4px;
    border-radius: 7px;
    text-decoration: none;
    cursor: pointer;
}
button.pass{
    background-color: #32b67f;
    border-radius: 5px;
    padding: 4px;
    padding-left: 7px;
    padding-right: 7px;
    text-decoration: none;
    font-size: 14px;
    font-weight: bold;
    color: white;
    cursor: pointer;

}
</style>

