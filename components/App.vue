<template>
	<div>
		<todo-tag :tags="taglist"></todo-tag>
		{{oriTagList}}
		<todo-list :ori-tag-list.sync="oriTagList"></todo-list>
	</div>
</template>

<script>
	import todoList from './todoList.vue'
	import todoTag from './todoTag.vue'
	export default{
		data(){
			return {
				taglist:'123',
				oriTagList:"456"
			}
		},
		components:{
			'todoTag':todoTag,
			'todoList':todoList
		}
	}
</script>

<style lang="sass">
	div{
	    font-family:Helvetica;
	}
</style>