$( document ).ready(function() {
    var totalPrice = 0;
    var priceToShow;

    $(".add").click(function(){
    	var $row = $(this).closest("tr");
    	var $name = $row.find(".name").text();
        var $price = Number($row.find(".cost").text());
        var $quantity = Number($row.find(".quan").text());

        $row.find(".quan").html(String($quantity + 1))

        updatePrice($price)
	});

    $(".sub").click(function(){
        var $row = $(this).closest("tr");
        var $name = $row.find(".name").text();
        var $price = Number($row.find(".cost").text());
        var $quantity = Number($row.find(".quan").text());

        if ($quantity > 0){
            $row.find(".quan").html(String($quantity - 1))
            updatePrice(-$price)
        } else {
            alert("You can't have negative " + $name)
        }
    });

    $("#order").click(function(){
        var cost = Number($("#totalprice").text().replace("$", ""));

        var order = {ingredients: [],
                     totalCost: cost};

        $(".ingredients-list tr").each(function(i, row){
            var $row = $(row);
            var $quan = Number($row.find(".quan").text());
            var $name = $row.find(".name").text();

            if ($quan > 0){
                var ingredient = {quantity: $quan, name:$name};
                order.ingredients.push(ingredient);
            }
        })

        var orderString = JSON.stringify(order);
        console.log(orderString);

        $.ajax({
            type:'POST',
            data:orderString,
            contentType:'application/json',
            url:'orders/new',
            success: handleResponse,
            complete: handleResponse
        })
    });

    function handleResponse(data){
        console.log(data);
    }


    function updatePrice(price){
        totalPrice += price;
        priceToShow = "$" + String(totalPrice.toFixed(2));
        $("#totalprice").html(priceToShow);
    }
});
	