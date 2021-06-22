function onInfoClick(id){
    if(document.getElementById("p" + id)){
        let p = document.getElementById('p' + id);
        p.remove();
    }
    else {
        let body = document.getElementById(id);
        var p = document.createElement('p');
        p.id = "p" + id;
        let input = document.createElement('input');
        let datalist = document.createElement('datalist');
        datalist.id = ("searchresults "+ id);
        datalist.classList.add("value-list");
        
        input.type = "text";
        input.classList.add("chosen-value");
        input.placeholder = "Инфо...";
        input.setAttribute("list", ("searchresults " + id));
        

        let rows = eel.give_info_to_js(parseInt(id))()
        .then(rows => {
            if((parseInt(id) % 10 != 0) && (parseInt(id) % 10 != 3)){ //Если это не контакты или доп инфа
                for(var i = 0; i < rows.length; i++){   //Цикл по количесвту принятых строк
                    var option_not_contact = document.createElement('option');  //Создаем строку в datalist
                    for(let j = 0; j < rows[i].length; j++){
                        option_not_contact.appendChild(document.createTextNode(rows[i][j] + " ")); //Выводим все, что есть в строке
                    }
                    datalist.appendChild(option_not_contact);
                }
                p.appendChild(input);
                p.appendChild(datalist);
                body.appendChild(p);
            }
            else if(parseInt(id) % 10 == 0){ //Если это контакты
                let icon_array = ["fa-envelope", "fa-phone", "fa-github-square", "fa-instagram",  "fa-telegram", "fa-vk" ];
                let div_wrapper = document.createElement('div');//создаем список
                div_wrapper.classList.add('wrapper');
                for(var i = 0; i < rows[0].length; i++){
                        if(rows[0][i] != null){
                        var a = document.createElement('a');
                        a.classList.add('button');
                        let icon = document.createElement('i');
                        if(i < 2)
                            icon.classList.add('fa-solid');
                        else
                            icon.classList.add('fab');
                        icon.classList.add(icon_array[i]);
                        a.appendChild(icon);
                        a.appendChild(document.createTextNode(" "));
                        a.id = i + 2000;
                        
                        a.onmouseenter = function(event){
                            let div_hidden = document.createElement('div');
                            div_hidden.classList.add('info_contact');
                            div_hidden.id = (parseInt(id) / 100000 + i + 5000);
                            div_hidden.appendChild(document.createTextNode(rows[0][event.target.id - 2000]));
                            event.target.appendChild(div_hidden);
                        }
                        a.onmouseleave = function(event){
                            let div_hidden = document.getElementById((parseInt(id) / 100000 + i + 5000));
                            div_hidden.remove();
                        }
                        div_wrapper.appendChild(a);
                    }
                }
                p.appendChild(div_wrapper);
                body.appendChild(p);
            }
            else if(parseInt(id) % 10 == 3){ //Если это допинфа
                let args = ["Дата рождения: ", "Полный адрес: ", "Серия диплома: ", "Номер диплома: ", "Форма обучения: "];
                if(document.getElementById("dop_infa")){
                    document.getElementById("dop_infa").remove();
                }
                else{
                    let main_body = document.getElementById("main_body");
                    let dop_infa = document.createElement('div');
                    dop_infa.classList.add('dop_infa');
                    dop_infa.id ="dop_infa";

                    for(let k =0; k < rows[Math.round((parseInt(id) - 800000) / 10)].length; k++){

                        if(rows[Math.round((parseInt(id) - 800000) / 10)][k] != null){
                            let dop_inf_div = document.createElement('div');
                            dop_inf_div.classList.add('block_list');
                            dop_inf_div.innerHTML = (args[k] + rows[Math.round((parseInt(id) - 800000) / 10)][k]);
                            dop_infa.appendChild(dop_inf_div);
                        }

                    }
                    let button = document.createElement('button');
                    button.innerHTML = "Закрыть";
                    button.onclick = function(e){
                        document.getElementById("dop_infa").remove();
                    }
                    dop_infa.appendChild(button);
                    main_body.appendChild(dop_infa);
                    
                }
            }

                
        })
        .catch(e => alert("Что-то пошло не так... \n" + e));
    }
}


// for(let j = 0; j < rows[i].length; j++){    //Цикл по внутренним элементам строки

//     if(parseInt(id) % 10 == 0){     //Если мы имеем дело с контактами
//         let option = document.createElement('option'); //Создаем новую строку
//         if(rows[i][j] != null){     //Если есть данные в строке
//             option.appendChild(document.createTextNode("\u{f189}"));
//             option.appendChild(document.createTextNode(" " +rows[i][j])); //Добавляем текст строки
//             datalist.appendChild(option); //Добавляем непусую строку в список
//         }
//     }
//     option.appendChild(document.createTextNode(rows[i][j] + " ")); //Если это не контакты, выводим все, что есть
// }