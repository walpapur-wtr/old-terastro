document.getElementById("articleForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var title = document.getElementById("title").value;
    var content = document.getElementById("content").innerHTML;

    var article = {
        "title": title,
        "content": content
    };

    fetch("/api/articles", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(article)
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data.message);
        window.location.href = "catalog.html"; // Перенаправлення на сторінку каталогу
    })
    .catch(function(error) {
        console.log("Помилка при збереженні статті:", error);
    });
});

// Function to enable real-time image resizing
function enableImageResizing(image) {
  var isResizing = false;
  var startX, startY, startWidth, startHeight;

  function initResize(e) {
    e.preventDefault();
    isResizing = true;
    startX = e.clientX;
    startY = e.clientY;
    startWidth = image.width;
    startHeight = image.height;
  }

  function resizeImage(e) {
    if (!isResizing) return;
    var deltaX = e.clientX - startX;
    var deltaY = e.clientY - startY;
    image.width = startWidth + deltaX;
    image.height = startHeight + deltaY;
  }

  function stopResize() {
    isResizing = false;
  }

  image.addEventListener("mousedown", initResize);
  document.addEventListener("mousemove", resizeImage);
  document.addEventListener("mouseup", stopResize);
}

// Function to remove the existing image from the content area
function removeImage() {
  if (selectedImage) {
    contentDiv.removeChild(selectedImage);
    selectedImage = null;
  }
}

// Function to insert or update the image with an initial size
function insertOrUpdateImage(url) {
  var img;

  if (selectedImage) {
    // Update the source of the existing image
    img = selectedImage;
    img.src = url;
  } else {
    // Insert a new image with an initial size
    img = new Image();
    img.src = url;
    img.style.width = "400px"; // Set the initial width of the image
    img.style.height = "auto"; // Maintain aspect ratio when resizing
    contentDiv.appendChild(img);
    enableImageResizing(img);
  }

  // Remove previous comment if any
  var commentDiv = document.getElementById("commentDiv");
  while (commentDiv.firstChild) {
    commentDiv.removeChild(commentDiv.firstChild);
  }
}

var contentDiv = document.getElementById("content");
var resizeHandle = document.getElementById("resizeHandle");
var resizeSlider = document.getElementById("resizeSlider");

function showResizeHandle() {
  resizeHandle.style.display = "block";
}

function hideResizeHandle() {
  resizeHandle.style.display = "none";
}

contentDiv.addEventListener("click", function(event) {
  var clickedImage = event.target;
  var isImageClicked = clickedImage.tagName === "IMG";

  if (selectedImage && selectedImage !== clickedImage) {
    selectedImage.classList.remove("selected");
    hideResizeHandle();
  }

  if (isImageClicked) {
    selectedImage = clickedImage;
    selectedImage.classList.toggle("selected");
    if (selectedImage.classList.contains("selected")) {
      showResizeHandle();
    } else {
      hideResizeHandle();
    }
  } else {
    selectedImage = null;
    hideResizeHandle();
  }
});

var selectedImage = null;

var imageInput = document.getElementById("imageInput");

imageInput.addEventListener("change", function(event) {
  var file = event.target.files[0];
  if (file) {
    var reader = new FileReader();
    reader.onload = function(e) {
      insertOrUpdateImage(e.target.result);
    };
    reader.readAsDataURL(file);
  }
});

// Function to handle resizing when slider value changes
resizeSlider.addEventListener("input", function() {
  if (selectedImage) {
    selectedImage.style.width = this.value + "px";
  }
});

// Formatting buttons
var boldButton = document.getElementById("boldButton");
var italicButton = document.getElementById("italicButton");
var underlineButton = document.getElementById("underlineButton");
var alignLeftButton = document.getElementById("alignLeftButton");
var alignCenterButton = document.getElementById("alignCenterButton");
var alignRightButton = document.getElementById("alignRightButton");

alignLeftButton.addEventListener("click", function() {
    applyFormatting("justifyLeft");
});

alignCenterButton.addEventListener("click", function() {
    applyFormatting("justifyCenter");
});

alignRightButton.addEventListener("click", function() {
    applyFormatting("justifyRight");
});

boldButton.addEventListener("click", function() {
    applyFormatting("bold");
});

italicButton.addEventListener("click", function() {
    applyFormatting("italic");
});

underlineButton.addEventListener("click", function() {
    applyFormatting("underline");
});

function applyFormatting(style) {
  document.execCommand(style, false, null);
}