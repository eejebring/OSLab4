console.log("hello world")
const href = window.location.href
const apiWebRoot = "api/1.0"

document.addEventListener("DOMContentLoaded", () => {
	const onButton = document.getElementById("onButton")!
	const offButton = document.getElementById("offButton")!

	onButton.addEventListener("click", switchOn)
	offButton.addEventListener("click", switchOff)

	function switchOn() {
		fetch(href + apiWebRoot + "/on", {
			method: "POST"
		}).then((response) => {
			if (response.status === 200) {
				console.log("turned on!")
				onButton.classList.add("btn-primary")
				offButton.classList.remove("btn-primary")
			}
		})
	}

	function switchOff() {
		fetch(href + apiWebRoot + "/off", {
			method: "POST"
		}).then((response) => {
			if (response.status === 200) {
				console.log("turned off!")
				offButton.classList.add("btn-primary")
				onButton.classList.remove("btn-primary")
			}
		})
	}
})