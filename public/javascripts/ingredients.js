$( document ).ready(function() {
    $(".add").click(function(){
    	var $row = $(this).closest("tr");
    	var $name = $row.find(".name").text();
        console.log($name);
        var $quantity = Number($row.find(".quan").text());
        var ingredient = {
            name: $name,
        };

        $.post('ingredients/update', ingredient, function(data, status){
            console.log($quantity+5)
            $row.find(".quan").html(String($quantity+5));
        });
	});
});
	