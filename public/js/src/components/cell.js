export default {
	props: ['label'],
	render()  {
		return <div class={'cell-' + this.label}></div>
	}
}
