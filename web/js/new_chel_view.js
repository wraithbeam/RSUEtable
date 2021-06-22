function new_chel_view(value){
    let array = ["Контакты", "Карьера", "Навыки", "Доп. инф."];

    let content_table = document.getElementById("content_table")
    let tr = document.createElement('tr')
    eel.last_chel()()
    .then(_id =>{
        tr.id = "id_graduate " + _id;
    })
    for(let i = 0; i < 5; i++){
        let td = document.createElement('td')
        td.innerHTML = value[i];
        tr.appendChild(td)
    }
    for(let i = 0; i < 4; i++){
        let td = document.createElement('td');
        let button = document.createElement('a');
        button.classList.add('hbtn');
        button.classList.add('hb-border-top-br4');
        eel.last_chel()()
        .then(id=>{
            console.log(id)
            td.id = (id * 10) + i + 800000 
        })
        button.onclick = function(e){
            onInfoClick(td.id);
        }
        button.appendChild(document.createTextNode(array[i]));
        td.appendChild(button);
        tr.appendChild(td);
    }
    content_table.appendChild(tr)
}