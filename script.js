
  var $streamers = $('.streamers'),
    $streamerCard = $('.streamer_card'),
    streamerList = ["ESL_SC2","OgamingSC2","cretetion","freecodecamp","storbeck","habathcx","RobotCaleb","noobs2ninjas"];
$('.btn_nav').on('click',function(event){
  $('.btn_nav').removeClass('turnt');
  event.target.classList.add('turnt');
})
$('.btn_nav:nth-child(1)').on('click',function(){
  $('.streamer_card').fadeIn(250);
});
$('.btn_nav:nth-child(2)').on('click',function(){
  $('.online').fadeIn(250);
  $('.offline').fadeOut(250);
  $('.unavailable').fadeOut(250);
});
$('.btn_nav:nth-child(3)').on('click',function(){
  $('.offline').fadeIn(250);
  $('.online').fadeOut(250);
  $('.unavailable').fadeOut(250);
});
streamerList.forEach(function(val){
  $.ajax({
    url:"https://wind-bow.gomix.me/twitch-api/streams/" + val,
    dataType: 'jsonp',
    type: 'GET',
    success: htmlfy,
  });
})
function htmlfy(json){
  if(json.stream){
    console.log(json);
    var prof = json.stream.channel.logo;
    if (prof)
    prof = json.stream.channel.logo;
    else prof = 'glitch.png';
  var html = '<div class="streamer_card online">'
  + '<div class="profile_image_wrapper">'
  + '<img class="profile_image" src="' + prof + '">'
  + '</div>'
  + '<div class="profile_name">'
  + '<a href="' + json._links.channel + '" target="_blank">'
  + '<img width="16px" src="glitch.png">'
  + json.stream.channel.name
  + '</a>'
  + '</div>'
  + '<div class="profile_status">'
  + json.stream.channel.status
  + '</div>'
  + '</div>';
}
else if(json.status == 404 || json.status == 422){
  var html = '<div class="streamer_card unavailable">'
  + '<div class="profile_image_wrapper">'
  + '<img class="profile_image" src="glitch.png">'
  + '</div>'
  + '<div class="profile_name">'
  + '<img width="16px" src="glitch.png">'
  + 'unavailable'
  + '</div>'
  + '<div class="profile_status">'
  + 'unavailable'
  + '</div>'
  + '</div>';
  $('.streamers').append(html)
}
else{
  url = json._links.channel.substr(38);
  console.log(url);
  $.ajax({
    url:"https://wind-bow.gomix.me/twitch-api/channels/" + url,
    dataType: 'jsonp',
    type: 'GET',
    success: function(data){
      var prof = data.logo;
      if (prof)
      prof = data.logo;
      else prof = 'glitch.png';
      var html = '<div class="streamer_card offline">'
      + '<div class="profile_image_wrapper">'
      + '<img class="profile_image" src="' + prof + '">'
      + '</div>'
      + '<div class="profile_name">'
      + '<a href="' + data.url + '" target="_blank">'
      + '<img width="16px" src="glitch.png">/'
      + data.name
      + '</a>'
      + '</div>'
      + '<div class="profile_status">'
      + 'Currently Not Streaming'
      + '</div>'
      + '</div>';
      $('.streamers').append(html)
    },
  });
}
  $('.streamers').append(html)
}
