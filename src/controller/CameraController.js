export class CameraController{

	constructor(videoEl){

		this._videoEl = videoEl;

		navigator.mediaDevices.getUserMedia({
			video: true
		}).then(stream => {

			this._stream = stream;		

			// Cria um arquivo
			//this._videoEl.src = URL.createObjectURL(stream);
			this._videoEl.srcObject = stream;

			// Toca o vídeo
			this._videoEl.play();

		}).catch(err => {
			console.error(err);
		});
	}

	// Percorre cada track (como áudio e vídeo) e manda parar
	stop(){
		this._stream.getTracks().forEach(track => {
			track.stop();
		});
	}

	takePicture(mimeType = 'image/png'){

		let canvas = document.createElement('canvas');

		// Pega  a altura e largura da imagem
		canvas.setAttribute('height', this._videoEl.videoHeight);
		canvas.setAttribute('width', this._videoEl.videoWidth);

		let context = canvas.getContext('2d');

		// Desenhar Imagem (elemento, x, y, w, h)
		context.drawImage(this._videoEl, 0, 0, canvas.width, canvas.height);;

		return canvas.toDataURL(mimeType);


	}

}