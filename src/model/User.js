import {Firebase} from './../util/Firebase'
import {Model} from './Model'

export class User extends Model{

	constructor(id){

		super();

		if(id) this.getById(id);

	}

	get name(){
		return this._data.name;
	}
	set name(value){
		this._data.name = value;
	}

	get email(){
		return this._data.email;
	}
	set email(value){
		this._data.email = value;
	}

	get photo(){
		return this._data.photo;
	}
	set photo(value){
		this._data.photo = value;
	}

	get chatId(){
		return this._data.chatId;
	}
	set chatId(value){
		this._data.chatId = value;
	}

	// Retorna a promessa com os documentos do usuário
	getById(id){

		return new Promise((s,f) => {

			User.findByEmail(id).onSnapshot(doc => {

				this.fromJSON(doc.data());

				s(doc);

			});

		});

	}

	save(){
		return User.findByEmail(this.email).set(this.toJSON());
	}

	// Pega a referência do bando de dados
	static getRef(){
		return Firebase.db().collection('/users');

	}

	static getContactsRef(id){
		return User.getRef()
		.doc(id)
		.collection('contacts');
	}

	// Busca informações do documento do usuário por email
	static findByEmail(email){
		return User.getRef().doc(email);
	}

	addContact(contact){
		return User.getContactsRef(this.email)
		.doc(btoa(contact.email))// btoa() base64
		.set(contact.toJSON());
	}

	getContacts(filter = ''){

		console.log(filter);

		return new Promise((s,f) => {

			// Esse comando >= tem problema
			User.getContactsRef(this.email).where('name', '>=', filter).onSnapshot(docs=>{

				let contacts = [];

				docs.forEach(doc => {

					let data = doc.data();

					data.id = doc.id;

					contacts.push(data);

				});

				this.trigger('contactschange', docs);

				s(contacts);

			});

		});

	}

}