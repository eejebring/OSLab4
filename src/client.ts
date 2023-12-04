console.log("hello world")
const href = window.location.href
const apiWebRoot = "api/1.0"

document.addEventListener("DOMContentLoaded", () => {
	const buttonGroups = document.getElementsByClassName("btn-group") as HTMLCollectionOf<HTMLDivElement>

	for (let group of buttonGroups) {
		const lightId = parseInt(group.dataset.light!)
		const onButtons = group.getElementsByClassName("onButton")[0] as HTMLButtonElement
		const offButtons = group.getElementsByClassName("offButton")[0] as HTMLButtonElement

		onButtons.addEventListener("click", () => {
			switchOn(lightId, onButtons, offButtons)
		})
		offButtons.addEventListener("click", () => {
			switchOff(lightId, onButtons, offButtons)
		})
	}

	function switchOn(lightId: number, onButtons: HTMLButtonElement, offButtons: HTMLButtonElement) {
		fetch(href + apiWebRoot + "/on/" + lightId, {
			method: "POST"
		}).then((response) => {
			if (response.status === 200) {
				onButtons.classList.add("btn-primary")
				offButtons.classList.remove("btn-primary")
			}
		})
	}

	function switchOff(lightId: number, onButtons: HTMLButtonElement, offButtons: HTMLButtonElement) {
		fetch(href + apiWebRoot + "/off/" + lightId, {
			method: "POST"
		}).then((response) => {
			if (response.status === 200) {
				offButtons.classList.add("btn-primary")
				onButtons.classList.remove("btn-primary")
			}
		})
	}
})