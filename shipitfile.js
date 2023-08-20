module.exports = shipit => {

    require('shipit-deploy')(shipit)

    shipit.initConfig({
        default: {
            servers: [{
                host: '143.198.93.155',
                user: 'root',
            }],
        },
        prod: {
            servers: [{
                host: '143.198.93.155',
                user: 'root',
            }]
        },
    });

    shipit.task('deploy', async function () {
        const git = "https://github.com/agik-setiawan/latihan-strapi.git";
        const dir = "strapi";

        await shipit.remote(`mkdir ~/${dir}`);
        await shipit.remote(`cd ~/${dir} && git clone ${git} .`);
        await shipit.remote(`cd ~/${dir} && git pull ${git}`);
        await shipit.remote(`cd ~/${dir} && cp .env.prod .env`);
        await shipit.remote(`cd ~/${dir} && npm install`);
        await shipit.remote(`cd ~/${dir} && npm run build`);
        await shipit.remote(`cd ~/${dir} && pm2 start yarn --name strapi -- start`);
    });

};