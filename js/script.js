//console.log('Hello world!!!');
//start onley after DOM loaded fully
//fetch => replace httpRequest
//all build is async ajax XMLHttpRequest | Fetch | axios
window.addEventListener('DOMContentLoaded', () => {
    function init(){
        
        // //------------ 1. XMLHttpRequest ---------------------

        // let request = new XMLHttpRequest();//object for request db
        // request.open('GET', 'http://localhost:3000/people');//get all data from json
        // request.setRequestHeader('Content-type', 'application/json; charset=utf-8');//told to server type of data
        // request.send();//finish and send request

        // //follow after object if loaded
        // request.addEventListener('readystatechange', () => {
        //     if(request.readyState === 4 && request.status == 200){//status 0-4 rulls of request (google it) && status of http 1xx, 2xx, 3xx, 4xx, 5xx (error 404-not found)
        //         //after get all data to request obj -> response(what we get from server),
        //         //geting json format -> need to parse it to var 
        //         let data = JSON.parse(request.response);

        //         //console.log(data);
        //     }else {
        //         console.error('something go wrong -> invalid data!!');
        //     }
        // });


        getResource('http://localhost:3000/people')
            //.then(data => data.json())
            //.then(data => console.log(data));
            //.then(data => createCards(data))//way 2 (fetch)
            .then(data => createCards(data.data))//way 3 (axios)
            .catch(err => console.error('something go wrong -> invalid data!!'));

            
        this.remove();//remove button in .app after load(press me!!)
    }
//----------------------- async fetch ----------------------
    //async -> JS is not async, if have code after request from server it continued run it
    //and server most time took some time to response. async stop code and wait for server 
    //and after load data it continue 
    // async function getResource(url){//optimaized function for get data
    //     //async told to function wait for load data (wait for await) and then continue code
    //     const res = await fetch(url);

    //     //checking server status
    //     if(!res.ok){//re.ok check status.request === 200 (here if not ok)
    //         throw new Error(`could not fetch ${url}, status: ${res.status}`);
    //     }
    //     return await res.json();
    // }
//----------------------- axios ----------------------
    // 3. way 3 with axios
    //simmelar to fetch
    async function getResource(url){//optimaized function for get data
        //async told to function wait for load data (wait for await) and then continue code
        const res = await axios(url);

        //checking server status
        if(res.status !== 200){//re.ok check status.request === 200 (here if not ok)
            throw new Error(`could not fetch ${url}, status: ${res.status}`);
        }
        return res;//auto transform json file
    }

    function createCards(response){
        response.forEach(item => {//from request data arrey
            let card = document.createElement('div');//create new block for card

            card.classList.add('card');//in div card - add class='card'

            // //1. primitive way
            // let icon;//dynamic icon sex
            // if(item.sex === "male") {
            //     icon = "./icons/mars.png";
            // }else{
            //     icon = "./icons/female.png";
            // }

            //2. trinary func
            let icon = (item.sex === "male") ? "icons/mars.png" : "icons/female.png"

            //build card
            card.innerHTML = `
                <img src="${item.photo}" alt="persone">
                <div class="name">${item.name} ${item.surname}</div>
                <div class="sex">
                    <img src=${icon} alt=${item.sex}>
                </div>
                <div class="age">${item.age}</div>
            `;
            document.querySelector('.app').appendChild(card);//append catd into .app block
        });
    }

    document.querySelector('button').addEventListener('click', init, {"once": true});//attribute once -> click on button only once
    //init();
});
