const urlForm = document.getElementById("url-form")

const notyf = new Notyf({
  duration: 2500,
  position: {
    x: "center",
    y: "top",
  }
})

function copyUrl() {
  const copyText = document.getElementById("shortened-url")

  try {
    navigator.clipboard.writeText(copyText.innerHTML)
    notyf.success("Link copiado!")
  } catch (err) {
    notyf.error("Ops, não foi possível copiar o link.")
    console.error(err)
  }
}

async function showUrl(url) {
  const main = document.querySelector("main")
  const section = document.querySelector("section")

  if (section) main.removeChild(section)

  const newSection = document.createElement("section")
  const newUrl = document.createElement("a")
  const newButton = document.createElement("button")

  newUrl.href = url
  newUrl.target = "_blank"
  newUrl.id = "shortened-url"
  newUrl.innerHTML = url

  newButton.onclick = copyUrl
  newButton.id = "copyButton"
  newButton.innerText = "Copiar link"

  main.appendChild(newSection)
  newSection.appendChild(newUrl)
  newSection.appendChild(newButton)

  notyf.success("Link encurtado!")
  urlForm.reset()
}

urlForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  const url = document.getElementById("url").value

  try {
    const response = await fetch("/shorter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url })
    })
    const responseJson = await response.json()

    if (response.status !== 200) {
      urlForm.reset()

      return notyf.error(responseJson.error)
    }

    await showUrl(responseJson.url)
  } catch (err) {
    return notyf.error("Ocorreu um erro no servidor.\n" + err)
  }
})
