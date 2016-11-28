<template>
	<div class="header">
		<span>All Tags:</span>
		<ul class="tags">
  			<li v-for="tag in tags">{{tag}}</li>
		</ul>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				//tags: 'Yang'
			}
		},
		props:['tags'],
		methods:{
		}
	}
</script>

<style lang="sass">
	.header{
		width:650px;
		margin: 0 auto;
		display:block;
		font-size:24px;
		color:#fff;
		background-color:#202023;
		text-align:center;
		padding: 20px 0px;
	}
	ul.tags{
		display: block;
		li{
			font-size:18px;
			display: inline-block;
			padding:10px 25px;
			background-color:#5785C7;
			margin: 0px 5px;
		}		
	}


</style>