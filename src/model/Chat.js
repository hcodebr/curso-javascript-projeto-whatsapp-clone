import {Model} from "./Model"
import {Firebase} from "../util/Firebase"

export class Chat extends Model{

	constructor(){
		super();
	}

	get users(){
		return this._data.users;
	}
	set users(value){
		this._data.users = value
	}

	get timeStamp(){
		return this._data.timeStamp;
	}
	set timeStamp(value){
		this._data.timeStamp = value
	}

	static getRef(){
		return Firebase.db().collection('/chats');
	}

	static create(meEmail, contactEmail){

		return new Promise((s,f) => {

			let users = {};

			users[btoa(meEmail)] = true;
			users[btoa(contactEmail)] = true;

			Chat.getRef().add({
				users,
				timeStamp: new Date()
			}).then(doc => {

				Chat.getRef().doc(doc.id).get().then(chat => {

					s(chat);

				}).catch(err => { f(err); });

			}).catch(err => { f(err); });

		});

	}

	static find(meEmail, contactEmail){

		// .where faz a busca (chave que procuramos,compara, segundo elemento a comparar com o primeiro)
		return Chat.getRef()
		.where(btoa(meEmail),'==', true)
		.where(btoa(contactEmail),'==', true).get();


	}

	static createIfNotExists(meEmail, contactEmail){

		return new Promise ((s,f) => {

			Chat.find(meEmail, contactEmail).then(chats => {

				if(chats.empty){

					Chat.create(meEmail, contactEmail).then(chat => {

						s(chat);

					});

				} else {

					chats.forEach(chat => {

						s(chat);

					});

				}

			}).catch(err => {
				f(err);
			});

		});

	}

}