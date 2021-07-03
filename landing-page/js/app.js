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


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// function to get the number of sections 
function getSectionNumber() {
  return document.querySelectorAll("section").length;
}

// function to add another section dynamically 
function addSection() {
  let num = document.getElementById("secNum").value;
  // console.log(num);
  if(num > 100){
    num = 100;
  }
  let existingNM = document.querySelectorAll("section").length;
  newNum = num - existingNM;
  console.log("newNUM =" + newNum);
  for (let i = 0; i < newNum; i++) {
    // console.log("I'm in the loop");
    const newSection = document.createElement("section");
    const sectionID = getSectionNumber() + 1;
    newSection.setAttribute("id", "section" + sectionID);
    newSection.setAttribute("data-nav", "Section " + sectionID);

    const newDiv = document.createElement("div");
    newDiv.setAttribute("class", "landing__container");

    const newH2 = document.createElement("h2");
    const newH2Text = document.createTextNode("Section " + sectionID);

    const newp1 = document.createElement("p");
    const newp1Text = document.createTextNode("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod");

    const newp2 = document.createElement("p");
    const newp2Text = document.createTextNode("Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.")

    document.getElementById("main").appendChild(newSection);
    newSection.appendChild(newDiv);
    newDiv.appendChild(newH2);
    newH2.appendChild(newH2Text)
    newDiv.appendChild(newp1);
    newp1.appendChild(newp1Text);
    newDiv.appendChild(newp2);
    newp2.appendChild(newp2Text);
  }
  // console.log("test")
  buildNav(newNum, existingNM);
  document.getElementById("btn1").remove();
  document.getElementById("secNum").remove();
  document.getElementById("label1").remove();
  return;
}

// Determine if a section is in the viewport
function isViewed(sectionTested) {
  let place = sectionTested.getBoundingClientRect();
  // console.log(place.top);
  return (place.top >= 0)
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function initiateNav(){
  const navbarList = document.getElementById("navbar__list");
  for (let i = 0; i < 3; i++) {
    // create list item 
    let li_element = document.createElement("li");
    let a_element = document.createElement("a");
    a_element.setAttribute("class", "menu__link");
    // a_element.setAttribute("href", "#section" + (i + 1));
    a_element.setAttribute("onclick", "scrolling()");
    a_element.innerHTML = "Section " + (i + 1);
    //li_element.innerHTML = "<a class = \"menu_link\" href = #section" + i + "Section" +i;
    //li_element.setAttribute("class", "menu__link")
    li_element.appendChild(a_element);
    navbarList.appendChild(li_element);
  }
}
function buildNav(newNum, existingNM) {
  if(newNum <= 0){
    return;
  }
  const navbarList = document.getElementById("navbar__list");
  for (let i = 0; i < newNum; i++) {
    // create list item 
    let li_element = document.createElement("li");
    let a_element = document.createElement("a");
    a_element.setAttribute("class", "menu__link");
    // a_element.setAttribute("href", "#section" + (i + 1));
    a_element.setAttribute("onclick", "scrolling()");
    a_element.innerHTML = "Section " + (i + 1 + existingNM);
    //li_element.innerHTML = "<a class = \"menu_link\" href = #section" + i + "Section" +i;
    //li_element.setAttribute("class", "menu__link")
    li_element.appendChild(a_element);
    navbarList.appendChild(li_element);
  }
}

// Add class 'active' to section when near top of viewport
function setActive() {
  const allSections = document.querySelectorAll("section");
  allSections.forEach(element => {
    if (element.classList.contains("your-active-class")) {
      element.classList.remove("your-active-class");
    }
  });
  for (let i = 0; i < allSections.length; i++) {
    let isActive = isViewed(document.querySelectorAll("section")[i]);
    if (isActive === true) {
      // console.log(i + 1);
      let activeSection = document.getElementById("section" + (i + 1));
      activeSection.setAttribute("class", "your-active-class");
      return;
    }
  }
}

// Scroll to anchor ID using scrollTO event
function scrolling(){
  // get the element triggering the event
  el = event.target;
  // get the element ID
  sectionID = el.innerHTML.match(/(\d+)/)[0];
  // console.log(sectionID);
  section = document.getElementById("section"+sectionID);
  section.scrollIntoView({behavior: "smooth"});
}

/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu
initiateNav();

// Scroll to section on link click
/*
document.getElementsByClassName("menu__link").forEach(element => {
  element.  
});
document.addEventListener("click", )
*/

// Set sections as active
document.addEventListener("scroll", setActive);
