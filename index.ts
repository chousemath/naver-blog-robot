import * as puppeteer from 'puppeteer';
interface Credentials {
    id: string;
    pw: string;
}

// check for sufficient command line arguments
if (process.argv.length < 4) {
    console.log('You did not provide enough arguments to the program');
    process.exit();
}

const credentials = {
    id: process.argv[2],
    pw: process.argv[3],
};

const urlLoginPage: string = 'https://nid.naver.com/nidlogin.login';
const urlBlogDashboard: string = 'https://section.blog.naver.com/BlogHome.nhn?directoryNo=0&currentPage=1&groupId=0';
const sleep = (ms: number = 0) => new Promise(r => setTimeout(r, ms));

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const viewport: puppeteer.Viewport = { width: 1000, height: 1000 };
    page.setViewport(viewport);
    page.on('dialog', (dialog) => {
        console.log("dialog");
        dialog.accept();
    });
    await page.goto(urlLoginPage, { waitUntil: 'networkidle2' })

    const fillLoginPage = await page.evaluate((cred: Credentials): Error | null => {
        const id: HTMLElement | null = document.getElementById('id');
        if (id === null) return new Error('Input for id could not be found');
        (id as HTMLInputElement).value = cred.id;
        const pw: HTMLElement | null = document.getElementById('pw');
        if (pw === null) return new Error('Input for pw could not be found');
        (pw as HTMLInputElement).value = cred.pw;
        return null;
    }, credentials);

    let err: Error | null = fillLoginPage;

    if (err != null) {
        console.log((err as Error).message);
        browser.close();
        process.exit();
    }

    await sleep(15_000);

    await page.goto(urlBlogDashboard, { waitUntil: 'networkidle2' });

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

    err = switchToMyComments;

    if (err != null) {
        console.log((err as Error).message);
        browser.close();
        process.exit();
    }

    await sleep(1000);

    const getMyComments = await page.evaluate((): Array<string> => {
        return Array.from(document.getElementsByClassName('text_news')).map((a: Element) => (a as HTMLAnchorElement).href);
    });

    const commentLinks: Array<string> = getMyComments;

    if (commentLinks.length === 0) {
        console.log('You do not have any comments');
        browser.close();
        process.exit();
    }

    // each of your comments has an associated link, the nice thing about this link is that
    // it automatically opens the comments section of that blog
    for (let commentLink of commentLinks) {
        console.log(commentLink);
        const commentID: string = commentLink.split('commentNoPosition=')[1];
        console.log(commentID);
        await page.goto(commentLink, { waitUntil: 'networkidle2' });

        // naver has a strange html structure, all the interesting stuff is contained withing iframes
        // you need to switch to that iframe to do anything at all
        const frame = await page.frames().find(f => f.name() === 'mainFrame');
        if (frame === undefined) {
            console.log('Could not find appropriate frame');
            browser.close();
            process.exit();
        }

        const findComment = await (frame as puppeteer.Frame).evaluate((cid: string): Error | null => {
            const removeButtons: Array<Element> = Array.from(document.getElementsByTagName('a')).filter((a: Element) => {
                const dataAction: string | null = a.getAttribute('data-action');
                const dataParam: string | null = a.getAttribute('data-param');
                return dataAction === 'remove' && dataParam && dataParam.indexOf(`commentNo:${cid}`);
            });
            if (removeButtons.length === 0) return new Error('Could not find a remove button');
            (removeButtons[0] as HTMLAnchorElement).click();
            return null;
        }, commentID);

        err = findComment;

        if (err != null) {
            console.log(err.message);
            browser.close();
            process.exit();
        }
    }

    await browser.close();
})();