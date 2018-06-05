const app = {};

app.heroArray = [];

app.getHero = function (search) {
  //function to pull from API
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

      app.heroArray = res.hits;

    });
}

// carolines's code end
const fontCategory = [];
app.getFont = function (font) {
  $.ajax({
    url: 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBU2zC417qkzNXlBPN23A2xRQO4MOD41lI',
    dataType: 'json',
  })

    .then((res) => {

      for (let i = 0; i < res.items.length; i++) {
        if (res.items[i].category == font) {
          fontCategory.push(res.items[i]);
        }
      }

      $('.shuffleFont').on('click', function () {

        const randomFont = Math.floor(Math.random() * fontCategory.length);

        const fontFamily = fontCategory[randomFont].family;
        const fontLink = fontCategory[randomFont].files.regular;

        $('.userHeader').css('font-family', fontFamily);

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
  })

  // call app.hero image api 

  app.getHero();


  // change the device image based on user selection
  $('#deviceChoice').on('change', function () {
    const selectedDevice = $(this).val();

    if (selectedDevice === "mobile") {
      $(".deviceChosen").attr("src", "images/iphone-mockup.png");
    } else if (selectedDevice === "tablet") {
      $(".deviceChosen").attr("src", "images/ipad-mockup.png");
    } else if (selectedDevice === "desktop") {
      $(".deviceChosen").attr("src", "images/macbook-mockup.png");
    }
  })

  // caroline's events

  $('#pixabayTags').on('change', function () {
    const selectedTag = $(this).val();
    // console.log(selectedTag);
    app.getHero(selectedTag)

  })
}

app.init = function () {
  app.events();
  app.randomImage();

}

$(function () {
  app.init();

  //add smoothscroll to app 
  $(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
  });

  // change the header text based on the users input
  $('.userText').on('submit', function (e) {
    e.preventDefault();
    const textInput = $('input[type=text]')
    const usersInput = textInput.val();
    // clear the header and the user input with each 'submit'
    $('.userHeader').empty();
    $('.userHeader').append(usersInput);
    textInput.val('');

  })

  $('.submitColourForm').on('click', function (e) {
    e.preventDefault();
    const colourInput = $('input[type=color]').val();
    $('.userHeader').css('color', colourInput);
    $('.finalTextColour').html(colourInput);
  })
});

app.randomImage = function () {
  $('.submitImage').on('click', function (e) {
    e.preventDefault();

    console.log(app.heroArray);
    const randomImage = Math.floor(Math.random() * app.heroArray.length);
    const userImage = app.heroArray[randomImage].largeImageURL;


    $('.backgroundContainer').css('background-image', 'url(' + userImage + ')');

    $('.finalBackgroundImage').html(`<a target="_blank" href=${userImage}>See background image</a>`)

  })
}