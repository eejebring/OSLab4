import onoff from "onoff"

const Gpio = onoff.Gpio

export class LightControl {
	//private light: onoff.Gpio
	private state: boolean = false
	private pin: number

	constructor(pin: number) {
		//this.light = new Gpio(pin, "out")
		this.pin = pin
	}

	public getState() {
		return this.state
	}

	public setState(state: boolean) {
		this.state = state
		console.log("light: ", this.pin, " turned " + (this.state ? "on!" : "off!"))
	}

	public toggle() {
		this.state = !this.state
		//this.light.writeSync(this.state ? 1 : 0)
	}
}
