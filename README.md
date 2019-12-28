# dungeoncord
![airbnb eslint style](https://camo.githubusercontent.com/1c5c800fbdabc79cfaca8c90dd47022a5b5c7486/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f636f64652532307374796c652d616972626e622d627269676874677265656e2e7376673f7374796c653d666c61742d737175617265)

**dungeoncord** is a wrapper around the (undocumented) [aidungeon.io](https://www.aidungeon.io/) api. 

### setup
node and yarn are all that's needed, after installing the dependencies, edit the .env file to include your discord bot token, aidungeon token, owner id, and prefix.
```sh
$ git clone https://github.com/sad/dungeoncord && cd dungeoncord
$ yarn
$ cp .env.example .env
```
### getting your tokens
personally, i used [charles](https://www.charlesproxy.com/) to intercept the web traffic from the app on my iphone, although you can use any proxy. grab the `x-access-token` from the header of any request once logged in.  you can get a discord bot token by [creating an application](https://discordapp.com/developers/applications/), and then copying the bot user's token. 

### todo
at the moment, only the basic functions work. i would like to ensure every guild has a unique story, and can create new ones at will. for this, i need to explore the api more to figure out how they are created. any help is welcome.