class YoutubeThumbnailPreviewer {
    constructor () {
        this.$resultContainer = document.getElementById('result-container');
        this.$nameInput = this.$resultContainer.querySelector('input');
        this.thumbnailSize = {
            width: 1280,
            height: 720,
        };

        this.setupListeners();
        this.loadSavedThumbnail();
    }

    loadSavedThumbnail () {
        const thumbnail = localStorage.getItem("thumbnail");
        const title = localStorage.getItem("title");

        if (thumbnail == null) {
            return;
        }

        this.$resultContainer.querySelector('img').src = thumbnail;

        if (title) {
            this.$nameInput.value = title;
        }
        this.showStep2();
    }

    showStep2 () {
        this.$resultContainer.classList.remove("d-none");
        document.getElementById('step-2').classList.remove("d-none");
    }

    readPastedImage (file) {
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            this.$resultContainer.querySelector('img').src = event.target.result;
            this.saveB64Image(event.target.result);
        });
        reader.readAsDataURL(file);
    }

    setupListeners () {
        const $pasteContainer = document.getElementById('paste-container');
        const $imageInput = $pasteContainer.querySelector('input');
        $pasteContainer.addEventListener('click', () => {
            $imageInput.click();
        });
        $pasteContainer.addEventListener('dragover', (event) => {
            event.stopPropagation();
            event.preventDefault();
            event.dataTransfer.dropEffect = 'copy';
        });
          
        // Event listener for dropping the image inside the div
        $pasteContainer.addEventListener('drop', (event) => {
            event.stopPropagation();
            event.preventDefault();
            
            this.readPastedImage(event.dataTransfer.files[0]);
        });
        $imageInput.addEventListener("change", () => {
            this.readPastedImage($imageInput.files[0]);
        });

        window.addEventListener("paste", (e) => {
            this.retrieveImageFromClipboardAsBlob(e).then((blob) => {
                this.saveBlob(blob);
            }).catch ((e) => {
                alert("Failed to parse pasted content");
                throw e;
            });
        });

        this.$nameInput.addEventListener("input", () => {
            this.saveTitle();
        });
    }

    saveTitle () {
        localStorage.setItem("title", this.$nameInput.value);
    }

    saveBlob (imageBlob) {
        const $img = this.$resultContainer.querySelector('img');
        const URLObj = window.URL || window.webkitURL;

        $img.onload = () => {
            this.saveB64Image(this.imageToB64($img));
        };

        $img.src = URLObj.createObjectURL(imageBlob);
    }

    saveB64Image (b64Image) {
        localStorage.setItem("thumbnail", b64Image);
        this.saveTitle();
        this.showStep2();
    }

    imageToB64(img) {
        var canvas = document.createElement("canvas");
        
        canvas.width = this.thumbnailSize.width * window.devicePixelRatio;
        canvas.height = this.thumbnailSize.height * window.devicePixelRatio;
    
        var ctx = canvas.getContext("2d", {antialias: false});
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(img, 0, 0);
    
        var dataURL = canvas.toDataURL("image/png");
    
        return dataURL;
    }

    /**
     * This handler retrieves the images from the clipboard as a blob and returns it in a callback.
     * 
     * @based on http://ourcodeworld.com/articles/read/491/how-to-retrieve-images-from-the-clipboard-with-javascript-in-the-browser
     * @param pasteEvent 
     * @param callback 
     */
    retrieveImageFromClipboardAsBlob(pasteEvent) {
        return new Promise ((resolve, reject) => {
            if (pasteEvent.clipboardData === false) {
                reject();
            };
    
            let items = pasteEvent.clipboardData.items;
    
            if (items === undefined) {
                reject();
            };
    
            for (let i = 0; i < items.length; i++) {
                // Skip content if not image
                if (items[i].type.indexOf("image") === -1) {
                    continue
                };
                // Retrieve image on clipboard as blob
                const blob = items[i].getAsFile();
    
                resolve(blob);
            }
        });
    }
}

window.youtubeThumbnailPreviewer = new YoutubeThumbnailPreviewer();