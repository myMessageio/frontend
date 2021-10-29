jQuery(function() {
	initDropZone();
});

// content DropZone init
function initDropZone() {
	function setup(id) {
		let options = {
			thumbnailHeight: 210,
			thumbnailWidth: 140,
			maxFiles: 5,
			url : "/upload-target",
			dictResponseError: "Server not Configured",
			dictFileTooBig: "File too big ({{filesize}}MB). Must be less than {{maxFilesize}}MB.",
			dictCancelUpload: "",
			init: function() {
				var self = this;
				//New file added
				self.on("addedfile", function(file) {
					console.log("new file added ", file);
				});
				// Send file starts
				self.on("sending", function(file) {
					console.log("upload started", file);
					if(id == 'file-upload') {
							$("#file-name-holder").append(file.previewTemplate);
						}
				});

				self.on("complete", function(file, response) {
					if (file.name !== "442343.jpg") {
						//this.removeFile(file);
					}
				});

				self.on("maxfilesreached", function(file, response) {
					//alert("too big");
				});

				self.on("maxfilesexceeded", function(file, response) {
					this.removeFile(file);
				});

				self.on("addedfile", function(file) {
					const pattern = /\d{6}(\.)(jpg|jpeg|png)/;

					if (!pattern.test(file.name)) {
						//   this.removeFile(file);
					}
				});
			},
			previewTemplate: `
				<div class="dz-preview dz-file-preview">
					<div class="dz-wrap">
						<div class="dz-filename"><span data-dz-name></span></div>
						<div class="dz-remove">
							<a href="javascript:undefined;" data-dz-remove=""><i class="icon icon-delete"></i>remove</a>
						</div>
					</div>
				</div>`
		};
		var myDropzone = new Dropzone(`#${id}`, options);
	}
	setup("file-upload");
	setup("message-file-upload");
}

Dropzone.autoDiscover = false;