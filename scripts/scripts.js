const app = {};

app.getFont = function(font) {
  $.ajax({
    url:
      "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBU2zC417qkzNXlBPN23A2xRQO4MOD41lI",
    dataType: "json"
  })
  .then(res => {
    // const ajaxResults = res.items;
    // const ajaxResults = res.items;
    // console.log(res.items);

    const fontCategory = [];

    for (let i = 0; i < res.items.length; i++) {
      if (res.items[i].category == font) {
        fontCategory.push(res.items[i]);
      }
    }

    // const allSpecifiedFonts = res.items

    // const randomFont = Math.floor(Math.random() * fontCategory.length);
    // let fontFamily = fontCategory[randomFont].family;
    // let fontLink = fontCategory[randomFont].files.regular;

    $("button").on("click", function() {
      // const fontCategory = [];
      // for (let i = 0; i < ajaxResults.length; i++) {
      //     if (ajaxResults[i].category == font) {
      //         fontCategory.push(ajaxResults[i]);
      //     }
      // };

      const randomFont = Math.floor(Math.random() * fontCategory.length);

      const fontFamily = fontCategory[randomFont].family;
      const fontLink = fontCategory[randomFont].files.regular;

      $("h1").css("font-family", fontFamily);

      var newStyle = document.createElement("style");
      newStyle.appendChild(
        document.createTextNode(
          "\
                    @font-face {\
                    font-family: " +
            fontFamily +
            ";\
                    src: url('" +
            fontLink +
            "')\
                }\
                "
        )
      );

      document.head.appendChild(newStyle);
    });
  });
};

// event method to change the font based on the user selection
app.events = function() {
  $("#fontChoice").on("change", function() {
    const selectedFont = $(this).val();
    app.getFont(selectedFont);
  });
};

app.init = function() {
  app.events();
};

$(function() {
  app.init();

  // change the header text based on the users input
  $(".userText").on("submit", function(e) {
    e.preventDefault();
    const textInput = $("input[type=text]");
    const usersInput = textInput.val();
    // console.log(usersInput);
    // clear the header and the user input with each 'submit'
    $("h1").empty();
    $("h1").append(usersInput);
    textInput.val("");
  });

  $(".submitColourForm").on("click", function(e) {
    e.preventDefault();
    const colourInput = $("input[type=color]").val();
    $("h1").css("color", colourInput);
  });
});
