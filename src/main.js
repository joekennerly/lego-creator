const outputContainer = document.querySelector('#output-container')

fetch("http://localhost:3000/journalEntries")
  .then(jsonData => jsonData.json())
  .then(convertedData => {
    convertedData.forEach(entry => {
      addToDom(makeString(entry))
    })
})

// Takes an object, converts it to an html string literal
function makeString(createdObject) {
  return `
  <section class="legoElement">
    <p>${createdObject.creator} made a ${createdObject.color} ${createdObject.shape} for the ${createdObject.creation}</p>
  </section>
  `
}

// Takes a string, adds it to the output-container div
function addToDom(aString) {
  outputContainer.innerHTML += aString
}

// Event handler on clicking 'Save Lego Creation'
document.querySelector(".lego-save").addEventListener("click", event => {
  event.preventDefault()

  const legoToSave = {
    creator: document.querySelector("#lego-creator").value,
    color: document.querySelector("#lego-color").value,
    shape: document.querySelector("#lego-shape").value,
    creation: document.querySelector("#lego-creation").value
  }

  fetch("http://localhost:3000/journalEntries", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(legoToSave)
  })

})