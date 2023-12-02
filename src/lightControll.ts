import onoff from "onoff"

const Gpio = onoff.Gpio

class LightControll {
	private light: onoff.Gpio
	private state: boolean = false

	constructor(pin: number) {
		this.light = new Gpio(pin, "out")
	}

	public getState() {
		return this.state
	}

	public setState(state: boolean) {
		this.state = state
	}

	public toggle() {
		this.state = !this.state
		this.light.writeSync(this.state ? 1 : 0)
	}
}
