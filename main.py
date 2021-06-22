from os import name
import re
import eel
import sqlite3

@eel.expose
def give_info_to_js(value):
    connection = sqlite3.connect("RsueGraduates")
    cursor = connection.cursor()

    
    if value % 10 == 0:
        cursor.execute("select " +
        "Contact_details.email,Contact_details.phone_number, Contact_details.github, Contact_details.inst, Contact_details.telegram, Contact_details.vk " +
        "from Graduates join Contact_details on Contact_details.id_graduate = Graduates.id_graduate " +
        "Where Graduates.id_graduate = " + str(((int(value) - 800000) // 10)))
        rows = cursor.fetchall()
        return rows
    elif value % 10 == 1:
        cursor.execute("select " +
        "Work_place.work_name, Work_position.name_postition " +
        "from Graduates join Works on Works.id_graduate = Graduates.id_graduate join Work_place on Work_place.id_work_place = Works.id_work_place join Work_position on Work_position.id_work_position = Works.id_work_position " +
        "Where Graduates.id_graduate = " + str(((int(value) - 800000) // 10)) +
        " ORDER by Work_place.id_work_place ")
        rows = cursor.fetchall()
        return rows
    elif value % 10 == 2:
        cursor.execute("select " +
        "Tool.name_tool as Навык " +
        "from Graduates join Tools on Graduates.id_graduate = Tools.id_graduate join Tool on Tools.id_tool = Tool.id_tool " +
        "Where Graduates.id_graduate = " + str(((int(value) - 800000) // 10)) +
        " ORDER by Tool.name_tool ")
        rows = cursor.fetchall()
        return rows
    elif value % 10 == 3:
        print(str(((int(value) - 800000) // 10) + 1))
        cursor.execute("select date_birthday, adress, diplom_number, diplom_number2, study_form from Graduates" +
        f" WHERE id_graduate = {str(((int(value) - 800000) // 10))}")
        rows = cursor.fetchall()
        print(rows)
        return rows

@eel.expose
def take_info(_fak, _level, _spec, _year):
    global fak, level, spec, year
    fak = _fak
    level =_level
    spec = _spec
    year = _year

@eel.expose
def fill_info_into_table():
    connection = sqlite3.connect("RsueGraduates")
    cursor = connection.cursor()
    
    cursor.execute("select surname, name, patronymic, date_receipt, date_graduation, id_graduate from Graduates " +
    f"Where faculty = '{fak}' and specialty = '{spec}' and level = '{level}' and god_okonchaniya = '{year}' " + 
    "ORDER BY surname")
    return cursor.fetchall()

@eel.expose
def get_all_works():
    connection = sqlite3.connect("RsueGraduates")
    cursor = connection.cursor()

    cursor.execute("select DISTINCT work_name, name_postition from Works join Work_place on Works.id_work_place = Work_place.id_work_place join Work_position on Works.id_work_position = Work_position.id_work_position")
    return cursor.fetchall()

@eel.expose
def get_all_skills():
    connection = sqlite3.connect("RsueGraduates")
    cursor = connection.cursor()

    cursor.execute("select tool.name_tool from Tool")
    return cursor.fetchall()

@eel.expose
def add_new_chel(value):
    connection = sqlite3.connect("RsueGraduates")
    with connection:
        cursor = connection.cursor()
        #str(id[0])[1:-2]


        column = ["name", "surname", "patronymic", "date_receipt", "date_graduation", "date_birthday", "diplom_number", "diplom_number2", "study_form", "adress", "faculty", "specialty", "level", "god_okonchaniya"]
        request  = "insert into Graduates ("

        for i in range(0, 10):
            if value[i] != "":
                request += column[i] + ", "
        for i in range(10, 14):
            if i != 13:
                request += column[i] + ", "
            else:
                request += column[i] + " ) "
        request += " values( "
        for i in range(0, 10):
            if value[i] != "":
                request += "'" + value[i] + "', "
        request += f"'{fak}', '{spec}', '{level}', '{year}')"
        cursor.execute(request)

        id = cursor.execute("SELECT id_graduate FROM Graduates ORDER BY id_graduate DESC LIMIT 1").fetchall()
        request  = "insert into Contact_details (id_graduate, "
        column_contact = ["email", "phone_number", "github", "inst", "telegram", "vk"]
        for i in range(10, 16):
            if value[i] != "":
                request+= column_contact[i-10] + ", "
            if i == 15:
                request = request[0: -2]
                request += ") "
        request += "values( " + str(id[0])[1:-2] + ", "
        for i in range(10, 16):
            if value[i] != "":
                request+= f"'{value[i]}', "
            if i == 15:
                request = request[0: -2]
                request += ") "
        cursor.execute(request)

        #Навыки
        for i in range (len(value[17])):
            if (str(cursor.execute(f"select name_tool from Tool where name_tool = '{value[17][i]}'").fetchall()) == "[]"):
                cursor.execute(f"insert into Tool (name_tool) values ('{value[17][i]}')")
            id_tool = cursor.execute(f"select id_tool from Tool where name_tool = '{value[17][i]}'").fetchall()
            cursor.execute(f"insert into Tools (id_graduate, id_tool) values ('{str(id[0])[1:-2]}', '{str(id_tool[0])[1:-2]}')")

        #Работа
        for i in range(len(value[16])):
            #Место работы
            work = value[16][i].split(' ', 2)
            if (str(cursor.execute(f"select work_name from Work_place where work_name = '{work[0]}'").fetchall()) == "[]"):
                cursor.execute(f"insert into Work_place (work_name) values ('{work[0]}')")
            id_work_place = cursor.execute(f"select id_work_place from Work_place where work_name = '{work[0]}'").fetchall()
            #Должность
            if (str(cursor.execute(f"select name_postition from Work_position where name_postition = '{work[1]}'").fetchall()) == "[]"):
                cursor.execute(f"insert into Work_position (name_postition) values ('{work[1]}')")
            id_work_pos = cursor.execute(f"select id_work_position from Work_position where name_postition = '{work[1]}'").fetchall()
            #Карьера
            cursor.execute(f"insert into Works (id_graduate, id_work_place, id_work_position) values ({str(id[0])[1:-2]}, '{str(id_work_place[0])[1:-2]}', '{str(id_work_pos[0])[1:-2]}')")




@eel.expose
def last_chel():
    connection = sqlite3.connect("RsueGraduates")
    with connection:
        cursor = connection.cursor()

        id = cursor.execute("SELECT id_graduate FROM Graduates ORDER BY id_graduate DESC LIMIT 1").fetchall()
        return str(id[0])[1:-2]

if __name__ == '__main__':
    eel.init("web", allowed_extensions=['.js', '.html', '.css'])
    eel.start("home.html", size = (1920, 1080))
