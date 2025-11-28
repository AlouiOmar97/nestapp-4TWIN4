import { readFile, writeFile } from "fs/promises";
export class MessagesRepository{
    async findOne(id: string) {
    // on va récuperer les données depuis notre fichier json
    const content= await readFile("messages.json","utf-8")
    // on va convertir nos données en objet
    const messages= JSON.parse(content)
    // on va retourner l'objet dont la clé est id
    return messages[id];
    }

    async findAll() {
    // on va récuperer les données depuis notre fichier json
    const content= await readFile("messages.json","utf-8")
    // on va convertir nos données en objet
    const messages= JSON.parse(content)
    // on va retourner tous les messages
    return messages;
    }

    async create(content: string) {
    // on va récuperer les données depuis notre fichier json
    const contents= await readFile("messages.json","utf-8")
    // on va convertir nos données en objet
    const messages= JSON.parse(contents)
    // on va créer un id unique
    const id= Math.floor(Math.random()*9999).toString()
    // on va ajouter le message dans l'objet
    messages[id]= {id, content}
    // on va écrire dans le fichier json
    await writeFile("messages.json", JSON.stringify(messages))
    // on va retourner le message créé
    return messages[id];
    }

    async delete(id: string) {
    // on va récuperer les données depuis notre fichier json
    const content= await readFile("messages.json","utf-8")
    // on va convertir nos données en objet
    const messages= JSON.parse(content)
    // on va supprimer le message dans l'objet
    delete messages[id]
    // on va écrire dans le fichier json
    await writeFile("messages.json", JSON.stringify(messages))
    }

}