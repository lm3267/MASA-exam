import { School } from "./entities";
import { createSchool, getClassYoungestStudent, initializeSchool, printSchool, transferStudent, transferStudentWithClass } from "./services";
import { School as SchoolClass } from "./classes";
import { fullName, getRandomValueFromArray } from "./helpers";
import { firstNames, lastNames } from "./constants";

noClasses();
// withClasses();

function noClasses() {
    const school: School = createSchool("Name of School", "Address", "3176876686767", 3);
    printSchool(school);        //Initial print

    school.classes.forEach(c => {
        console.log(getClassYoungestStudent(c))     //print youngest of every class
    })

    transferStudent(fullName(getRandomValueFromArray(firstNames),  getRandomValueFromArray(lastNames)), school.classes[0], school.classes[2]);      //transfer one student from one class to another one
    printSchool(school);
}

function withClasses() {
    const school = new SchoolClass("Name of School", "Address", "3176876686767");
    school.printSchool();

    school.classes.forEach(c => {
        console.log(c.getYoungestStudent());
    })

    transferStudentWithClass(fullName(getRandomValueFromArray(firstNames),  getRandomValueFromArray(lastNames)), school.classes[0], school.classes[2]);
    school.printSchool();
}