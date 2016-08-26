// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
function checkValidPost()
{
  if( $(".post_area").val() == "" )
  {
  	$(".post_area").focus();
  	alert("Post must not be empty");
  	return false;
  }
  return true;
}
$(function(){
  var id = "",post_id = "", comment = "",str = "";
  setTimeout(function(){$(".flash-container").hide();},3000);
  if(window.location.pathname.indexOf("new-post") != -1)
  {
    $(".hd-btn-new").removeClass("default-button-home");
    $(".hd-btn-new").addClass("default-button-home-selected");
  }
  if(window.location.pathname.indexOf("all-posts") != -1)
  {
    $(".hd-btn-home").removeClass("default-button-home");
    $(".hd-btn-home").addClass("default-button-home-selected");
    $(".view-comment").click(function(){
    	id = $(this).attr("data-id");
      $(".comments-header"+id).show();
    	$(".comment-container"+id).show();
    	$(".view-comment"+id).hide();
    	$(".hide-comment"+id).show();
    });

    $(".hide-comment").click(function(){
    	id = $(this).attr("data-id");
      $(".comments-header"+id).hide();
    	$(".comment-container"+id).hide();
    	$(".view-comment"+id).show();
    	$(".hide-comment"+id).hide();
    });

    $(".add-comment").click(function(){
    	id = $(this).attr("data-id");
      if( $(this).attr("data-child") != "0" )
        $(".view-comment"+id).click();
    	$(".new-comment-container"+id).show();
    });

    $(".submit-comment").click(function(){
    	id = $(this).attr("data-id");
      if( $(".comment-text"+id).val() == "" )
      {
        alert("Enter a comment");
        return false;
      }
      else
      {
        post_id = $(this).attr("data-post-id");
        comment = $(".comment-text"+id).val();
        $.ajax({
        	type: "POST",
        	url: "/post/comment",
        	data: { "post_id":post_id, "comment":comment },
        	datatype: "application/json",
        	success: function(data)
        	{
        	  if(data.valid == 1)
        	  {
        	  	str = "";
        	  	str += '<div class="comment-box">';
        	  	   str += '<div class="c-nickname">';
        	  	     str += data.nickname;
        	  	   str += '</div>'
        	  	   str += '<div class="c-time">';
        	  	      str += data.time;
        	  	   str += '</div>'
        	  	   str += '<div class="c-comment">';
        	  	      str += $(".comment-text"+id).val();
        	  	   str += '</div>'
        	  	str += '</div>'
        	  	$(".comment-container"+id).append(str)
        	  	$(".comment-text"+id).val("");
              $(".view-comment"+id).show();
              $(".view-comment"+id).click();
        	  }
        	},
        	error: function(err)
        	{
        	  console.log(err);
        	}
        });
      }
    });
  }
  if(window.location.pathname.indexOf("search-posts") != -1)
  {
    $(".hd-btn-search").removeClass("default-button-home");
    $(".hd-btn-search").addClass("default-button-home-selected");
    $("#search-query").keyup(function(){
      $("#search-results-container").html("");
      str = $(this).val();
      if(str != "")
      {
        $.ajax({
          type: "GET",
          url: "/post/search_query",
          data: { "query":str },
          datatype: "application/json",
          success: function(data)
          {
            if(data.count > 0)
            {
              data.results.forEach(function(t,i){
                str = "";
                str += '<div class="result-container">';
                  str += '<p>Result #'+(i+1)+'</p>';
                  str += '<div class="c-nickname">';
                   str += t.nickname;
                  str += '</div>';
                  str += '<div class="c-post">';
                   str += '<a data-method="get" href="/show-post/' +t.id+ '">' +t.post+ '</a>';
                  str += '</div>';
                  str += '<div class="c-time">';
                   str += t.time;
                  str += '</div>';
                str += '</div><br/>'
                $("#search-results-container").append(str);
              });  
            }
            else
              $("#search-results-container").append('<p style="color: red;">Zero Results</p>');
          },
          error: function(err)
          {
            console.log(err);
          }
        });
      }  
    });
  }
  if(window.location.pathname.indexOf("show-post") != -1)
  {
    $(".view-comment").click(function(){
      $(".comments-header").show();
      $(".comment-container").show();
      $(".view-comment").hide();
      $(".hide-comment").show();
    });

    $(".hide-comment").click(function(){
      $(".comments-header").hide();
      $(".comment-container").hide();
      $(".view-comment").show();
      $(".hide-comment").hide();
    });

    $(".add-comment").click(function(){
      if( $(this).attr("data-child") != "0" )
        $(".view-comment"+id).click();
      $(".new-comment-container").show();
    });

    $(".submit-comment").click(function(){
      if( $(".comment-text").val() == "" )
      {
        alert("Enter a comment");
        return false;
      }
      else
      {
        post_id = $(this).attr("data-post-id");
        comment = $(".comment-text").val();
        $.ajax({
          type: "POST",
          url: "/post/comment",
          data: { "post_id":post_id, "comment":comment },
          datatype: "application/json",
          success: function(data)
          {
            if(data.valid == 1)
            {
              str = "";
              str += '<div class="comment-box">';
                 str += '<div class="c-nickname">';
                   str += data.nickname;
                 str += '</div>';
                 str += '<div class="c-time">';
                    str += data.time;
                 str += '</div>';
                 str += '<div class="c-comment">';
                    str += $(".comment-text").val();
                 str += '</div>';
              str += '</div>';
              $(".comment-container").append(str)
              $(".comment-text").val("");
              $(".view-comment").show();
              $(".view-comment").click();
            }
          },
          error: function(err)
          {
            console.log(err);
          }
        });
      }
    });
  }
});