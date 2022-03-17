console.log(`OUR EXTENSION WORKS`)

    

    // console.log(header);
    // //console.log(header.childNodes, header.children);

    // // Grab page name, first paragraph of page, and all links contained in the article 
    const header = document.querySelector('.main-page-content');
    const links = header.querySelectorAll('a');
  

// For all links, run our function (function being loading the page and displaying header and paragraph)
    links.forEach((link, i) => {
        link.onmouseover =  (e) => {
            // Create popup box
            const box = document.createElement('div');
            
            var x = e.clientX - 200;
            var y = e.clientY + 10;
            box.style.top = `${y}px`;
            box.style.left = `${x}px`;
            box.style.boxSizing = `border-box`
            box.style.maxWidth = `400px`
            box.style.backgroundColor = '#ecd9fe';
            box.style.position = 'fixed';
            box.style.padding = '5px';
            box.style.outline = `1px solid black`;
            box.id = `popupbox`;
            // Add contents of webpage to popupbox
            const tbd = fetch(`${link.href}`)
                .then(response => response.text())
                .then(response => {
                    const doc = new DOMParser();
                    const result = doc.parseFromString(response, 'text/html');



                    const regex = new RegExp(".*#.*");
                    let next = new RegExp(".*(#.*$)");
                    let searchstring;
                    if (regex.test(link.href)) {
                        searchstring = link.href.replace(next, '$1');
                    }
                    if (searchstring){
                        const textToUse = result.querySelector(searchstring);
                        console.log(textToUse);
                    }



                    
                    const header = result.querySelector('.main-page-content');
                    const pageName = header.childNodes[0].innerHTML
                    const shortText = header.childNodes[1].childNodes[0].innerHTML
                    const pageNm = document.createElement('p');
                    const content = document.createElement('p');
            
                    pageNm.style.outline = `1px solid black`
                    pageNm.style.fontSize = 36;
                    pageNm.style.color = `black`
                    pageNm.style.fontWeight = `bold`;
                    pageNm.style.textAlign = `center`;
                    content.style.fontSize = 10;
                    content.style.color = `black`;
                    content.innerHTML = shortText;
                    pageNm.innerHTML = pageName;
                    box.appendChild(pageNm);
                    box.appendChild(content);
                    }
                );
            const body = document.querySelector('body');
            body.appendChild(box);
        }
        link.onmouseout = () => {
            const box = document.getElementById('popupbox')
            box.remove()
        }   
    })