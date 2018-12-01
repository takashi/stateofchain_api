# This is the repository for stateofchain.io hackathon.

## How to build

Before you run this app, you need

- Clone of topic branch of fork of `bcoin` (https://github.com/joemphilips/bcoin/tree/20181130-hackathon)
- Node.js v9.0 ↑
- Ruby 2.5.3
- MySQL 5.7

And then,

```
$ ./bin/node --network=simnet --loglevel=debug --cors=true
```

and

```
$ git clone git@github.com:takashi/stateofchain_api.git
$ yarn install
$ yarn watch
$ bundle exec rails db:reset
$ bundle exec rails s
$ open http://localhost:3000
```
