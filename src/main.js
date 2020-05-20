import api from "./api";

class buscaGit{
    constructor(){
        this.repositorios= [];
        this.formEl= document.getElementById('repo-form');
        this.listEl= document.getElementById('repo-list');
        this.inputEl= document.querySelector('input');
        this.registerHandlers();
    }

registerHandlers() { // Registra eventos
    this.formEl.onsubmit= event => this.addRepo(event);
}

setLoading(loadind = true){
    if(loadind === true){
        let loadingEl= document.createElement('span');
        loadingEl.appendChild(document.createTextNode('Carregando'));
        loadingEl.setAttribute('id', 'loading');

        this.formEl.appendChild(loadingEl);
    } else {
        document.getElementById('loading').remove();
    }
}

async addRepo(event) {
    event.preventDefault();

    var userInput= this.inputEl.value;

    if(userInput.length === 0) return;

    this.setLoading();

    try{
    const response= await api.get(`/users/${userInput}`);

    const { data: {name, bio, avatar_url, html_url}}= response;

    this.repositorios.push({
        name,
        bio,
        avatar_url,
        html_url
    });

    this.inputEl.value= '';
    } catch (err){
        alert('Usuario não existe!');
    }
    this.setLoading(false);
    this.render();
}

render() {
    this.listEl.innerHTML= '';
    this.repositorios.forEach(repo => {
        let imgEl= document.createElement('img');
        imgEl.setAttribute('src', repo.avatar_url);

        let titleEl= document.createElement('strong');
        titleEl.appendChild(document.createTextNode(repo.nome));

        let descricarEl= document.createElement('p');
        descricarEl.appendChild(document.createTextNode(repo.bio));

        let linkEl= document.createElement('a');
        linkEl.setAttribute('target', '_blank');
        linkEl.setAttribute('href', repo.html_url);
        linkEl.appendChild(document.createTextNode('Acessar'));

        let listItemEl= document.createElement('li');
        listItemEl.appendChild(imgEl);
        listItemEl.appendChild(titleEl);
        listItemEl.appendChild(descricarEl);
        listItemEl.appendChild(linkEl);

        this.listEl.appendChild(listItemEl);
    });
}

}

new buscaGit();