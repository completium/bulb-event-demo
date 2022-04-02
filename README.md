# Bulb Event Demo

Source code of the [Bulb Event Demo](https://opentezos.com/archetype/events/dapp-event-example).

## Deploy bulb contract

Deploy bulb contract with [`completium-cli`](https://completium.com/docs/cli) with the following command:

```bash
$ completium-cli set endpoint https://hangzhounet.api.tez.ie
$ completium-cli deploy ./contract/bulb.arl
```

Replace contract address in [`App.tsx`](./src/App.tsx) line 17:
```typescript
const bulbAddress = "KT1PKQ76kR1nZSvu5YN41r7GjYcAqGQSrLxg"
```

## Bindings generation

To generate event bindings with [`completium-cli`](https://completium.com/docs/cli) from [bulb.arl](./contract/bulb.arl) contract, you can run in the project directory,

```bash
$ completium-cli generate bindings-ts ./contract/bulb.arl > ./src/bulb-binings.ts
```
## `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
