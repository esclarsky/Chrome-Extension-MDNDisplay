console.log(`OUR EXTENSION WORKS`)

    const header = document.querySelector('.main-page-content');

    // console.log(header);
    // //console.log(header.childNodes, header.children);

    // Grab page name, first paragraph of page, and all links contained in the article 
    const pageName = header.childNodes[0].innerHTML
    const shortText = header.childNodes[1].childNodes[0].innerHTML
    const links = header.querySelectorAll('a');
    const dialog = document.createElement('dialog');
    const content = document.createElement('p');
    content.innerHTML = shortText;
    dialog.appendChild(content);
    // console.log(link.href)
    // 
    

    console.log(shortText)
    console.log(links);

// For all links, run our function (function being loading the page and displaying header and paragraph)
    links.forEach((link, i) => {
        link.onmouseover =  () => {
            // Create popup box
            const box = document.createElement('div');
            
            box.style.height = `100px`;
            box.style.width = '100px';
            box.style.backgroundColor = 'white';
            box.style.position = 'fixed';
            box.style.top = '400px';
            box.style.left = '400px';
            
            box.id = `popupbox`;
            // Add contents of 
            box.innerText = 'this is a placeholder';

            const body = document.querySelector('body');
            body.appendChild(box);
        }
        link.onmouseout = () => {
            const box = document.getElementById('popupbox')
            box.remove()
        }   
    })