import * as puppeteer from 'puppeteer';
const urlLoginPage: string = 'https://nid.naver.com/nidlogin.login';
const urlBlogDashboard: string = 'https://section.blog.naver.com/BlogHome.nhn?directoryNo=0&currentPage=1&groupId=0';
const sleep = (ms: number = 0) => new Promise(r => setTimeout(r, ms));

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    const viewport: puppeteer.Viewport = { width: 1000, height: 1000 };
    page.setViewport(viewport);
    await page.goto(urlLoginPage, { waitUntil: 'networkidle2' })

    // const login = await page.evaluate((cred: Credentials): boolean | null => {
    //     const id: HTMLElement | null = document.getElementById('id');
    //     if (id === null) return null;
    //     (id as HTMLInputElement).value = cred.id;
    //     const pw: HTMLElement | null = document.getElementById('pw');
    //     if (pw === null) return null;
    //     (pw as HTMLInputElement).value = cred.pw;
    //     const loginForms: Array<Element> = Array.from(document.getElementsByClassName('login_form'));
    //     if (loginForms.length === 0) return null;
    //     const globalButtons: Array<Element> = Array.from(loginForms[0].getElementsByClassName('btn_global'));
    //     if (globalButtons.length === 0) return null;
    //     (globalButtons[0] as HTMLInputElement).click();
    //     return true;
    // }, credentials);
    // const result = login;

    await sleep(18_000);

    await page.screenshot({ path: 'example1.png' });

    await page.goto(urlBlogDashboard, { waitUntil: 'networkidle2' });

    await page.screenshot({ path: 'example2.png' });

    const switchToMyComments = await page.evaluate((): Error | null => {
        // select the 'my comments' tab
        const tabs: Array<Element> = Array.from(document.getElementsByClassName('menu_my_article'));
        if (tabs.length === 0) return new Error('Tab section could not be found');
        const anchorTags: Array<Element> = Array.from(document.getElementsByTagName('a')).filter(a => a.getAttribute('ng-click') === "myContentCtrl.changeView('MY_TRACE')");
        if (anchorTags.length === 0) return new Error('Anchor tags in tab section could not be found');
        // reveal your comments
        (anchorTags[0] as HTMLAnchorElement).click();
        return null;
    });
    const err: Error | null = switchToMyComments;
    if (err != null) {
        console.log((err as Error).message);
        process.exit();
    }
    await sleep(1000);

    const getMyComments = await page.evaluate((): Array<string> => {
        return Array.from(document.getElementsByClassName('text_news')).map((a: Element) => (a as HTMLAnchorElement).href);
    });
    const comments: Array<string> = getMyComments;
    if (comments.length === 0) {
        browser.close();
        process.exit();
    }

    await page.screenshot({ path: 'example3.png' });

    await browser.close();
})();