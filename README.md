# Color Clock

Make time visible.

For folks who can't tell time or have a hard time with transitions (e.g.
small children), color clocks use clear visuals to tell people how much
time they have left for an activity. Time-telling skills not required.

### Getting started

```sh
npm i # install dependencies
npm start # start dev server
```

### Running Tests

```sh
npm test
```

### Deployment

The app is currently set up to deploy to [Netlify](https://www.netlify.com/).
The `_redirects` ensures that the routing works as expected on production (see [here](https://www.netlify.com/blog/2019/01/16/redirect-rules-for-all-how-to-configure-redirects-for-your-static-site/) for more information).

### Features

- Single-page app built in [React.js](https://reactjs.org/)

- Users can create a clock given a start time, end time, and warning time (along with corresponding colors).

- The app implements a custom url encoder / decoder for the form data, so that
  the data for any clock can be stored in the URL for bookmarking and daily use.

- Invalid URLs are handled appropriately, and routing is controlled by [React Router](https://reactrouter.com/web/guides/quick-start)

- So. much. testing.

### Questions? Comments? Complaints?

Feel free to reach out to me on [Twitter](twitter.com/mmmaaatttttt).