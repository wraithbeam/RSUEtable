function onLoad(){
    let array = ["Контакты", "Карьера", "Навыки", "Доп. инф."];
    let table = document.querySelector('#content_table');
    eel.fill_info_into_table()()
    .then(rows => {
        if(rows != null){
            for (let j = 0; j < rows.length; j++) {
                    let tr = document.createElement('tr');
                    
                    for (let i = 0; i < rows[j].length; i++) {
                        let td = document.createElement('td');
                        td.innerHTML = rows[j][i];
                        tr.appendChild(td);
                    }
                    for(let i = 0; i < 4; i++){
                        let td = document.createElement('td');
                        let button = document.createElement('a');
                        button.classList.add('hbtn');
                        button.classList.add('hb-border-top-br4');
                        td.id = (i + j * 10) + 800000;
                        button.onclick = function(e){
                            onInfoClick(td.id);
                        }
                        button.appendChild(document.createTextNode(array[i]));
                        td.appendChild(button);
                        tr.appendChild(td);
                    }
                table.appendChild(tr);
            }
            let head_tr = document.querySelector('#head_tr');
            let headers = ["Фамилия", "Имя", "Отчество", "Дата поступления", "Дата выпуска", "Контакты", "Карьера", "Навыки", "Доп. инф."]

            for(let i = 0; i < headers.length; i++){
                let th = document.createElement('th');
                th.innerHTML = headers[i];
                head_tr.appendChild(th);
            }
        }
    })
    .catch(e => alert("Что-то пошло не так... \n" + e));

    
    
};
