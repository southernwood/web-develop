$("ul").on("click","li", function(){
    $(this).toggleClass("completed");
})
$("ul").on("click", ".delete", function(event){
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
	event.stopPropagation();
})

$("input[type = 'text']").keypress(function(event){
	if (event.which === 13) {
		var shoppingText = $(this).val();
		$(this).val("");
		$("ul").append("<li><span class = 'delete'><i class='fa fa-trash' aria-hidden='true'></i></span> "+shoppingText+"</li>");

	}
})

$(".fa-cart-plus").click(function(){
	$("input[type = 'text']").fadeToggle();
})