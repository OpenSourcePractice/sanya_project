function currentDate(){
	return new Date();
}

$(document).ready(function(){

	//При загрузке страницы
	
	var dataArray = JSON.parse(localStorage.getItem("data"));
    
    if(dataArray!==null){ 
    	for (var i = 0; i < dataArray.length; i++) {    		
        $('#my_table').append("<tr data-id="+dataArray[i].id+">\
        	<td><label><input class='checkbox_class' type='checkbox' "+(dataArray[i].done?"checked":"")+"></input></label></td>\
    		<td class='editable_cell'>"+dataArray[i].title+"</td>\
    		<td class='editable_cell'>"+dataArray[i].author+"</td>\
    		<td>"+dataArray[i].updated+"</td>\
    		<td><button class='delete_button'>Удалить</button></td>\
   		 </tr>");
	    }  
	}

	//Добавить
    $('#add').click(function () {
    	console.log("added")
    	temp_date = currentDate();
    	var obj = {
		    id: +temp_date,
		    title: $('#title').val(),		   
		    author: $('#author').val(),
		    done: false,
		    updated: temp_date
		};		
		
		
		var dataArray = JSON.parse(localStorage.getItem("data"));
		
		//Если пришел null 
		if(dataArray===null){
			dataArray = [];//Создаем пустой массив
		}
		dataArray[dataArray.length] = obj;

		var serialObj = JSON.stringify(dataArray); //сериализуем его 
		localStorage.setItem("data", serialObj); //запишем его в хранилище по ключу "myKey"
		
    	 $('#my_table').append("<tr data-id="+obj.id+">\
        	<td><label><input class='checkbox_class' type='checkbox'></input></label></td>\
    		<td class='editable_cell'>"+obj.title+"</td>\
    		<td class='editable_cell'>"+obj.author+"</td>\
    		<td>"+temp_date+"</td>\
    		<td><button class='delete_button'>Удалить</button></td>\
   		 </tr>");   



    });


	//Удаление записи
	$('#my_table').on('click', '.delete_button', function() {
    	console.log("deleted");
        var tr = $(this).closest('tr');
        
        //Удалить из local storage -----------------------------
		var dataArray = JSON.parse(localStorage.getItem("data"));//Берем массив из local storage        
        //Ищем элемент в local storage по id
        for( i=0; i<dataArray.length; i++) {        	
		    if( dataArray[i].id == tr.attr('data-id')){
		    	console.log('delete - ' + dataArray[i]);
		    	dataArray.splice(i,1);//Удаляем
		    	break;
		    } 
		}
		var serialObj = JSON.stringify(dataArray); //сериализуем его 
		localStorage.setItem("data", serialObj); //запишем его в хранилище по ключу "myKey"

        tr.css("background-color","#FF3700");
        tr.fadeOut(400, function(){
            tr.remove();
        });
        return false;
    });
	

    //КЛик на чекбокс TODO
    $('.checkbox_class').on('change', function(){ 
	   var dataArray = JSON.parse(localStorage.getItem("data"));
	   var tr = $(this).closest('tr');

	   for( i=0; i<dataArray.length; i++) {
		    if( dataArray[i].id == tr.attr('data-id')){
		    	dataArray[i].done = $(this).prop('checked');
		    	dataArray[i].updated = currentDate();
		    	break;
		    } 
		}
		var serialObj = JSON.stringify(dataArray); //сериализуем его 
		localStorage.setItem("data", serialObj); //запишем его в хранилище по ключу "myKey"
	});
    


	//Изменение ячейки строки TODO
	$('#my_table').on('dblclick', '.editable_cell', function() {
  		var OriginalContent = $(this).text();
  		var tr = $(this).closest('tr');
  		tr.children().eq(3).text(currentDate());//Меняем дату
	    var inputNewText = prompt("Enter new content for:", OriginalContent);

	    if(inputNewText==""){
	    	alert("Enter text, please!")
	    }else if (inputNewText!=null){
	    	//Меняем на форме-----
	    	$(this).text(inputNewText)
	    	//Меняем в local storage
	    	console.log("parse array for update")
	    	var dataArray = JSON.parse(localStorage.getItem("data"));
	    	for( i=0; i<dataArray.length; i++) {
			    if( dataArray[i].id == tr.attr('data-id')){
			    	if($(this).index()==1){
			    		dataArray[i].title = inputNewText;
			    	}else if($(this).index()==2){
			    		dataArray[i].author = inputNewText;
			    	}
			    	dataArray[i].updated = currentDate();
			    	break;
			    } 
			}
			var serialObj = JSON.stringify(dataArray); //сериализуем его 
			localStorage.setItem("data", serialObj); //запишем его в хранилище по ключу "myKey"
			console.log("local storage updated");
			
	    }      
	});
	
});



//<td><label><input class='checkbox_class' type='checkbox' "+(dataArray[i].done?"checked":"")+">"+(dataArray[i].done?"Done":"Undone")+"</input></label></td>\