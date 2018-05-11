const app = {};

// caroline's code start

app.getHero = function (search) { //function to pull from API
  $.ajax({
    url: 'https://pixabay.com/api/',
    dataType: 'json',
    method: 'GET',
    data: {
      key: '8940432-2e4fde20e8b863dd7ce42df40',
      image_type: 'photo',
      orientation: 'horizontal',
      min_width: 1925,
      safesearch: true,
      q: search
    }
  })
    .then((res) => {
      //put object in array
      const heroArray = res.hits;

      $('.submitImage').on('click', function (e) {
        e.preventDefault();
        const randomImage = Math.floor(Math.random() * res.hits.length);
        const userImage = res.hits[randomImage].largeImageURL;
        console.log(userImage);

        // $('.heroArt').css('background-image', 'url(' + userImage + ')');

        $('.deviceBackground').css('background-image', 'url(' + userImage + ')');

        $('.finalBackgroundImage').html(`<a target="_blank" href=${userImage}>See background image</a>`)

      })
    });
}

// carolines's code end
app.getFont = function (font) {
  $.ajax({
    url: 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBU2zC417qkzNXlBPN23A2xRQO4MOD41lI',
    dataType: 'json',
  })

    .then((res) => {
      const fontCategory = [];

      for (let i = 0; i < res.items.length; i++) {
        if (res.items[i].category == font) {
          fontCategory.push(res.items[i]);
        }
      }

      $('.shuffleFont').on('click', function () {

        const randomFont = Math.floor(Math.random() * fontCategory.length);

        const fontFamily = fontCategory[randomFont].family;
        const fontLink = fontCategory[randomFont].files.regular;

        $('h1').css('font-family', fontFamily);

        // append the final font to the bottom of the page so that the user has all of the information to make their hero image 

        $('.finalFont').html(`<a target="_blank" href="https://fonts.google.com/?query=${fontFamily.replace(/ /g, "+")}">${fontFamily}</a>`)

        // add @font-face to the styles so that we're able to use '.tff' callback fonts
        var newStyle = document.createElement('style');
        newStyle.appendChild(document.createTextNode("\
                    @font-face {\
                    font-family: " + fontFamily + ";\
                    src: url('" + fontLink + "')\
                }\
                "));

        document.head.appendChild(newStyle);
      })
    })
};

// event method to change the font based on the user selection
app.events = function () {
  $('#fontChoice').on('change', function () {
    const selectedFont = $(this).val();
    app.getFont(selectedFont);
    console.log('changed the tag');
  })

  // change the device image based on user selection
  $('#deviceChoice').on('change', function () {
    const selectedDevice = $(this).val();

    console.log(selectedDevice);
    if (selectedDevice === "mobile") {
      console.log("I chose the mobile device.");
      $(".chosenDevice").css("background-image", "url(images/iphone-mockup.png)");
    } else if (selectedDevice === "tablet") {
      $(".chosenDevice").css("background-image", "url(images/ipad-mockup.png)");
    } else if (selectedDevice === "desktop") {
      $(".chosenDevice").css("background-image", "url(images/macbook-mockup.png)");
    }

  })


   

  // caroline's events

  $('#pixabayTags').on('change', function () {
    const selectedTag = $(this).val();
    app.getHero(selectedTag)
  })
}

app.init = function () {
  app.events();
}

$(function () {
  app.init();

  //add smoothscroll to app
  $('a').on('click', function(e){
        e.preventDefault();
        $("html").animate({ scrollTop: $("#get-hero").offset().top }, "slow");
  });


  // change the header text based on the users input
  $('.userText').on('submit', function (e) {
    e.preventDefault();
    const textInput = $('input[type=text]')
    const usersInput = textInput.val();
    // clear the header and the user input with each 'submit'
    $('h1').empty();
    $('h1').append(usersInput);
    textInput.val('');

  })

  $('.submitColourForm').on('click', function (e) {
    e.preventDefault();
    const colourInput = $('input[type=color]').val();
    $('h1').css('color', colourInput);
    $('.finalTextColour').html(colourInput);
  })
});
