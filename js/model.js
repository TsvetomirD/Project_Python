window.addEventListener('scroll', reveal);

function reveal(){
var reveals = document.querySelectorAll('.reveal');

for(var i = 0; i < reveals.length; i++){

    var windowheight = window.innerHeight;
    var revealtop = reveals[i].getBoundingClientRect().top;
    var revealpoint = 150; 

    if(revealtop < windowheight - revealpoint){
        reveals[i].classList.add('active');
    }
    else{
        reveals[i].classList.remove('active');
    }
}
}

document.addEventListener('DOMContentLoaded', () => {
    const aboutBtn = document.getElementById('aboutBtn');
    const aboutMenu = document.getElementById('aboutMenu');
    const closeBtn = document.getElementById('closeBtn');

    aboutBtn.addEventListener('click', () => {
        aboutMenu.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
        aboutMenu.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === aboutMenu) {
            aboutMenu.style.display = 'none';
        }
    });
});


const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');
const menu = document.getElementById('menu');

const menuWrapperSize = document.getElementById('menu-wrapper').offsetWidth; 
const menuSize = document.getElementById('menu').offsetWidth;	
const menuInvisibleSize = Math.max(menuSize - menuWrapperSize, 0);	
const arrowSize = rightArrow.offsetWidth;	
const menuEndOffset = Math.max(menuInvisibleSize - arrowSize, 0);	
const itemsCount = document.getElementsByClassName('item').length; 
const itemSize = document.getElementsByClassName('item')[0].offsetWidth;
const itemsSpaceBetween = (menuSize - (itemsCount * itemSize)) / (itemsCount - 1);	
const distanceInPixels = itemSize + itemsSpaceBetween;	
const durationInMilliseconds = 500;
let starttime = null;


if (menuInvisibleSize === 0) {
	rightArrow.classList.add("hidden");
}

const getMenuPosition = () => {
	return parseFloat(menu.style.left) || 0;	
};

const getScrolledDistance = () => {
	return -1 * getMenuPosition();	
};

const checkPosition = () => {
	const menuPosition = getScrolledDistance();

	
	if (menuPosition <= arrowSize) {			
		leftArrow.classList.add("hidden");			
		rightArrow.classList.remove("hidden");
	} else if (menuPosition < menuEndOffset) {	
		leftArrow.classList.remove("hidden");
		rightArrow.classList.remove("hidden");
	} else if (menuPosition >= menuEndOffset) {	
		leftArrow.classList.remove("hidden");
		rightArrow.classList.add("hidden");
    }

	
	document.querySelector("#print-menu-position span").textContent = menuPosition + 'px';
};

const animateMenu = (timestamp, startingPoint, distance) => {
    const runtime = timestamp - starttime;
    let progress = runtime / durationInMilliseconds;
    progress = Math.min(progress, 1);
	let newValue = (startingPoint + (distance * progress)).toFixed(2) + 'px';
	menu.style.left = newValue;

	if (runtime < durationInMilliseconds) {	
        requestAnimationFrame(function(timestamp) { 
            animateMenu(timestamp, startingPoint, distance);
        })
    }
	checkPosition();
};
 
const animationFramesSetup = (timestamp, travelDistanceInPixels) => {
	timestamp = timestamp || new Date().getTime();	
	starttime = timestamp;
	const startingPoint = getMenuPosition();
	animateMenu(timestamp, startingPoint, travelDistanceInPixels);
};

rightArrow.addEventListener('click', () => requestAnimationFrame(
	timestamp => animationFramesSetup(timestamp, -1 * distanceInPixels)
));
	
leftArrow.addEventListener('click', () => requestAnimationFrame(
	timestamp => animationFramesSetup(timestamp, distanceInPixels)
));
