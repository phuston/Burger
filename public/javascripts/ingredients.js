$( document ).ready(function() {
    $(".add").click(function(){
    	var $row = $(this).closest("tr");
    	var $name = $row.find(".name").text();
        console.log($name);
        var $quantity = Number($row.find(".quan").text());
        var ingredient = {
            name: $name
        };

        $.post('ingredients/update', ingredient, function(data, status){
            console.log($quantity+5)
            $row.find(".quan").html(String($quantity+5));
        });
	});

    $(".remove").click(function(){
        var $row = $(this).closest("tr");
        var $name = $row.find(".name").text();

        var ingredient = {
            name: $name
        };

        $.post('ingredients/remove', ingredient, function(data, status){
            $row.remove();  
        });
    })

    $("#new").submit(function(event){
        event.preventDefault();

        var $row = $("#new");

        var $name = $row.find("[name=name]").val();
        var $cost = $row.find("[name=cost]").val();
        var $quan = $row.find("[name=quantity]").val();

        console.log($name)
        console.log($cost)
        console.log($quan)

        var ingredient = {
            name: $name,
            cost: $cost,
            quantity: $quan
        }

        $.post('ingredients/add', ingredient, function(data, status){
            console.log(data)
            if(data.Insert){
                $('#ingredients tbody').append(data.row);
            }
        })
    })
});
	