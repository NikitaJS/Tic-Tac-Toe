export default {
	props: ['cell'],
	render() {
		const inAttrs = { label: this.cell.state.label };
		return (
			<div vOn:click={() => this.$emit('click', this.cell.id)} class="cell"><cell {...{ attrs: inAttrs }}   ></cell></div>
		)
	}
}
