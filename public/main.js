var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var thumbDown = document.getElementsByClassName("fa-thumbs-down");
var heart = document.getElementsByClassName("fa-heart")
var book = document.getElementsByClassName("fa-book")
var trash = document.getElementsByClassName("fa-trash");

//when i click on a trash can, i'm going to delete
// var trash = document.getElementsByClassName("fa-trash");

Array.from(thumbUp).forEach(function(element) {
  console.log(Array)
  console.log(thumbUp)
  console.log(element)
      element.addEventListener('click', function(){
        console.log(element)
        const name = this.parentNode.parentNode.childNodes[1].innerText
        console.log(name)
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[9].innerText)
        console.log(thumbUp)
        fetch('messagesUp', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'msg': msg,
            'thumbUp':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(thumbDown).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText// parent(elemet wrapping the elemet) node coming from this
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        const thumbDown = parseFloat(this.parentNode.parentNode.childNodes[13].innerText)
        console.log(thumbDown)
        fetch('messages/messagesDown', {//making an api request to our own api by triggering
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({//sending json containing name and message by passing along a the name and message below
            'name': name,
            'msg': msg,
            'thumbDown':thumbDown
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(heart).forEach(function(element) {
  element.addEventListener('click', function(){
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const msg = this.parentNode.parentNode.childNodes[3].innerText
    const heart = parseFloat(this.parentNode.parentNode.childNodes[17].innerText)
    fetch('messages/messagesHeart', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'name': name,
        'msg': msg,
        'heart':heart
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
  console.log("works")
});

Array.from(book).forEach(function(element) {
  element.addEventListener('click', function(){
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const msg = this.parentNode.parentNode.childNodes[3].innerText
    const book = parseFloat(this.parentNode.parentNode.childNodes[21].innerText)
    fetch('messages/messagesBook', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'name': name,
        'msg': msg,
        'book':book
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
