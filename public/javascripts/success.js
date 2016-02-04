$( document ).ready(function() {
    $(".ingredients").click(function(){
        console.log('Ingredients clicked')
        $.get('/ingredients');
	});

    $(".orders").click(function(){
        $.get('/orders');
    });

    $(".kitchen").click(function(){
        $.get('/kitchen');
    });
});
	