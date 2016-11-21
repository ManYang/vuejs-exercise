<template>
	<div class="header">
		<span>Hello, {{username}}</span>
		<span>remains todo</span>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				username: 'Yang'
			}
		},
		props:['listNum'],
		methods:{
		}
	}
</script>

<style lang="sass">
	.header{
		width:100%;
		display:block;
		font-size:30px;
		color:#fff;
		background-color:#202023;
		text-align:center;
		padding: 20px 0px;
	}
</style>