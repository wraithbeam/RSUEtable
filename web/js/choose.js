function fill_spec(){
    let input_fak = document.getElementById("fac_input");
    let input_level = document.getElementById("lvl_input");
    if ((input_fak.value != "") && (input_level.value != "")){ //Введены оба критерия 

        var div1 = document.getElementById("specialty");

        let answer_fak = input_fak.value;
        let answer_level = input_level.value;

        let p = document.createElement('p');

        if (!((document.getElementById("datalist_spec")) || (document.getElementById("input_spec")))){
            var datalist_spec = document.createElement('datalist');
            datalist_spec.id=("datalist_spec");
            datalist_spec.classList.add("value-list");

            var input_spec = document.createElement('input');
            input_spec.type = "text";
            input_spec.id = "input_spec";
            input_spec.placeholder = "Выберите специальность.";
            input_spec.setAttribute("list", "datalist_spec");
            input_spec.onchange = function(e){
                createyear();
            }
        }
        else{
            document.getElementById("datalist_spec").remove();
            document.getElementById("input_spec").remove();

            if(document.getElementById("input_year"))
                document.getElementById("input_year").remove();

            if(document.getElementById("applay_button"))
                document.getElementById("applay_button").remove();

            var datalist_spec = document.createElement('datalist');
            datalist_spec.id=("datalist_spec");
            datalist_spec.classList.add("value-list");

            var input_spec = document.createElement('input');
            input_spec.type = "text";
            input_spec.id = "input_spec";
            input_spec.placeholder = "Выберите специальность.";
            input_spec.setAttribute("list", "datalist_spec");
            input_spec.onchange = function(e){
                createyear();
            }
        }

        switch(answer_fak){
            case "КТиИБ":
                if(document.getElementById("note_in_process")) //Заметка "в разработке"
                    document.getElementById("note_in_process").remove();
                var values = ["Прикладная математика и информатика","Фундаментальная информатика и информационные технологии", "Информационные системы и технологии", "Прикладная информатика", "Программная инженерия", "Информационная безопасность", "Бизнес-информатика", "Информатика и вычислительная техника"];
                switch(answer_level){
                    case "Бакалавриат":
                        let values_low = [values[0], values[1], values[2], values[3], values[4], values[5], values[6]];
                        for(let i = 0; i < values_low.length; i++){
                            let option = document.createElement('option');
                            option.innerHTML = values_low[i];
                            datalist_spec.appendChild(option);
                        }
                        break;
                    case "Магистратура":
                        let values_low1 = [values[0], values[3], values[4], values[5]];
                        for(let i = 0; i < values_low1.length; i++){
                            let option = document.createElement('option');
                            option.innerHTML = values_low1[i];
                            datalist_spec.appendChild(option);
                        }
                        break;
                    case "Аспирантура":
                        let values_low2 = [values[7], values[5]];
                        for(let i = 0; i < values_low2.length; i++){
                            let option = document.createElement('option');
                            option.innerHTML = values_low2[i];
                            datalist_spec.appendChild(option);
                        }
                        break;
                }
                div1.appendChild(input_spec);
                div1.appendChild(datalist_spec);
                break;
            default:
                if (!(document.getElementById("note_in_process"))){
                    let note_in_process = document.createElement('p');
                    note_in_process.innerHTML = "В разработке!";
                    note_in_process.id = "note_in_process";
                    div1.appendChild(note_in_process);
                }
        }
    }
}
function createyear(){
    let div = document.getElementById("year");
    if(document.getElementById("input_year")){
        document.getElementById("input_year").remove();
    }
    else{
        let input_year = document.createElement("input");
        input_year.id = "input_year";
        input_year.placeholder = "Введите год выпуска:"
        input_year.onchange = function(e){
            apply_all();
        }
        div.appendChild(input_year);
    }

}
function apply_all(){
    if(!(document.getElementById('applay_button'))){
        let applay_button = document.createElement('button');
        applay_button.id = "applay_button";
        applay_button.innerHTML = "Принять";
        applay_button.onclick = function(e){
            eel.take_info(document.getElementById("fac_input").value, document.getElementById("lvl_input").value, document.getElementById("input_spec").value, document.getElementById("input_year").value);
            document.location.href = "main.html";
        }
        document.getElementById('apply_holder').appendChild(applay_button);

    }
}