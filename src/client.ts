const href = window.location.href
const apiWebRoot = "api/1.0"

document.addEventListener("DOMContentLoaded", () => {
	const buttonGroups = document.getElementsByClassName("btn-group") as HTMLCollectionOf<HTMLDivElement>

	for (let group of buttonGroups) {
		const lightId = parseInt(group.dataset.light!)
		const onButton = group.getElementsByClassName("onButton")[0] as HTMLButtonElement
		const offButton = group.getElementsByClassName("offButton")[0] as HTMLButtonElement
		const blinkButton = group.getElementsByClassName("blinkButton")[0] as HTMLButtonElement
		const stopBlinkButton = group.getElementsByClassName("stopBlinkButton")[0] as HTMLButtonElement
		const intervalTimeInput = group.getElementsByClassName("intervalTimeInput")[0] as HTMLInputElement

		onButton.addEventListener("click", () => {
			switchOn(lightId, onButton, offButton, blinkButton, stopBlinkButton)
		})
		offButton.addEventListener("click", () => {
			switchOff(lightId, onButton, offButton, blinkButton, stopBlinkButton)
		})
		blinkButton.addEventListener("click", () => {
			blink(lightId, blinkButton, stopBlinkButton, intervalTimeInput)
		})
		stopBlinkButton.addEventListener("click", () => {
			stopBlink(lightId, blinkButton, stopBlinkButton)
		})
	}

	function switchOn(lightId: number, onButtons: HTMLButtonElement, offButtons: HTMLButtonElement, blinkButton: HTMLButtonElement, stopBlinkButton: HTMLButtonElement) {
		fetch(href + apiWebRoot + "/on/" + lightId, {
			method: "POST"
		}).then((response) => {
			if (response.status === 200) {
				onButtons.classList.add("btn-primary")
				offButtons.classList.remove("btn-primary")
				blinkButton.classList.remove("d-hide")
				stopBlinkButton.classList.add("d-hide")
			} else {
				console.log("server error", response.status)
			}
		})
	}

	function switchOff(lightId: number, onButtons: HTMLButtonElement, offButtons: HTMLButtonElement, blinkButton: HTMLButtonElement, stopBlinkButton: HTMLButtonElement) {
		fetch(href + apiWebRoot + "/off/" + lightId, {
			method: "POST"
		}).then((response) => {
			if (response.status === 200) {
				offButtons.classList.add("btn-primary")
				onButtons.classList.remove("btn-primary")
				blinkButton.classList.remove("d-hide")
				stopBlinkButton.classList.add("d-hide")
			} else {
				console.log("server error", response.status)
			}
		})
	}

	function blink(lightId: number, blinkButton: HTMLButtonElement, stopBlinkButton: HTMLButtonElement, intervalTimeInput: HTMLInputElement) {
		const intervalTime = parseInt(intervalTimeInput.value)
		let intervalQuery = ""

		if (intervalTime && !isNaN(intervalTime)) {
			intervalQuery = "?intervalTime=" + intervalTime
		}

		fetch(href + apiWebRoot + "/blink/" + lightId + intervalQuery, {
			method: "POST"
		}).then((response) => {
			if (response.status === 200) {
				blinkButton.classList.add("d-hide")
				stopBlinkButton.classList.remove("d-hide")
			} else {
				console.log("server error", response.status)
			}
		})
	}

	function stopBlink(lightId: number, blinkButton: HTMLButtonElement, stopBlinkButton: HTMLButtonElement) {
		fetch(href + apiWebRoot + "/stopBlink/" + lightId, {
			method: "POST"
		}).then((response) => {
			if (response.status === 200) {
				blinkButton.classList.remove("d-hide")
				stopBlinkButton.classList.add("d-hide")
			} else {
				console.log("server error", response.status)
			}
		})
	}
})