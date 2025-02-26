import {adminPage} from "./pages/adminPage";
import homePage from "./pages/homePage";


const routes = {
    '/': homePage,
    "/admin": adminPage
};

const navigateTo = (url) => {
    history.pushState(null, null, url);
    router();
};

const router = () => {
    const path = window.location.pathname;
    const route = routes[path] || notFoundPage;
    route();
};

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (e) => {
        if (e.target.matches('[data-link]')) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
});

window.addEventListener('popstate', router);