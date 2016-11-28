<template>
	<div>
		<div class="filter appName">Tag Filter:  <input v-model="filterText" type="text" debonce="500"></div>
		<todo-tag :tags="filteredList"></todo-tag>
		<todo-list v-on:update-from-todo="update"></todo-list>
	</div>
</template>

<script>
	import todoList from './todoList.vue'
	import todoTag from './todoTag.vue'
	export default{
		data(){
			return {
				taglist:"",
				filterText:"",
				filteredList:""
			}
		},
		methods:{
			update(msg){
				this.taglist=msg;
				this.filteredList=msg;
			}

		},
		components:{
			'todoTag':todoTag,
			'todoList':todoList
		},
		watch:{
			'filterText':function(newVal, oldVal){
				if(newVal != oldVal){
					this.filteredList =this.taglist.filter(function(obj){
							return obj.trim() && obj.indexOf(newVal) !=-1
					})
				}
				console.log(this.filteredList);
			}
		}
	}
</script>

<style lang="sass">
	div{
	    font-family:Helvetica;		
	}
	.filter{
		text-align: center;
		margin: 0 auto;
		input{
  			font-size:30px;
  			font-family:'Open Sans', sans-serif;
  			height:36px;
  			display:inline-block;
  			border-radius:5px;
  			padding-left:15px; //for input cursor
  			background-color:#202023;
  			border:0;
  			color:#fff;
    		box-shadow: 0px 0px 1pt 1pt #999999;
 			background-color:#111216; 			
		}
	}
	.appName{
		width:650px;
		display:block;
		font-size:30px;
		color:#fff;
		background-color:#202023;
		text-align:center;
		padding-top:20px;
		margin:0px auto;
	}
</style>