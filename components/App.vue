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
	.appName{
	    width:100%;
		display:block;
		font-size:30px;
		color:#fff;
		background-color:#202023;
		text-align:center;
		margin:10px 0px;
		padding: 10px;
	}
	input {
  		font-size:30px;
  		font-family:'Open Sans', sans-serif;
  		height:36px;
  		display:inline-block;
  		border-radius:100px;
  		padding-left:15px; //for input cursor
  		background-color:#202023;
  		border:0;
  		color:#fff;
    	box-shadow: 0px 0px 1pt 1pt #999999;
 		background-color:#111216; 
}
</style>