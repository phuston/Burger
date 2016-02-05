$( document ).ready(function() {
    $(".complete").click(function(){
    	var $row = $(this).closest("tr");
        var $_id = $row.find("._id").text();

        var order = {
            id: $_id
        }

        $.ajax({
            url: '/kitchen/complete',
            data: order,
            type: 'POST'
        })

        $row.remove()
	});
});
	