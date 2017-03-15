var date= new Date()
alert(date)
$(document).ready(function(){
	
	$('#my_table .aaa').dblclick(function() {
		console.log("haha")
	  if( $(this).attr('contenteditable') !== undefined ){
	    $(this).removeAttr('contenteditable');
	  }else{
	    $(this).attr('contenteditable', '');
	  };
	});
	
});