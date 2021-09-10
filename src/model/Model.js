import {ClassEvent} from './../util/ClassEvent'

export class Model extends ClassEvent{

	constructor(){
		super();

		this._data = {};
	}

	fromJSON(json){
		// Pega o json e junta no _data
		this._data = Object.assign(this._data, json);

		// Define o que o evento datachange faz
		this.trigger('datachange', this.toJSON()); 
	}

	toJSON(){
		return this._data;
	}


}