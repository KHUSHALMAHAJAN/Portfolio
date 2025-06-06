const point = document.getElementById("point")
const logo = document.getElementById("logo")
const firstcontener = document.getElementById("firstcontener")
const discription = document.getElementById("discription")
// point.style.top = event.
// point.style.left = "150px"
// const rect = point.getBoundingClientRect()
// const position  = {
//     top : rect.top,
//     left : rect.left,
//     right : rect.right,
//     bottom : rect.bottom 
// }
// console.log(position)
// document.addEventListener("mousemove",(e) => {
//     console.log(e.pageX)
//     console.log(e.pageY)
// })
// document.point.style.top = ""+46+"px"
// document.point.style.left = ""+46+"px"

// point.style.position = 'absolute';
// point.style.top = '15px';
// point.style.left = '150px';


document.addEventListener("mousemove", (e) => {
    setTimeout(function () {
        point.style.position = "absolute"
        point.style.top = e.pageY - 30 + "px"
        point.style.left = e.pageX - 30 + "px"
    }, 150)
})
firstcontener.addEventListener("mouseover", function () {
    description.style.display = "block";
});
firstcontener.addEventListener("mouseleave", function () {
    description.style.display = "none";
})
const logoimgright = document.getElementById("logoimgleft");
const logoimgleft = document.getElementById("logoimgright");
const c = document.getElementById("c");

const language = ["C Language", "C++", "Java", "HTML", "CSS", "Java Script"];
let index = 0;

// Initial state
c.innerText = language[index];

// Update function
function updateLanguage() {
    c.innerText = language[index];

    // Handle disabling/enabling arrows
    if (index === 0) {
        logoimgright.style.opacity = "0.2";
        logoimgright.removeEventListener("click", handleClickRight);
    } else {
        logoimgright.style.opacity = "1";
        logoimgright.addEventListener("click", handleClickRight);
    }

    if (index === language.length - 1) {
        logoimgleft.style.opacity = "0.2";
        logoimgleft.removeEventListener("click", handleClickLeft);
    } else {
        logoimgleft.style.opacity = "1";
        logoimgleft.addEventListener("click", handleClickLeft);
    }
}

// Click handlers
function handleClickLeft() {
    if (index < language.length - 1) {
        index++;
        updateLanguage();
        indexshow()
    }
}

function handleClickRight() {
    if (index > 0) {
        index--;
        updateLanguage();
        indexshow()
    }
}
logoimgleft.addEventListener("click", handleClickLeft);
logoimgright.addEventListener("click", handleClickRight);

// Initial arrow state
updateLanguage();
const infor = document.getElementById("infor")
infor.innerText = `C was the first programming language I learned after completing my 10th class.
            It introduced me to the core concepts of programming and helped me build a strong foundation in computer
            science.
            C includes a wide range of essential programming features such as variables, data types, operators, control
            structures (like if-else and loops), functions, arrays, pointers, and file handling.
            These topics gave me a clear understanding of how programs are structured and how memory works in a
            low-level language.
            By learning C, I developed strong problem-solving skills and logical thinking. `
function indexshow() {
    // console.log(index)
    switch (index) {
        case 1:
            infor.innerText = `C++ was the second programming language I learned after completing my first year of study. 
    It helped me move beyond basic programming and introduced me to the concepts of Object-Oriented Programming (OOP). 
    I learned about important topics like classes, objects, inheritance, polymorphism, encapsulation, and abstraction, 
    which allowed me to better understand how real-world problems can be solved using code.

    By practicing with C++, I strengthened my logical thinking and coding structure. 
    Working on mini-projects helped me apply OOP in a practical way. 
    This language played a key role in clearing my OOP concepts, and it laid a strong foundation 
    that made it easier for me to learn other languages like Java and Python later.`;
            break;
        case 2:
            infor.innerText = `Java was the third programming language I learned after C and C++. 
            It helped me reinforce my understanding of Object-Oriented Programming (OOP) concepts in a more structured and real-world way. 
            
            Java introduced me to features like classes, interfaces, inheritance, polymorphism, exception handling, and multithreading, which are essential for building scalable applications.
Learning Java deepened my knowledge of OOP and also 

introduced me to the JVM (Java Virtual Machine) and how Java programs run independently of platforms. Through practice and small projects, I became more confident in applying OOP principles, and Java played a crucial role in strengthening my overall programming foundation.`
        break;
        case 3:
            infor.innerText =`HTML (HyperText Markup Language) was one of the first web technologies I learned after gaining some experience with languages like C, C++, and Java. It introduced me to the structure and organization of web pages. I learned how to use basic HTML elements like headings, paragraphs, links, lists, tables, and images to create well-structured web content.

Learning HTML gave me a solid foundation in web development. It helped me understand how content is displayed in a browser and prepared me to dive into CSS for styling and JavaScript for interactivity. Understanding the role of HTML in the overall web development process was an important step in building complete and responsive websites.`
    break
    case 4:
        infor.innerText = `After learning HTML, I moved on to CSS (Cascading Style Sheets), which allowed me to bring style and visual appeal to my web pages. CSS taught me how to control the layout, colors, fonts, spacing, and responsiveness of websites. I explored selectors, properties, and values to make content visually attractive and better aligned with modern design standards.

CSS also helped me understand how to create flexible and adaptive designs using concepts like flexbox, grid, media queries, and transitions. With CSS, I gained the ability to make clean, responsive user interfaces and understood how structure (HTML) and presentation (CSS) work together to create functional, engaging web experiences.`
        break
    case 5:
        infor.innerText = `After getting comfortable with HTML and CSS, I began learning JavaScript to add interactivity and dynamic behavior to my web pages. JavaScript opened up a new dimension of web development by allowing me to respond to user actions, update content without reloading the page, and manipulate HTML elements in real time. I started with basic concepts like variables, loops, functions, and conditional statements, which strengthened my logical thinking.
As I progressed, I explored the Document Object Model (DOM), event handling, and how JavaScript integrates with HTML and CSS to create fully interactive web applications. I also experimented with animations, form validations, and dynamic styling. JavaScript gave me the ability to build smarter, more engaging user interfaces and laid the foundation for learning more advanced concepts and frameworks in web development`
        break
    default :
        infor.innerText = `C was the first programming language I learned after completing my 10th class.
            It introduced me to the core concepts of programming and helped me build a strong foundation in computer
            science.
            C includes a wide range of essential programming features such as variables, data types, operators, control
            structures (like if-else and loops), functions, arrays, pointers, and file handling.
            These topics gave me a clear understanding of how programs are structured and how memory works in a
            low-level language.
            By learning C, I developed strong problem-solving skills and logical thinking.`
    }

}

