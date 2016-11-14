<template>
<div>
	<h1>{{title}}</h1>
	<div class="todolist">
		<label>Name</label><input v-model="newListName" lazy></input>
		<label>Note</label><input v-model="newListNote" lazy></input>
		<div v-on:click="addNew">add new</div>
		<ul>
		<li v-for="item in items" track-by="$index" v-bind:class="{finished: item.completed}" v-on:click="	toggle(item)">
			<h2>Name: <input v-model="item.name"></h2>
			<span>Notes: <input v-model="item.note"></span>
			<span>Last Modified: {{item.updated_at}}</span>
			<div v-on:click="updateItem(item)">update</div>
			<div v-on:click="deleteItem(item)">delete</div>
		</li>
		</ul>
		<div v-on:click="getAll">get all todo list</div>		
	</div>
</div>
</template>

<script>
export default {
	data () {
		return {
			title: 'This is a todo list',
			items:'',
			newListName:"",
			newListNote:""
		}
	},
	methods:{
		toggle(item){
			item.completed = !item.completed;			
		},
		getAll(){
			var self = this;
			var xhr = new XMLHttpRequest();
			xhr.open('GET', 'http://localhost:8888/list', false);
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.onreadystatechange = function () {
					if (xhr.readyState == 4) {
							if (xhr.status == 200) {
									self.$set("items",JSON.parse(xhr.response));
							}
					}
			};
			xhr.send(null);
		},    
		addNew(){
			var obj = {
				'name':this.newListName,
				'completed':false,
				'note':this.newListNote? this.newListNote: "Default",
				'updated_at':Date.now()
			}
			this.newListNote="";
			this.newListName="";
			var self = this;
			var xhr = new XMLHttpRequest();
			xhr.open('POST', 'http://localhost:8888/list', true);
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.onreadystatechange = function () {
					if (xhr.readyState == 4) {
							if (xhr.status == 200) {
									self.$set("items",JSON.parse(xhr.response));
							}
					}
			};
			xhr.send(JSON.stringify(obj));
		},
		updateItem(item){
			var obj = {
				'name':item.name,
				'completed':item.completed,
				'note':item.note,
				'updated_at':Date.now()
			}
			var self = this;
			var xhr = new XMLHttpRequest();
			xhr.open('POST', 'http://localhost:8888/list/'+item._id, true);
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.onreadystatechange = function () {
					if (xhr.readyState == 4) {
							if (xhr.status == 200) {
									self.$set("items",JSON.parse(xhr.response));
							}
					}
			};
			xhr.send(JSON.stringify(obj));
		},
		deleteItem(item){
			var self = this;
			var xhr = new XMLHttpRequest();
			xhr.open('DELETE', 'http://localhost:8888/list/'+item._id, true);
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.onreadystatechange = function () {
					if (xhr.readyState == 4) {
							if (xhr.status == 200) {
									self.$set("items",JSON.parse(xhr.response));
							}
					}
			};
			xhr.send(null);
		}
	}
}
</script>

<style lang="sass">
.completed{
	text-decoration: line-through;
}
.todolist{
	background: #fff; margin: 150px 50px 50px; 
	position: relative; 
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
}
h1 { 
	position: absolute; 
	top: 0px; width: 100%; 
	font-size: 48px; font-weight: 600; 
	text-align: center; 
	color: rgba(175, 47, 47, 0.15); 
	-webkit-text-rendering: optimizeLegibility; 
	-moz-text-rendering: optimizeLegibility; 
	text-rendering: optimizeLegibility;
	 }
</style>