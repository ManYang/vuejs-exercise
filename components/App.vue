<template>
	<div>
		<todo-header ></todo-header>
		<todo-list></todo-list>
	</div>
</template>

<script>
	import todoList from './todoList.vue'
	import todoHeader from './todoHeader.vue'
	export default{
		data(){
			return {
				msg:'123'
			}
		},
		components:{
			'todoHeader':todoHeader,
			'todoList':todoList
		}
	}
</script>

<style lang="sass">
	div{
	    font-family:Helvetica;
	}
</style>