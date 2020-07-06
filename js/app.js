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
 * Define Global Variables
 * 
*/
const pageHeader = document.querySelector('.page__header');
const navbarList = document.querySelector('#navbar__list');
const mainSections = Array.from(document.querySelectorAll('section'));
const goUpBtn = document.getElementsByClassName('scroll__btn');
const pageFooter = document.getElementsByClassName('page__footer');


let dataNavArray = [];
let counter = 0;

let
    /**
     * End Global Variables
     * Start Helper Functions
     * 
    */

    // gettting sections names from the document dynamically
    getSectionsName = () => {
        mainSections.forEach((section) => {
            let dataNav = section.attributes.datanav.nodeValue;
            dataNavArray.push(dataNav);
        })
    }


// Add class 'active' to section 
setActiveSection = (newSection, oldSection) => {
    // adding class .your-active-class 
    newSection.classList.add('your-active-class');

    // removing the class from other section
    oldSection.classList.remove('your-active-class');
}


// Add class 'active' to link 
setActiveLink = (newLinkName, oldLinkName) => {

    // get link that its name = new link name
    const newLink = document.getElementsByName(`${newLinkName}`)

    // get link that its name = new link name
    const oldLink = document.getElementsByName(`${oldLinkName}`)

    // removing the class from other section
    oldLink[0].classList.remove('active');

    // adding class .your-active-class 
    newLink[0].classList.add('active');
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
navBuild = () => {
    // get all section name we have
    getSectionsName();

    // loop for each section and add an list item for it
    dataNavArray.forEach((navItemName, index) => {
        // create an anchor element
        const menuLink = document.createElement('a');

        // add section name to the anchor
        menuLink.textContent = `${navItemName}`;

        // add class .menu__link to the anchor
        menuLink.className = 'menu__link';

        // add attribute href pointing to section id
        menuLink.setAttribute('href', `#section${index + 1}`);

        // add attribute name to each link
        menuLink.setAttribute('name', `section${index + 1}`);

        // add event listener to each link 
        menuLink.addEventListener('click', handleLinkClick);

        // add class .active to first link only
        if (index === 0) {
            menuLink.classList.add('active');
        }

        // create list item element
        const listItem = document.createElement('li');

        // append menu link to li
        listItem.appendChild(menuLink);

        // append list items to the nav bar unorderd list
        navbarList.appendChild(listItem);
    })
}


// Add class 'active' to section when near top of viewport
handleScroll = () => {

    //decalring variables
    let prevSectionOffset = 0;
    let nextSectionOffset = 0;

    // getting the current active section
    let activeSection = mainSections.filter((section) => {
        return (
            section.classList.contains('your-active-class')
        )
    })

    // we always have one active section
    activeSection = activeSection[0];

    // subtracting its top offset from window offset
    const activeSectionOffset = Math.abs(window.pageYOffset - activeSection.offsetTop);

    // get the previous sibling of the current active section
    const prevSection = activeSection.previousElementSibling;
    // get its offset to window top
    if (prevSection !== null) {
        prevSectionOffset = Math.abs(window.pageYOffset - prevSection.offsetTop);
        if (prevSectionOffset < activeSectionOffset) {
            // if we are going up
            setActiveSection(prevSection, activeSection);
            setActiveLink(prevSection.id, activeSection.id);
        }
    }

    // get the next sibling of the current active section
    const nextSection = activeSection.nextElementSibling;
    // get its offset to window top
    if (nextSection !== null) {
        nextSectionOffset = Math.abs(window.pageYOffset - nextSection.offsetTop);
        if (nextSectionOffset < activeSectionOffset) {
            // if we are going down
            setActiveSection(nextSection, activeSection);
            setActiveLink(nextSection.id, activeSection.id);
        }
    }

}


// Scroll to anchor ID using scrollTO event
scrollToFunction = (sectionName) => {

    // get the target section element
    const targetSection = mainSections.find(section => {
        return (section.id.localeCompare(sectionName) === 0)
    })

    // let the window scroll to this section
    let scrollOptions = {
        left: 0,
        top: targetSection.offsetTop - pageHeader.clientHeight - 20,     //20 for border height
        behavior: 'smooth'
    }
    window.scrollTo(scrollOptions);
}


// toggle nav bar function
toggleNavbar = (action) => {
    if (action === true) {
        // open navbar
        pageHeader.classList.remove('hide__navbar');
    } else {
        // close navbar
        pageHeader.classList.add('hide__navbar');
    }
}

/**
 * End Main Functions
 * Begin Events
 *
*/

// Set sections as active
window.addEventListener('scroll', () => {

    // reset counter 
    counter = 0;

    // open navbar
    toggleNavbar(true);

    // highlight the shown section
    handleScroll();

    // if arriving to the end of the page --> show scroll up button
    if (window.pageYOffset + window.innerHeight >= pageFooter[0].offsetTop) {
        goUpBtn[0].classList.add('active');
    } else {
        goUpBtn[0].classList.remove('active');
    }
});


// handle navigation on menu links - Scroll to section on link click 
handleLinkClick = (e) => {
    e.preventDefault();
    scrollToFunction(e.target.name);
}

// handle clicks on go up button
goUpBtn[0].addEventListener('click', () => {
    scrollToFunction('section1');
    goUpBtn[0].classList.remove('active');
})

// Build menu 
navBuild();


// handle non scrolling case
let timerId = setInterval(() => {
    // increment counter every 1 second
    counter++;
    if (counter === 5) {
        // after 5 seconds -> close navbar
        toggleNavbar(false);
    }
}, 1000)