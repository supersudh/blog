$(function(){
  
  $('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
  var $this = $(this),
      label = $this.prev('label');

    if (e.type === 'keyup') {
      if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
      if( $this.val() === '' ) {
        label.removeClass('active highlight'); 
      } else {
        label.removeClass('highlight');   
      }   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
        label.removeClass('highlight'); 
      } 
      else if( $this.val() !== '' ) {
        label.addClass('highlight');
      }
    }

});
  $(".su-tab-a").click(function(){
    $(".login-tab").removeClass("active");
    $(".su-tab").addClass("active");
    $("#login").hide();
    $("#signup").show();
  });
  $(".login-tab-a").click(function(){
    $(".su-tab").removeClass("active");
    $(".login-tab").addClass("active");
    $("#login").show();
    $("#signup").hide();
  });
});
function checkRegister()
{
  if( $(".email-reg").val() == "" )
  {
    alert("Enter email");
    return false;
  }
  if( $(".nickname").val() =="" )
  {
    alert("Enter nickname");
    return false;
  }
  if( $(".pass-reg").val() == "" || $(".cpass-reg").val() =="" )
  {
    alert("Enter password");
    return false;
  }
  if( $(".pass-reg").val() != $(".cpass-reg").val() )
  {
    alert("Passwords do not match");
    return false;
  }
  return true;
}
function checkLogin()
{
  if( $(".email").val() == "" )
  {
    alert("Enter email");
    return false;
  }
  if( $(".pass").val() == "" )
  {
    alert("Enter password");
    return false;
  }
  return true;
}