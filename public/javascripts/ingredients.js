$( document ).ready(function() {
    $("#editContainer").hide()

    $(".add").click(function(){
    	var $row = $(this).closest("tr");
    	var $name = $row.find(".name").text();
        console.log($name);
        var $quantity = Number($row.find(".quan").text());
        var ingredient = {
            name: $name
        };

        $.post('ingredients/add', ingredient, function(data, status){
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

    $(".edit").click(function(){
        var $row = $(this).closest("tr");
        var $name = $row.find(".name").text();

        $("#editTitle").html($name)
        $("#editContainer").show();
    })

    $("#editSubmit").click(function(){
        // alert("Hello")
        var $name = $("#editTitle").text();
        var $price = $("#editPrice").val();
        var $quantity = $("#editQuantity").val();

        var ingredient = {
            name: $name,
            price: $price,
            quantity: $quantity
        };

        console.log(ingredient)

        $.post('/ingredients/edit', ingredient, function(data, status){
            $("#editPrice").val('')
            $("#editQuantity").val('')
            $("#editContainer").hide()
            alert("Ingredient edit successful.")

            var tableRow = $("td").filter(function() {
                return $(this).text() == $name;
            }).closest("tr");

            tableRow.find(".quan").html($quantity);
            tableRow.find(".cost").html($price);
        })
    })

    $("#new").submit(function(event){
        event.preventDefault();

        var $row = $("#new");

        var $name = $row.find("[name=name]").val();
        var $cost = $row.find("[name=cost]").val();
        var $quan = $row.find("[name=quantity]").val();

        $row.find("[name=name]").val('');
        $row.find("[name=cost]").val('');
        $row.find("[name=quantity]").val('');

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
            } else {
                alert("Ingredient already exists! Try again.")
            }
        })
    })
});
	