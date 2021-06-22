function on_back_button_click(){
    document.location.href = "home.html";
}

function on_add_button_click(){
    let main_body = document.getElementById("main_body");
     
    let add_form = document.createElement("div");
    add_form.classList.add("add_form");

    //Имена
    {
    let input_placeholders = ["Введите фамилию", "Введите имя", "Ведите отчество"];
    let names_div = document.createElement('div');
    names_div.classList.add('names_div');
    

    for(let i = 0; i < 3; i++){
        let input = document.createElement('input');
        input.classList.add("names");
        input.placeholder = input_placeholders[i];
        input.id = "names" + i;
        names_div.appendChild(input);
    }
    add_form.appendChild(names_div);
    }

    //Соц. сети
    {
    let social_div = document.createElement('div');
    let social_div1 = document.createElement('div');
    social_div.classList.add("social_div")
    social_div1.classList.add("social_div")


    let icon_array = ["fa-envelope", "fa-phone", "fa-github-square", "fa-instagram",  "fa-telegram", "fa-vk" ];
    let input_placeholders_social = ["ivan@ivan.com", "+7 (912) 345-45-56", "ivan", "@ivan","@ivan","@ivan"]
    for(let i = 0; i < icon_array.length; i++){
        let input_div = document.createElement('div');
        input_div.classList.add("inputWithIcon");

        let icon = document.createElement('i');
        if(i < 2)
            icon.classList.add('fa-solid');
        else
            icon.classList.add('fab')
        icon.classList.add(icon_array[i]);

        input_info = document.createElement('input');
        input_info.placeholder = input_placeholders_social[i];
        input_info.classList.add("input_soc")
        input_info.id = "info" + i;

        input_div.appendChild(input_info);
        input_div.appendChild(icon);
        if(i < 3)
            social_div.appendChild(input_div);
        else
            social_div1.appendChild(input_div);

    }
    add_form.appendChild(social_div);
    add_form.appendChild(social_div1);
    }
    //Карьера
    {
    let work_div = document.createElement('div');
    work_div.classList.add('work_div');

    //Список работ чела
    let cur_work_input = document.createElement('input');
    cur_work_input.classList.add("input_work");
    cur_work_input.setAttribute("list", "cur_work_datalist");
    cur_work_input.type ="text";
    cur_work_input.placeholder = "Карьера";

    let cur_work_datalist = document.createElement('datalist');
    cur_work_datalist.id = "cur_work_datalist";


    //Список работ
    let work_datalist = document.createElement('datalist');
    work_datalist.id = "work_datalist";

    eel.get_all_works()()
    .then(rows => {
        for(let i = 0; i < rows.length; i++){
            var option_data = document.createElement('option');  //Создаем строку в datalist
            for(let j = 0; j < rows[i].length; j++){
                option_data.appendChild(document.createTextNode(rows[i][j] + " ")); //Выводим все, что есть в строке
            }
            document.getElementById("work_datalist").appendChild(option_data);
        }
    });
    

    let work_input = document.createElement('input');
    work_input.classList.add("input_work");
    work_input.setAttribute("list", "work_datalist");
    work_input.type ="text";
    work_input.placeholder = "Введите/выберите"
    work_input.onchange = function(e){
        let option_works = document.createElement('option');
        option_works.innerHTML = work_input.value;
        document.getElementById("cur_work_datalist").appendChild(option_works);
    }

    work_div.appendChild(work_input);
    work_div.appendChild(work_datalist);
    work_div.appendChild(cur_work_datalist);
    work_div.appendChild(cur_work_input);
    add_form.appendChild(work_div);
    }

    //Навыки
    {
    let skills_div = document.createElement('div');
    skills_div.classList.add('skills_div');

    //Список работ чела
    let cur_skill_input = document.createElement('input');
    cur_skill_input.classList.add("input_work");
    cur_skill_input.setAttribute("list", "cur_skill_datalist");
    cur_skill_input.type ="text";
    cur_skill_input.placeholder = "Навыки";

    let cur_skill_datalist = document.createElement('datalist');
    cur_skill_datalist.id = "cur_skill_datalist";


    //Список работ
    let skill_datalist = document.createElement('datalist');
    skill_datalist.id = "skill_datalist";

    eel.get_all_skills()()
    .then(rows => {
        for(let i = 0; i < rows.length; i++){
            var skill_option = document.createElement('option');  //Создаем строку в datalist
            for(let j = 0; j < rows[i].length; j++){
                skill_option.appendChild(document.createTextNode(rows[i][j] + " ")); //Выводим все, что есть в строке
            }
            document.getElementById("skill_datalist").appendChild(skill_option);
        }
    });
    

    let skill_input = document.createElement('input');
    skill_input.classList.add("input_work");
    skill_input.setAttribute("list", "skill_datalist");
    skill_input.type ="text";
    skill_input.placeholder = "Введите/выберите"
    skill_input.onchange = function(e){
        let option_skill = document.createElement('option');
        option_skill.innerHTML = skill_input.value;
        option_skill.classList.add("skill_option")
        document.getElementById("cur_skill_datalist").appendChild(option_skill);
    }

    skills_div.appendChild(skill_input);
    skills_div.appendChild(skill_datalist);
    skills_div.appendChild(cur_skill_datalist);
    skills_div.appendChild(cur_skill_input);
    add_form.appendChild(skills_div);


    }

    //Доп.инфа
    {
    let dop_inf_div = document.createElement('div');
    dop_inf_div.classList.add("dop_div");

    let dop_input_placeholders = [["Дата поступления", "Дата выпуска", "Дата рождения"], ["Серия диплома", "Номер диплома", "Форма обучения"], ["Адрес"]];
    
    let counter = 0;
    for(let i = 0; i < dop_input_placeholders.length; i++){
        let temp_div = document.createElement('div');
        temp_div.classList.add("dop_div_row");
        for(let j = 0; j <dop_input_placeholders[i].length; j++ ){
            let input_dop_info = document.createElement('input');
            input_dop_info.classList.add("names");
            input_dop_info.placeholder = dop_input_placeholders[i][j];
            input_dop_info.id = "dop_inf" + counter;
            counter++;
            temp_div.appendChild(input_dop_info);
        }
        dop_inf_div.appendChild(temp_div);
    }
    add_form.appendChild(dop_inf_div);
    }

    //Кнопки
    {

        let div_button_holder = document.createElement("div");
        let buttons_class = ["fa-solidfa-check", "fa-solid fa-xmark"];

        let button1 = document.createElement('button');
        button1.classList.add("bot_but");
        button1.classList.add("but_ac");
        let button2 = document.createElement('button');
        button2.classList.add("bot_but");
        button2.classList.add("but_dec");

        let icon1 = document.createElement('i');
        icon1.classList.add("fa-solid");
        icon1.classList.add("fa-check");
        let icon2 = document.createElement('i');
        icon2.classList.add("fa-solid");
        icon2.classList.add("fa-xmark");

        button1.appendChild(icon1);
        button2.appendChild(icon2);

        button2.onclick=function(e){
            add_form.remove();
        }

        button1.onclick = function(e){

            let temp = document.getElementById("cur_work_datalist").children;
            let temp2 = [], temp3 = [];
            for(let i = 0; i < temp.length; i++){
                temp2[i] = temp[i].value;
            }
            temp = document.getElementById("cur_skill_datalist").children;
            for(let i = 0; i < temp.length; i++){
                temp3[i] = temp[i].value;
            }
            let array_values = [
                document.getElementById("names0").value, 
                document.getElementById("names1").value,
                document.getElementById("names2").value,

                document.getElementById("dop_inf0").value,
                document.getElementById("dop_inf1").value,
                document.getElementById("dop_inf2").value,
                document.getElementById("dop_inf3").value,
                document.getElementById("dop_inf4").value,
                document.getElementById("dop_inf5").value,
                document.getElementById("dop_inf6").value,

                document.getElementById("info0").value,
                document.getElementById("info1").value,
                document.getElementById("info2").value,
                document.getElementById("info3").value,
                document.getElementById("info4").value,
                document.getElementById("info5").value,

                temp2,
                temp3,

            ]
            console.log(array_values)
            eel.add_new_chel(array_values);
            new_chel_view(array_values);
            add_form.remove();
            on_add_button_click();
        }

        div_button_holder.appendChild(button1);
        div_button_holder.appendChild(button2);
        add_form.appendChild(div_button_holder);
    
    }
    main_body.appendChild(add_form);

}

function on_dock_button_click(){

}