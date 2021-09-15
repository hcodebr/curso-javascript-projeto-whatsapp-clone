export class DocumentPreviewController{

	constructor(file){

		this._file = file;

	}

	getPreviewData(){
		return new Promise((resolve,reject)=>{

			switch(this._file.type){

				case 'image/png':
				case 'image/jpeg':
				case 'image/jpg':
				case 'image/gif':

					let reader = new FileReader();

					reader.onload = e => {
						resolve({
							src:reader.result, 
							info:this._file.name
						});
					};

					reader.onerror = e => {
						reject(e);
					}

					reader.readAsDataURL(this._file);

				break;

				case 'application/pdf':

				break;

				default:
					reject();
			}

		});
	}
}