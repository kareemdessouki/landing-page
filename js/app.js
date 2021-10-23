/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.getElementsByTagName('section');
const navBarList = document.getElementById('navbar__list');

const navBarLinks = {}; //object to contain all nav links

let activeSection;
let activeNav;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
//change the active section & nav item
function setActive(section) {
    if(activeSection != undefined && activeNav != undefined) {
        // removes the old active classes
        activeSection.classList.remove('your-active-class');
        activeNav.classList.remove('active__link');
    }

    // set new active section & nav item
    activeSection = section;
    activeSection.classList.add('your-active-class'); 
    activeNav = navBarLinks[section.id];
    activeNav.classList.add('active__link');
}

//scroll to section
function scrollToSec(link) {
    const sec = document.getElementById(link.dataset.section);
    sec.scrollIntoView({behavior: "smooth", block: "center"});
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav() {
    for(const section of sections){
        let id = section.id;
        let dataNav = section.getAttribute('data-nav');
        let navItm = document.createElement('li');
        
        navItm.innerHTML = `<a href = "#${id}" data-section = "${id}">${dataNav}</a>`;
        navBarList.appendChild(navItm);
        navBarLinks[id] = navItm;
    }

    //prevent navigating to new section by href
    const links = document.querySelectorAll('a');
    for(let link of links){
        link.addEventListener('click', function(event){
            event.preventDefault();
            scrollToSec(link);
        });
    }

    
}

// Add class 'active' to section when near top of viewport
function checkActive() {
    for(const section of sections) {
        const y = section.getBoundingClientRect().top;
        if(((y <= 350 && y > 0) || (y >= -400 && y < 0)) && activeSection !== section) { //check whether a section is in the viewport
            setActive(section);
        }
    }
}

// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/


// Build menu 
buildNav();
//Set section to active
document.addEventListener('scroll', checkActive);