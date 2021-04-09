import axios from 'axios'
//const { response } = require("express")
const update = document.querySelector('#update-button')
const delete_ = document.querySelector('#delete_button')

update.addEventListener('click', _ => {
  axios({
    method: "PUT",
    url: "/quotes",
    data: JSON.stringify({
      name: "Deer",
      quote: "File has been"
    }),
    headers: {"Content-type": "application/json"}
  })
    .then((response) => {
      console.log("post success")
    })
    .catch((error) => {
      console.log("bad post_Req")
    })
})

delete_.addEventListener('click', _ => {
  axios({
    method: "delete",
    url : "/quotes",
    data: JSON.stringify({
      name: 'Deer'
    }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then((response) => {
      console.log("delte success")
    })
    .catch((error) => {
      console.log("bad_delete_req")
    })
})
