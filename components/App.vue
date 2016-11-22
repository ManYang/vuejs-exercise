<template>
	<div>
		<div class="appName">Put your name here:<input v-model="username"></div>
		<todo-header v-bind:message="username"></todo-header>
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