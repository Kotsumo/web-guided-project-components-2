// Imports at the top of the file!
// We never nest imports inside blocks of code!
import axios from 'axios'


// 👉 TASK 1- Test out the following endpoints:

//  https://lambda-times-api.herokuapp.com/friends
//  https://lambda-times-api.herokuapp.com/friends/1
//  https://lambda-times-api.herokuapp.com/quotes
//  https://lambda-times-api.herokuapp.com/cards
//  https://lambda-times-api.herokuapp.com/breeds
//  https://dog.ceo/api/breeds/image/random

//  * With HTTPie (command-line HTTP Client)
//  * With Postman (HTTP Client with GUI)
//  * With Chrome and the Network Tab
//  * With JS using the native fetch [STRETCH]
// axios.get('https://lambda-times-api.herokuapp.com/pizza')
//   .then(response => {
//     console.log(response.data)
//   })
//   .catch(err => {
//     console.log(err)
//   })
//   .then(() => {
//     console.log('Always fire ')
//   })



// 👉 TASK 2- Select the "entry point", the element
// inside of which we'll inject our dog cards 
const entryPoint = document.querySelector(".entry")



// 👉 TASK 3- `dogCardMaker` takes an object and returns a Dog Card.
// Use this function to build a Card, and append it to the entry point.
function dogCardMaker({ imageURL, breed }) {
  // instantiating the elements
  const dogCard = document.createElement('div')
  const image = document.createElement('img')
  const heading = document.createElement('h3')
  // setting class names, attributes and text
  heading.textContent = `Breed: ${breed}`
  image.src = imageURL
  image.classList.add('dog-image')
  dogCard.classList.add('dog-card')
  // creating the hierarchy
  dogCard.appendChild(image)
  dogCard.appendChild(heading)
  // adding some interactivity
  dogCard.addEventListener('click', () => {
    dogCard.classList.toggle('selected')
  })
  // never forget to return!
  return dogCard
}


// 👉 TASK 4- Bring the Axios library into the project using one of two methods:
//    * Traditional way: put another script tag inside index.html (`https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js`)
//    * Proyects with npm: install it with npm and import it into this file


// 👉 TASK 5- Fetch dogs from `https://dog.ceo/api/breed/{breed}/images/random/{number}`
// 👉 TASK 5- Fetch dogs from `https://dog.ceo/api/breed/germanshepherd/images/random/7`
//    * ON SUCCESS: use the data to create dogCards and append them to the entry point
//    * ON FAILURE: log the error to the console
//    * IN ANY CASE: log "done" to the console
axios
  .get( `https://dog.ceo/api/breed/corgi/images/random/1` )
  .then(( response ) => {
    const images = response.data.message;

    images.forEach(( image ) => {
      const dogCard = dogCardMaker({ imageURL: image, breed: "corgi" });
      entryPoint.append( dogCard );
    });

  })
  .catch(( err ) => {
    console.log( err, "this is the error");
  })
  .then(() => {
    console.log('done');
  }) 
// 👉 (OPTIONAL) TASK 6- Wrap the fetching operation inside a function `getDogs`
// that takes a breed and a count (of dogs)
function getDogs(breed, count) {
  axios.get(`https://dog.ceo/api/breed/${breed}/images/random/${count}`)
    .then(response => {
      const images = response.data.message;

      images.forEach(( image ) => {
        const dogCard = dogCardMaker({ imageURL: image, breed: breed });
        entryPoint.append( dogCard );
      });
    })
    .catch(err => {
      console.log(err);
    })
}
getDogs('boxer', 2)



// 👉 (OPTIONAL) TASK 7- Put a button in index.html to 'get dogs' and add a click
// event listener that executes `getDogs`
// const makeDogButton = document.createElement('button');
// const buttonEntry = document.querySelector('.container h3');
// makeDogButton.textContent = "Get More Dogs"
// makeDogButton.style.display = 'block';
// buttonEntry.appendChild(makeDogButton);
// makeDogButton.addEventListener('click', event => {
//   getDogs('wolfhound', '10');
// })
document.querySelector('button').addEventListener('click', evt => {
  getDogs('mastiff', 3)
  getDogs('appenzeller', 3)
})


// 👉 (OPTIONAL) TASK 8- Import the breeds from `breeds.js`
// or request them from https://lambda-times-api.herokuapp.com/breeds
// and loop over them, fetching a dog at each iteration
