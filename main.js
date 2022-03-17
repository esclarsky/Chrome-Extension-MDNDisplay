console.log(`OUR EXTENSION WORKS`)

    

    // console.log(header);
    // //console.log(header.childNodes, header.children);

    // // Grab page name, first paragraph of page, and all links contained in the article 
    // const header = document.querySelector('.main-page-content');


// Get every link on the MDN page
    const links = document.querySelectorAll('a');
  

// Whenever we interact with a link, run a function
    links.forEach((link, i) => {
        // If the interaction is hovering over the link, run the below function
        link.onmouseover =  (e) => {
            // Confirm the link leads to an MDN doc. If not, do not run our function
            if (`${link.href}`.includes(`docs`)){
            // Create our popup box to display the header and content
            const box = document.createElement('div');
            
            // Find the location of the cursor to display the box underneath
            var x = e.clientX - 200;
            var y = e.clientY + 10;
            if (x<0){x=0}

            //Style the box
            box.style.top = `${y}px`;
            box.style.left = `${x}px`;
            box.style.boxSizing = `border-box`
            box.style.maxWidth = `400px`
            box.style.backgroundColor = '#ecd9fe';
            box.style.position = 'fixed';
            box.style.padding = '5px';
            box.style.outline = `1px solid black`;

            box.id = `popupbox`;

            // Add contents of webpage to box
            const tbd = fetch(`${link.href}`)
                // GET the HTML at the link
                .then(response => response.text())
                .then(response => {
                    // Create a new document object (doc) from the HTML at the link
                    const doc = new DOMParser();
                    const result = doc.parseFromString(response, 'text/html');
                    
                    let header
                    let pageName
                    let shortText

                    // Check if our link leads to a specific location on the page (indicated by a # and location at the end of the URI)
                        // If it does, grab the name of the location and the HTML element immediately following it to occupy the box
                    const regex = new RegExp(".*#.*");
                    let next = new RegExp(".*(#.*$)");
                    let searchstring;
                    if (regex.test(link.href)) {
                        searchstring = link.href.replace(next, '$1');
                    }
                    if (searchstring){
                        const textToUse = result.querySelector(searchstring);
                        pageName = textToUse.id;
                        header = result.querySelector('.main-page-content');

                        let index = header.childNodes
                        for (let i =0; i<index.length; i++){
                            if (String(index[i].id)==pageName) shortText = (index[i+1].childNodes[0]).innerHTML
                        }
                        

                    }

                    // If the link leads to a page itself (not a location in the page) just grab the header and first paragraph
                    else {
                        header = result.querySelector('.main-page-content');
                        pageName = header.childNodes[0].innerHTML
                        shortText = header.childNodes[1].childNodes[0].innerHTML
                    }


                    // Create our HTML elements to place in the box
                    const pageNm = document.createElement('p');
                    const content = document.createElement('p');

                    // Style our box content
                    pageNm.style.outline = `1px solid black`
                    pageNm.style.fontSize = 36;
                    pageNm.style.color = `black`
                    pageNm.style.fontWeight = `bold`;
                    pageNm.style.textAlign = `center`;
                    content.style.fontSize = 10;
                    content.style.color = `black`;

                    // Set the box content that we collected
                    content.innerHTML = shortText;
                    pageNm.innerHTML = pageName;
                    
                    // Add the content to the box
                    box.appendChild(pageNm);
                    box.appendChild(content);
                    }
                );
            // Add the box to the body of the page
            const body = document.querySelector('body');
            body.appendChild(box);
        }
        // When we remove our mouse from the link, remove the box
        link.onmouseout = () => {
            const box = document.getElementById('popupbox')
            box.remove()
        }
        // Also remove box if we follow the link while the box is displayed
        link.onclick = ()  => {
            const box = document.getElementById('popupbox')
            box.remove()
        } 
    }})