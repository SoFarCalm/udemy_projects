// Check off specific todos by clicking on them
$("ul").on("click", "li", function(){
  $(this).toggleClass("completed");
});

// click on X to delete todo
$("ul").on("click", "span", function(event){
  event.stopPropagation();
  $(this).parent().fadeOut(500, function(){
    $(this).remove();
  })
});

$("input[type='text']").keypress(function(event){
  if(event.which === 13){
    // grabbing new todo list from input
    var todoText = $(this).val();
    var del = "<span><i class='fa fa-trash'></i></span>";
    $(this).val("");
    //create a new li and add to ul
    $("ul").append("<li>" + del + " " + todoText + "</li>");
  }
});

$(".fa-plus").click(function(){
  $("input[type='text']").fadeToggle();
});
