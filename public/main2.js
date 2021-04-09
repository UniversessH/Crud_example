const axios = require("axios")
const { response } = require("express")
const qs = require("qs")
const update = document.querySelector('#update-button')
const delete_ = document.querySelector('#delete_button')
//由于main.js是暴露给浏览器的，所以并不能使用cjs的require,此处通过browserify将其转化为bundle.js从而可以使用require
//const { response } = require("express")

update.addEventListener('click', _ => {
  axios({
    method: "PUT",
    url: "/quotes",
    data: JSON.stringify({
      name: "Deer",
      quote: "File has been changed"
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