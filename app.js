let Bottombar = {
    render : async () => {
        let view = /*html*/
        `
        <footer>
            <div class="content has-text-centered">
                <p>
                    ~~~ DIEGO HIDALGO ~~~
                </p>
        </footer>
        `;
        return view;
    },
    after_render : async () => {

    }
};

let Error404 = {
    render : async () => {
        let view = /*html*/
        `
            <section class="section">
                <h1>ERROR 404</h1>
            </section>
        `
        return view;
    },
    after_render : async () => {
        
    }
};

let About = {
    render : async () => {
        let view = /*html*/
        `
            <section class="section">
                <h1>About</h1>
            </section>
        `;
        return view;
    }
};

let Register = {
    render : async () => {
        return /*html*/ `
        <section class="section">
            <div class="field">
                <p class="control has-icons-left has-icons-right">
                    <input class="input" id="email_input" type="email" placeholder="Enter your Email">
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                    </span>
                    <span class="icon is-small is-right">
                        <i class="fas fa-check"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" id="pass_input" type="password" placeholder="Enter a Password">
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" id="repeat_pass_input" type="password" placeholder="Enter the same Password again">
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control">
                    <button class="button is-primary" id="register_submit_btn">
                    Register
                    </button>
                </p>
            </div>
        </section>
    `;
    },
    after_render : async () => {
        document.getElementById("register_submit_btn").addEventListener ("click",  () => {
            let email       = document.getElementById("email_input");
            let pass        = document.getElementById("pass_input");
            let repeatPass  = document.getElementById("repeat_pass_input");
            if (pass.value != repeatPass.value) {
                alert (`The passwords dont match`)
            } else if (email.value == '' | pass.value == '' | repeatPass == '') {
                alert (`The fields cannot be empty`)
            } 
            else {
                alert(`User with email ${email.value} was successfully submitted!`)
            }    
        });
    }
};

const Utils = {
    parseRequestURL : () => {
        let url = location.hash.slice(1).toLowerCase() || '/';
        let r = url.split("/")
        let request = {
            resource    : null,
            id          : null,
            verb        : null
        }
        request.resource    = r[1]
        request.id          = r[2]
        request.verb        = r[3]

        return request
    }
};

const routes = {
    '/'             : Home
    , '/about'      : About
    , '/p/:id'      : PostShow
    , '/register'   : Register
    , '/login'      : LogIn
};

const router = async() => {
    const header = null || document.getElementById('header_container');
    const content = null || document.getElementById('page_container');
    const footer = null || document.getElementById('footer_container');

    header.innerHTML = await Navbar.render();
    await Navbar.after_render();
    footer.innerHTML = await Bottombar.render();
    await Bottombar.after_render();

    let request = Utils.parseRequestURL()

    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '');
    
    let page = routes[parsedURL] ? routes[parsedURL] : Error404;
    content.innerHTML = await page.render();
    await page.after_render();
};

window.addEventListener('hashchange', router);

window.addEventListener('load', router);