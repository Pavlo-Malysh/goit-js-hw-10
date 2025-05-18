
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form")

form.addEventListener("submit", (e) => {
  e.preventDefault()

  const delay = Number(e.target.elements.delay.value)

  let radioBtnValue = e.target.elements.state.value

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (radioBtnValue.includes('fulfilled')) {
        resolve(delay)
      } else {
        reject(delay)
      }
    }, delay)
  })

  promise.then(() => {
    iziToast.show({
      message: `✅ Fulfilled promise in ${delay}ms`,
      messageColor: 'white',
      position: "topRight",
      backgroundColor: 'rgb(53, 162, 78)',
      color: 'white',
      progressBar: false,
      maxWidth: 500,
    })
  }).catch(() => {
    iziToast.show({
      message: `❌ Rejected promise in ${delay}ms`,
      messageColor: 'white',
      position: "topRight",
      backgroundColor: 'rgb(218, 97, 97)',
      color: 'white',
      progressBar: false,
    })
  })

  form.reset();
})

