export class ClassEvent{

	constructor(){
		this._events = {};
	}

	on(eventName, fn){

		if(!this._events[eventName]) this._events[eventName] = new Array();

		this._events[eventName].push(fn);

	}

	trigger(){

		// Contém 0 ou todos os argumentos passados no parâmetro
		let args = [...arguments];

		// Retorna o primeiro elemento de um array e remove ele
		let eventName = args.shift();

		args.push(new Event(eventName));

		if(this._events[eventName] instanceof Array){

			this._events[eventName].forEach(fn => {

				// executa a fn
				fn.apply(null, args);

			});

		}
	}
}