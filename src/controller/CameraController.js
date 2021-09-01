export class CameraController{

	constructor(videoEl){

		this._videoEl = videoEl;

		navigator.mediaDevices.getUserMedia({
			video: true
		}).then(stream => {

			// Cria um arquivo
			//this._videoEl.src = URL.createObjectURL(stream);
			this._videoEl.srcObject = stream;

			// Toca o vídeo
			this._videoEl.play();

		}).catch(err => {
			console.error(err);
		});
	}

}