class WhatsAppController{
	constructor(){
		console.log("olá WhatsApp");
		this.loadElements();
		this.elementsPrototype();
		this.initEvents();
	}

	// Percorre os elementos da tela e os coloca em this.el
	loadElements(){

		this.el = {};

		document.querySelectorAll('[id]').forEach(element=>{

			this.el[Format.getCamelCase(element.id)] = element;

		});
	}

	// Adiciona funções para alguns elementos
	elementsPrototype(){

		// Element é uma classe nativa do js, e aqui são adicionadas algumas funções a ela.
		// this.style é nativo da classe Element que pode mudar os estilos.

		Element.prototype.hide = function(){
			this.style.display = 'none';
			return this;
		};

		Element.prototype.show = function(){
			this.style.display = 'block';
			return this;
		};

		Element.prototype.toggle = function(){
			this.style.display = (this.style.display === 'none') ? 'block' : 'none';
			return this;
		};

		// Realizar eventos
		Element.prototype.on = function(events, fn){
			events.split(' ').forEach(event=>{
				this.addEventListener(event,fn);
			});
			return this;
		};

		// Alterar características do css
		Element.prototype.css = function(styles){
			for (let name in styles){
				this.style[name] = styles[name];
			}
			return this;
		};


		/* Alterar características das classes html */

		Element.prototype.addClass = function(name){
			this.classList.add(name);
			return this;
		};

		Element.prototype.removeClass = function(name){
			this.classList.remove(name);
			return this;
		};

		Element.prototype.toggleClass = function(name){
			this.classList.toggle(name);
			return this;
		};

		Element.prototype.hasClass = function(name){
			return this.classList.contains(name);
		};


		//Retorna um FormData para o formulário
		HTMLFormElement.prototype.getForm = function(){

			return new FormData(this);

		};

		// Retorna os campos do formulário em objeto JSON
		HTMLFormElement.prototype.toJSON = function(){

			let json = {};

			this.getForm().forEach((value, key) => {

				json[key] = value; 

			});

			return json;

		}

	}

	// Inicia os eventos que os componentes da tela realizam
	initEvents(){

		// Abre o painel para Editar Perfil
		this.el.myPhoto.on('click', e => {

			this.closeAllLeftPanel();
			this.el.panelEditProfile.show();

			setTimeout(()=>{
				this.el.panelEditProfile.addClass('open');
			}, 300);

		}); 

		// Abre o Painel para Adicionar Novo Contato
		this.el.btnNewContact.on('click', e => {

			this.closeAllLeftPanel();
			this.el.panelAddContact.show();

			setTimeout(()=>{
				this.el.panelAddContact.addClass('open');
			}, 300);

		});

		// Fecha o painel para Editar Perfil
		this.el.btnClosePanelEditProfile.on('click', e=> {

			this.el.panelEditProfile.removeClass('open');

		});

		// Fecha o Painel para Adicionar Novo Contato
		this.el.btnClosePanelAddContact.on('click', e => {

			this.el.panelAddContact.removeClass('open');

		});

		// Aciona o input para importar foto
		this.el.photoContainerEditProfile.on('click', e=> {

			this.el.inputProfilePhoto.click();

		});

		// Salva o nome quando a tecla Enter é acionada
		this.el.inputNamePanelEditProfile.on('keypress', e=>{

			if(e.key === 'Enter'){

				e.preventDefault();
				this.el.btnSavePanelEditProfile.click();

			}

		});

		// Salva as alterações no Perfil
		this.el.btnSavePanelEditProfile.on('click',e => {

			console.log(this.el.inputNamePanelEditProfile.innerHTML);

		});

		// Submete os dados do formulário
		this.el.formPanelAddContact.on('submit', e => {

			e.preventDefault();

			let formData = new FormData(this.el.formPanelAddContact);

		});

		// Abre a conversa do contato selecionado na Lista de Contatos
		this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item => {

			item.on('click', e => {

				this.el.home.hide();

				this.el.main.css({
					display:'flex'
				});

			});

		});

		// Abre o Menu de Anexos
		this.el.btnAttach.on('click', e => {

			e.stopPropagation();

			this.el.menuAttach.addClass('open');

			document.addEventListener('click', this.closeMenuAttach.bind(this));

		});

		// Aciona o input para importar foto
		this.el.btnAttachPhoto.on('click', e => {

			this.el.inputPhoto.click();

		});

		// Seleciona as fotos a serem importadas
		this.el.inputPhoto.on('change', e => {

			console.log(this.el.inputPhoto.files);

			[...this.el.inputPhoto.files].forEach(file => {

				console.log(file);

			})

		});

		// Abre o Painel da Câmera
		this.el.btnAttachCamera.on('click', e => {

			this.closeAllMainPanel();

			this.el.panelCamera.addClass('open');

			this.el.panelCamera.css({

				'height':'calc(100% - 120px)'

			});

		});

		// Fecha todos os painéis e abre a conversa
		this.el.btnClosePanelCamera.on('click', e => {

			this.closeAllMainPanel();

			this.el.panelMessagesContainer.show();


		});

		// Tira foto
		this.el.btnTakePicture.on('click', e=> {

			console.log("take picture");

		});

		// Abre o Painel de Visualizar Documentos
		this.el.btnAttachDocument.on('click', e => {

			this.closeAllMainPanel();

			this.el.panelDocumentPreview.addClass('open');

			this.el.panelDocumentPreview.css({

				'height':'calc(100% - 120px)'

			});

		});

		// Fecha todos os painéis e abre a conversa
		this.el.btnClosePanelDocumentPreview.on('click', e => {

			this.closeAllMainPanel();

			this.el.panelMessagesContainer.show();

		});

		// Envia documentos
		this.el.btnSendDocument.on('click', e => {

			console.log('send document');

		});

		// Mostra a Lista de Contatos
		this.el.btnAttachContact.on('click', e => {

			this.el.modalContacts.show();

		});

		// Fecha a Lista de Contatos
		this.el.btnCloseModalContacts.on('click', e => {

			this.el.modalContacts.hide();

		});

	}

	// Fecha todos os painéis principais
	closeAllMainPanel(){

		this.el.panelMessagesContainer.hide();
		this.el.panelDocumentPreview.removeClass('open');
		this.el.panelCamera.removeClass('open');

	}

	// Fecha o menu de anexos
	closeMenuAttach(e){

		document.removeEventListener('click', this.closeMenuAttach);
		this.el.menuAttach.removeClass('open');

	}

	// Fecha todos os painéis que ficam na esquerda da tela 
	closeAllLeftPanel(){

		this.el.panelEditProfile.hide();
		this.el.panelAddContact.hide();

	}


}
