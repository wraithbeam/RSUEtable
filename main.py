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
        "Where Graduates.id_graduate = " + str(((int(value) - 800000) // 10) + 1))
        rows = cursor.fetchall()
        return rows
    elif value % 10 == 1:
        cursor.execute("select " +
        "Work_place.work_name, Work_position.name_postition " +
        "from Graduates join Works on Works.id_graduate = Graduates.id_graduate join Work_place on Work_place.id_work_place = Works.id_work_place join Work_position on Work_position.id_work_position = Works.id_work_position " +
        "Where Graduates.id_graduate = " + str(((int(value) - 800000) // 10) + 1) +
        " ORDER by Work_place.id_work_place ")
        rows = cursor.fetchall()
        return rows
    elif value % 10 == 2:
        cursor.execute("select " +
        "Tool.name_tool as Навык " +
        "from Graduates join Tools on Graduates.id_graduate = Tools.id_graduate join Tool on Tools.id_tool = Tool.id_tool " +
        "Where Graduates.id_graduate = " + str(((int(value) - 800000) // 10) + 1) +
        " ORDER by Tool.name_tool ")
        rows = cursor.fetchall()
        return rows
    elif value % 10 == 3:
        cursor.execute("select date_birthday, adress, diplom_number, diplom_number2, study_form from Graduates")
        rows = cursor.fetchall()
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
    
    cursor.execute("select surname, name, patronymic, date_receipt, date_graduation from Graduates " +
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

        print(request)
        cursor.execute(request)

        request  = "insert into Contact_details (id_graduate, "
        id = cursor.execute("SELECT id_graduate FROM Graduates ORDER BY id_graduate DESC LIMIT 1").fetchall()
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

        print(request)

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
