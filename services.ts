// Ideas:
// Build dynamically created classmates: collection of first names, collection of lastnames, randomly pick birth date

import { classNames, firstNames, Geography, lastNames, Mathematics } from "./constants";
import { Classroom, School, Student, Teacher } from "./entities";
import { calculateAge, fullName, getRandomBirthDate, getRandomValueFromArray, sortArray } from "./helpers";
import { Classroom as ClassroomClass } from "./classes";

export function initializeSchool(): School {
    const student1: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student2: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student3: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student4: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());

    const teacher1: Teacher = createTeacher(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), [Mathematics]);

    const student5: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student6: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student7: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student8: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());

    const teacher2: Teacher = createTeacher(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), [Geography]);

    const mathClass: Classroom = createClassroom("Math", teacher1, [student1, student2, student3, student4]);
    const geographyClass: Classroom = createClassroom("Geography", teacher1, [student5, student6, student7, student8]);

    return {
        name: "Big school",
        address: "Moscow",
        phone: "+7 (916) 000 12 21",
        classes: [
            mathClass,
            geographyClass
        ]
    }
}

function createTeacher(firstName: string, lastName: string, professions: string[]): Teacher {
    return {
        firstName: firstName,
        lastName: lastName,
        professions: professions,
        fullName: fullName(firstName, lastName)
    };
}

function createStudent(firstName: string, lastName: string, birthDate: Date): Student {
    let age = calculateAge(birthDate);
    return {
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate,
        fullName: fullName(firstName, lastName),
        age: age
    };
}

function createClassroom(name: string, teacher: Teacher, students: Student[]): Classroom {
    return {
        name: name,
        teacher: teacher, 
        students: students
    };
}

export function getClassYoungestStudent(classroom: Classroom): Student {
    let youngestStudent = classroom.students[0]
    let minAge = youngestStudent.birthDate.toISOString();
    for (let i = 1; i < classroom.students.length; ++i) {
        if (classroom.students[i].birthDate.toISOString() < minAge) {
            youngestStudent = classroom.students[i];
            minAge = youngestStudent.birthDate.toISOString();
        }
    }
    return youngestStudent;
}

export function printSchool(school: School): void {
    console.log("School data:");
    console.log("============");
    console.log(school.name);
    console.log(school.address);
    console.log(school.phone);
    console.log("\nClasses");
    console.log("============");
    school.classes.forEach((cl, i) => {
        let classOutputString = "Class " + (i+1).toString() + ": " + cl.name + "\n";
        classOutputString += "Teacher: " + cl.teacher.fullName + " " + cl.teacher.professions.join(', ') + "\n";  
        classOutputString += "Students:\n"
        cl.students.forEach((st, i) => {
            classOutputString += (i+1).toString() + ": " + st.fullName + ": " + st.age + "\n";
        })
        classOutputString += "\n"
        console.log(classOutputString);
    });
}

export function transferStudent(fullName: string, fromClassroom: Classroom, toClassrom: Classroom): void {
    let student = fromClassroom.students.find(st => st.fullName === fullName);
    if (!student) throw `Student ${fullName} not found in this classroom`;
    let studentIndex = fromClassroom.students.indexOf(student);
    fromClassroom.students.splice(studentIndex, 1);
    toClassrom.students.push(student);
    toClassrom.students = sortArray(toClassrom.students, 'fullName');       //No need to sort the first class - it remains sorted
}

export function transferStudentWithClass(fullName: string, fromClassroom: ClassroomClass, toClassrom: ClassroomClass) {
    let student = fromClassroom.removeStudent(fullName);
    toClassrom.addStudent(student);
}

export function createSchool(name: string, address: string, phone: string, classNumber: number): School {
    let classes : Classroom[] = [];
    for (let i = 0; i < classNumber; ++i) {
        let studentNumber = Math.floor(Math.random() * 30) + 1;
        let studentList : Student[] = [];
        for (let j = 0; j < studentNumber; ++j) {
            studentList.push(createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate()));
        }
        let teacherSubjects = [];
        let subjectNumber = Math.floor(Math.random() * 3) + 1;  //Up to 3 classes
        for (let j = 0; j < subjectNumber; ++j) {
            teacherSubjects.push(getRandomValueFromArray(classNames));
        }
        studentList = sortArray(studentList, "fullName");
        let classroom = createClassroom(
            teacherSubjects[0],
            createTeacher(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), teacherSubjects),
            studentList
        );
        classes.push(classroom);
    }
    classes = sortArray(classes, "name");
    return {
        name: name,
        address: address,
        phone: phone,
        classes: classes
    }
}