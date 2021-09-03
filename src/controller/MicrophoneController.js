import {ClassEvent} from "../util/ClassEvent";

export class MicrophoneController extends ClassEvent{

	constructor(){

		// Chama o construtor do pai ClassEvent
		super();

		this._mimeType = 'audio/webm';

		// Confere se o usuário permitiu o uso do mic
		this._available = false;

		navigator.mediaDevices.getUserMedia({
			audio: true
		}).then(stream => {

			this._available = true;

			this._stream = stream;	

			// Faz o audio tocar
			/*
			let audio = new Audio();
			audio.srcObject = stream;
			audio.play();
			*/

			this.trigger('ready', this._stream);


		}).catch(err => {
			console.error(err);
		});

	}

	isAvailable(){
		return this._available;
	}

	// Percorre cada track (como áudio e vídeo) e manda parar
	stop(){
		this._stream.getTracks().forEach(track => {
			track.stop();
		});
	}

	startRecorder(){

		if(this.isAvailable()){

			// Para saber o suporte do navegador: MediaRecorder.isTypeSupported('audio/webm')

			this._mediaRecorder = new MediaRecorder(this._stream, {
				mymeTipe: this._mimeType
			});

			// Array onde serão armazenados os pedaços de audios gravados
			this._recordedChunks = [];

			this._mediaRecorder.addEventListener('dataavailable', e => {

				// Se já houver algum pedaço de audio gravado, guarda no array
				if(e.data.size > 0){
					this._recordedChunks.push(e.data);
				}

			});

			
			this._mediaRecorder.addEventListener('stop', e => {

				// Prepara o arquivo de audio

				let blob = new Blob(this._recordedChunks,{
					type: this._mimeType
				});

				let filename = `rec${Date.now()}.webm`;

				let file = new File([blob], filename, {
					type: this._mimeType,
					lastModified: Date.now()
				});

				console.log('file', file);

				/*
				// Toca áudio 

				let reader = new FileReader();

				reader.onload = e => {

					console.log('reader file', file);

					let audio = new Audio(reader.result);

					audio.play();

				}

				reader.readAsDataURL(file);
				*/

			});

			this._mediaRecorder.start();

			this.startTimer();

		}

	}

	stopRecorder(){

		if(this.isAvailable()){

			// Para a gravação
			this._mediaRecorder.stop();

			// Para o microfone
			this.stop();

		}

		this.stopTimer();
		
	}

	startTimer(){

		let start = Date.now();

		this._recordMicrophoneInterval = setInterval(() => {

			this.trigger('recordtimer', (Date.now() - start));

		}, 100);

	}

	stopTimer(){

		clearInterval(this._recordMicrophoneInterval);
	
	}

}